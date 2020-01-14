import { StudentModel } from 'app/models';

export interface RootState {
  students: RootState.StudentsState;
  router?: any;
}

export namespace RootState {
  export type StudentsState = StudentModel[];
}
