import { StudentModel, StudentScore } from 'app/models';

import { RootState } from './state';
import { StudentsActions } from 'app/actions/students';
import { handleActions } from 'redux-actions';

const DEFAULT_STATE: RootState.StudentsState = [
  {
    id: 1,
    fio: 'Petrov Ivan',
    birth: '2020-01-07',
    score: StudentScore.OTL
  },
  {
    id: 2,
    fio: 'Sidorov Nikita',
    birth: '2020-01-07',
    score: StudentScore.OTL
  }
];

function getDataFromLS() {
  const students = window.localStorage.getItem('students');

  return students ? JSON.parse(students) : DEFAULT_STATE;
}

function saveDataToLS(data: object) {
  try {
    window.localStorage.setItem('students', JSON.stringify(data));
  } catch (error) {
    console.log(error);
    return false;
  } finally {
    return true;
  }
}

export const studentsReducer = handleActions<RootState.StudentsState, StudentModel>(
  {
    [StudentsActions.Type.ADD_STUDENT]: (state, action) => {
      if (action.payload && action.payload.fio && action.payload.birth) {
        const newState = [
          {
            id: state.reduce((max, student) => Math.max(student.id || 1, max), 0) + 1,
            ...action.payload
          },
          ...state
        ];
        saveDataToLS(newState);
        return newState;
      }

      return state;
    },
    [StudentsActions.Type.DELETE_STUDENT]: (state, action) => {
      const newState = state.filter((student) => student.id !== (action.payload as any));

      saveDataToLS(newState);

      return newState;
    },
    [StudentsActions.Type.EDIT_STUDENT]: (state, action) => {
      const newState = state.map((student) => {
        if (!student || !action || !action.payload) {
          return student;
        }
        return student.id === action.payload.id ? action.payload : student;
      });

      saveDataToLS(newState);

      return newState;
    }
  },
  getDataFromLS()
);
