/** StudentModel model definitions **/
export enum StudentScore {
  NEUD = 2,
  UD = 3,
  HOR = 4,
  OTL = 5
}

export interface StudentModel {
  id?: number;
  fio: string;
  birth: string;
  score: StudentScore;
}
