import { RootState } from './state';
import { combineReducers } from 'redux';
import { studentsReducer } from './students';

export { RootState };

// NOTE: current type definition of Reducer in 'redux-actions' module
// doesn't go well with redux@4
export const rootReducer = combineReducers<RootState>({
  students: studentsReducer as any
});
