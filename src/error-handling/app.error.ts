export class AppError extends Error {
  public readonly commonType: string;
  public readonly isOperational: boolean;
  public readonly statusCode: number;
  public readonly responseErr?: object;
  public readonly internalErrorCode?: number;
  constructor(
    commonType: string,
    statusCode: number,
    isOperational: boolean,
    responseErr?: object,
    internalErrorCode?: number,
  ) {
    super();
    Object.setPrototypeOf(this, new.target.prototype);
    this.commonType = commonType;
    this.isOperational = isOperational;
    this.statusCode = statusCode;
    this.responseErr = responseErr;
    this.internalErrorCode = internalErrorCode;

    Error.captureStackTrace(this);
  }
}
