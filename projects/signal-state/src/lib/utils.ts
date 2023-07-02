import {ErrorWithMessage} from "./model";

export function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError;

  let message: string;
  try {
    message = JSON.stringify(maybeError);
  } catch {
    // fallback in case there's an error stringifying the maybeError
    message = String(maybeError);
  }

  return { message };
}

export function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as ErrorWithMessage).message === 'string'
  );
}
