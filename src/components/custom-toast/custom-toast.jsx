import "react-toastify/dist/ReactToastify.css";
import "./custom-toast.css";

import { toast, ToastContainer } from "react-toastify";

import CloseIcon from "@mui/icons-material/Close";

// prevent toast duplicate
const toastId = "custom-id";

export const notify = (content, type, autoClose = 5000) => {
    toast(content, {
        toastId: toastId,
        autoClose: autoClose,
        className: `toast-msg ${type}`,
        bodyClassName: "toast-body",
    });
};

const CloseButton = ({ closeToast }) => (
    <div className={{ width: "14px", height: "14px" }} onClick={closeToast}>
        <CloseIcon />
    </div>
);

const CustomToast = () => {
    return (
        <ToastContainer
            position="top-right"
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            closeButton={CloseButton}
        />
    );
};

export default CustomToast;
