export interface IBaseReponse<T> {
  success: boolean;
  data?: T;
  errors: IError[];
}

interface IError {
  code: string;
  message: string;
}
