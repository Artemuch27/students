import { StudentModel } from 'app/models';
import { createAction } from 'redux-actions';

export namespace StudentsActions {
  export enum Type {
    ADD_STUDENT = 'ADD_STUDENT',
    EDIT_STUDENT = 'EDIT_STUDENT',
    DELETE_STUDENT = 'DELETE_STUDENT',
    SELECT_STUDENT = 'SELECT_STUDENT'
  }

  export const addStudent = createAction<PartialPick<StudentModel, 'fio'>>(Type.ADD_STUDENT);
  export const editStudent = createAction<PartialPick<StudentModel, 'id'>>(Type.EDIT_STUDENT);
  export const deleteStudent = createAction<StudentModel['id']>(Type.DELETE_STUDENT);
  export const selectStudent = createAction<StudentModel['id']>(Type.SELECT_STUDENT);
}

export type StudentsActions = Omit<typeof StudentsActions, 'Type'>;
