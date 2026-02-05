// Inputs: Error
// Outputs: Handle Error

import toast from "react-hot-toast";

export function errorHandler(error, customMessage) {
  const message = error.response?.data?.message || customMessage;

  toast.error(message);
}
