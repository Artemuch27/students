import * as React from 'react';
import * as style from './style.css';

import { Dispatch, bindActionCreators } from 'redux';

import { Form } from 'app/components/Form';
// import { Form } from 'app/components/Form';
import { RootState } from 'app/reducers';
import { RouteComponentProps } from 'react-router';
import { StudentModel } from 'app/models';
import { StudentsActions } from 'app/actions';
import { StudentsList } from 'app/components/StudentsList';
import { connect } from 'react-redux';
import { omit } from 'app/utils';

// import { Footer, Header, TodoList } from 'app/components';

export namespace App {
  export interface Props extends RouteComponentProps<void> {
    students: RootState.StudentsState;
    actions: StudentsActions;
  }

  export interface State {
    showForm: boolean;
    initialValues?: StudentModel | null;
  }
}

@connect(
  (state: RootState, ownProps): Pick<App.Props, 'students'> => ({
    students: state.students
  }),
  (dispatch: Dispatch): Pick<App.Props, 'actions'> => ({
    actions: bindActionCreators(omit(StudentsActions, 'Type'), dispatch)
  })
)
export class App extends React.Component<App.Props, App.State> {
  constructor(props: App.Props, context?: any) {
    super(props, context);
    this.state = {
      showForm: false,
      initialValues: null
    };
  }

  toggleEditForm = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  handleSave = (student: StudentModel) => {
    this.setState({ showForm: false, initialValues: null });
    if (this.state.initialValues) {
      this.props.actions.editStudent(student);
    } else {
      this.props.actions.addStudent(student);
    }
  };

  handleCancel = () => {
    this.setState({ showForm: false, initialValues: null });
  };

  handleSelect = (student: StudentModel) => {
    this.setState({
      showForm: true,
      initialValues: student
    });
  };

  render() {
    return (
      <div className={style.normal}>
        <h1>Список студентов</h1>
        <StudentsList {...this.props} onAddNew={this.toggleEditForm} onSelect={this.handleSelect} />
        {this.state.showForm && (
          <Form
            onSave={this.handleSave}
            onCancel={this.handleCancel}
            initialValues={this.state.initialValues}
            {...this.props}
          />
        )}
      </div>
    );
  }
}
