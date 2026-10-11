import { extractErrors } from '@/backend/utils/extractErrors';

type HandlerFunction<TArgs extends unknown[], TReturn> = (...args: TArgs) => Promise<TReturn>;

export const catchAsyncError = <TArgs extends unknown[], TReturn>(
  handler: HandlerFunction<TArgs, TReturn>
) => {
  return async (...args: TArgs): Promise<TReturn | { error: { message: string; statusCode: number } }> => {
    try {
      return await handler(...args);
    } catch (error: unknown) {
      const { message, statusCode } = extractErrors(error);
      return { error: { message, statusCode } } as TReturn | { error: { message: string; statusCode: number } };
    }
  };
};