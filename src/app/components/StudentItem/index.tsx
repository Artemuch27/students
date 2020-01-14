import * as React from 'react';
import * as classNames from 'classnames';
import * as style from './style.css';

import { StudentModel } from 'app/models';
import { StudentsActions } from 'app/actions';
import moment from 'moment';

const SCORE = {
  2: 'Неудовлетворительно',
  3: 'Удовлетворительно',
  4: 'Хорошо',
  5: 'Отлично'
};

export namespace StudentItem {
  export interface Props {
    student: StudentModel;
    selectStudent: (id: StudentModel) => void;
    deleteStudent: typeof StudentsActions.deleteStudent;
  }

  export interface State {
    editing: boolean;
  }
}

export class StudentItem extends React.Component<StudentItem.Props, StudentItem.State> {
  constructor(props: StudentItem.Props, context?: any) {
    super(props, context);
    this.state = { editing: false };
  }

  render() {
    const { student, deleteStudent, selectStudent } = this.props;
    // TODO: compose
    const classes = classNames({
      [style.editing]: this.state.editing,
      [style.normal]: !this.state.editing
    });

    return (
      <li className={classes}>
        <div className={style.view}>
          <label>{student.fio}</label>
          <label>{moment(student.birth).format('DD.MM.YYYY')}</label>
          <label>{SCORE[student.score]}</label>
          <div className={style.actions}>
            <button
              className={style.change}
              onClick={() => {
                if (student.id) selectStudent(student);
              }}
            >
              <svg version="1.1" x="0px" y="0px" viewBox="0 0 383.947 383.947">
                <g>
                  <polygon points="0,303.947 0,383.947 80,383.947 316.053,147.893 236.053,67.893 " />
                  <path
                    d="M377.707,56.053L327.893,6.24c-8.32-8.32-21.867-8.32-30.187,0l-39.04,39.04l80,80l39.04-39.04
                C386.027,77.92,386.027,64.373,377.707,56.053z"
                  />
                </g>
              </svg>
            </button>
            <button
              className={style.destroy}
              onClick={() => {
                const approve = window.confirm('Вы уверены?');

                if (approve) {
                  if (student.id) deleteStudent(student.id);
                }
              }}
            />
          </div>
        </div>
      </li>
    );
  }
}
