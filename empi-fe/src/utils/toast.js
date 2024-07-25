import { toast } from "react-toastify";

export const notifySuccess = (message) => {
  toast.success(message, {
    progressStyle: {
      background: "#7bbd1e",
    },
  });
};

export const notifyError = (message) => {
  toast.error(message);
};
