
export enum ErrorType {
  NetworkError,
  ServerError,
  UnknownError,
}

export interface ErrorInfo {
  type: ErrorType;
  message: string;
  originalError: any;
}

export interface State<T> {
  data: T;
  loading: boolean;
  error: ErrorInfo | null;
}


export interface ErrorWithMessage {
  message: string;
}
