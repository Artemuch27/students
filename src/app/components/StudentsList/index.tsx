import * as React from 'react';
import * as style from './style.css';

import { StudentItem } from '../StudentItem';
import { StudentModel } from 'app/models/StudentModel';
import { StudentsActions } from 'app/actions/students';
import classNames from 'classnames';

export namespace StudentsList {
  export interface Props {
    onAddNew: () => void;
    onSelect: (student: StudentModel) => void;
    students: StudentModel[];
    actions: StudentsActions;
  }
}

export class StudentsList extends React.Component<StudentsList.Props> {
  renderDefault() {
    return (
      <h2>
        Список пуст! <br /> <br /> Для добавления нового студента нажмите кнопку внижней части
        экрана.
      </h2>
    );
  }

  renderList() {
    const { students, actions, onSelect } = this.props;

    return (
      <ul className={style.normal}>
        <li className={style.view}>
          <label>ФИО</label>
          <label>Дата Рождения</label>
          <label>Успеваемость</label>
          <label />
        </li>
        {students.map((student) => (
          <StudentItem
            key={student.id}
            student={student}
            deleteStudent={actions.deleteStudent}
            selectStudent={onSelect}
            {...this.props}
          />
        ))}
      </ul>
    );
  }
  render() {
    const { students } = this.props;
    const sectionStyle = classNames({
      [style.main]: students && students.length > 0,
      [style.empty]: !students || (students && students.length == 0)
    });
    return (
      <section className={sectionStyle}>
        <div className={style.button} onClick={this.props.onAddNew} />
        {students && students.length > 0 ? this.renderList() : this.renderDefault()}
      </section>
    );
  }
}
