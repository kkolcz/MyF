export interface IBaseReponse<T> {
  statusCode: number;
  status: string;
  message: string;
  data?: T;
  errors: IError[];
  timeStamp: string;
}

interface IError {
  code: string;
  message: string;
}
