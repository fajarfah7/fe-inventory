export type ApiSuccess<T> = {
  success: true;
  data: T;
  message?: string;
};

export type ApiError = {
  success: false;
  mapErrors: Record<string, string>;
  listErrors: string[];
  status?: number;
};

export type ApiResult<T> = ApiSuccess<T> | ApiError;