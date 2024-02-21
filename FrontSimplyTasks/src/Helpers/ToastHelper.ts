import { toast } from "react-toastify";

export const ErrorToast = (message: string) => {
    return toast.error(message, {
        theme: "dark",
        pauseOnHover: true,
        hideProgressBar: false,
        autoClose: 3000,
    });
};
