type ResultSuccess<T> = T extends undefined
  ? {
      success: true;
      data?: undefined;
    }
  : {
      success: true;
      data: T;
    };

type ResultFailure = {
  success: false;
  statusCode?: number;
  // In theory we should present a "retry" option for network errors.
  networkError?: true;
  error: string;
};

export type Result<T = undefined> = ResultSuccess<T> | ResultFailure;
