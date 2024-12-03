import { errorMap } from "./consts/errors";
import { GRL } from "./consts/errors/grl";

function showError(
  code: number,
  messageCode: string | object,
  internalErrorCode?: number,
) {
  const internalError: string | null = internalErrorCode
    ? " (" + internalErrorCode + ")"
    : "";

  if (messageCode instanceof Object) {
    const message = Object.values(messageCode);
    const errorMessage = message[0].split(".");
    if (errorMessage[0] && errorMessage[1]) {
      return {
        status: errorMap[errorMessage[0]].code[errorMessage[1]] || 1,
        description: {
          fa:
            errorMap[errorMessage[0]].fa[errorMessage[1]] +
              " " +
              internalError || "",
          en:
            errorMap[errorMessage[0]].en[errorMessage[1]] +
              " " +
              internalError || "",
        },
      };
    }
    if (!errorMessage || errorMessage.length !== 2) {
      return {
        status: 1,
        description: {
          fa:
            messageCode + " " + internalError ||
            GRL.fa.INTERNAL + " " + internalError,
          en:
            messageCode + " " + internalError ||
            GRL.en.INTERNAL + " " + internalError,
        },
      };
    }
  } else {
    const message = messageCode.split(".");

    if (!message || message.length !== 2) {
      return {
        status: 1,
        description: {
          fa:
            messageCode + " " + internalError ||
            GRL.fa.INTERNAL + " " + internalError,
          en:
            messageCode + " " + internalError ||
            GRL.en.INTERNAL + " " + internalError,
        },
      };
    }

    return {
      status: errorMap[message[0]].code[message[1]] || 1,
      description: {
        fa: errorMap[message[0]].fa[message[1]] + " " + internalError || "",
        en: errorMap[message[0]].en[message[1]] + " " + internalError || "",
      },
    };
  }
}

export { showError };
