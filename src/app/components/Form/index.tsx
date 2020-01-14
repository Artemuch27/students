import * as React from 'react';
import * as style from './style.css';

import { StudentModel, StudentScore } from 'app/models';

import classNames from 'classnames';

// import { StudentsActions } from 'app/actions';

const SCORE = [
  { id: 2, title: 'Неудовлетворительно' },
  { id: 3, title: 'Удовлетворительно' },
  { id: 4, title: 'Хорошо' },
  { id: 5, title: 'Отлично' },
  { id: 0, title: 'Успеваемость' }
];

export namespace StudentItem {
  export interface Props {
    student?: StudentModel;
    initialValues?: StudentModel | null;
    onSave: (student: StudentModel) => void;
    onCancel: () => void;
  }

  export interface State {
    fio: string;
    birth: string;
    score: StudentScore;
    lastname: string;
    firstname: string;
  }
}

export class Form extends React.Component<StudentItem.Props, StudentItem.State> {
  constructor(props: StudentItem.Props, context?: any) {
    super(props, context);
    this.state = {
      fio: '',
      birth: '',
      lastname: '',
      firstname: '',
      score: StudentScore.HOR
    };
  }

  componentDidMount() {
    if (this.props.initialValues) {
      const fio = this.props.initialValues.fio.split(' ');
      const initialState = {
        ...this.props.initialValues,
        lastname: fio[0].trim(),
        firstname: fio[1].trim()
      };
      this.setState({ ...initialState });
    }
  }

  handleSave = () => {
    if (!this.validate()) return;

    const { lastname, firstname } = this.state;
    const initialState = {
      ...this.state,
      fio: lastname.trim() + ' ' + firstname.trim()
    };
    this.props.onSave(initialState);
  };

  handleCancel = () => {
    this.props.onCancel();
  };

  handleChange = (field: string) => (event: any) => {
    this.setState({ ...this.state, [field]: event.target.value });
  };

  validate = () => {
    const { firstname, lastname, birth } = this.state;

    if (!lastname) {
      alert('Поле "Фамилия" не может быть пустым!');
      return false;
    }

    if (!firstname) {
      alert('Поле "Имя" не может быть пустым!');
      return false;
    }

    if (lastname.trim().indexOf(' ') > 0 || firstname.trim().indexOf(' ') > 0) {
      alert('Проверьте правильность ввода имени и фамилии! Пристутсвуют лишние пробелы!');
      return false;
    }

    if (birth) {
      const birthDate = new Date(birth);
      const now = new Date();
      if (birthDate > now) {
        alert('Дата рождения не может бфть больше текущей даты!');
        return false;
      }
    }

    return true;
  };

  render() {
    const { firstname, lastname, birth, score } = this.state;
    const formStyle = classNames(style.main, style.active);

    return (
      <React.Fragment>
        <div className={style.overlay} onClick={this.handleCancel} />
        <div className={formStyle}>
          <div className={style.formControl}>
            <label>Фамилия</label>
            <input name="" value={lastname} onChange={this.handleChange('lastname')} />
          </div>
          <div className={style.formControl}>
            <label>Имя</label>
            <input name="" value={firstname} onChange={this.handleChange('firstname')} />
          </div>
          <div className={style.formControl}>
            <label>birth</label>
            <input type="date" name="birth" value={birth} onChange={this.handleChange('birth')} />
          </div>
          <div className={style.formControl}>
            <label>Fio</label>
            <select name="" value={score} onChange={this.handleChange('score')}>
              {SCORE.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
          <div className={style.footer}>
            <div className={style.button} onClick={this.handleSave}>
              Сохранить
            </div>
            <div className={style.button} onClick={this.handleCancel}>
              Отмена
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
