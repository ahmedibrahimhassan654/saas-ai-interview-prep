interface IValidationError {
  message: string;
}

interface MongooseError {
  message: string;
  name: string;
  errors?: Record<string, IValidationError>;
}

interface AxiosError {
  response?: {
    data?: {
      message?: string;
    };
    status?: number;
  };
}

interface MongoError {
  code?: number;
}

type KnownError = Error & Partial<MongooseError> & Partial<AxiosError> & Partial<MongoError>;

export const extractErrors = (error: unknown): { message: string; statusCode: number } => {
  let message = 'Internal Server Error';
  let statusCode = 500;

  const err = error as KnownError;

  if (err?.message) {
    message = err.message;
    statusCode = 400;
  }

  if (err?.name === 'ValidationError' && err?.errors) {
    const values = Object.values(err.errors) as IValidationError[];
    message = values.map((v) => v.message).join(', ');
    statusCode = 400;
  }

  if (err?.response?.data?.message) {
    message = err.response.data.message;
    statusCode = err.response.status ?? 400;
  }

  if (err?.code === 11000) {
    message = 'Email already exists';
    statusCode = 400;
  }

  return { message, statusCode };
};