import React from "react";
import useEscapeKey from "../../hooks/use-escape-key";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const handleEscape = React.useCallback(() => setToasts([]), []);
  useEscapeKey(handleEscape);

  const removeToast = (id) => {
    setToasts((oldToasts) => oldToasts.filter((toast) => toast.id !== id));
  };

  const addToast = ({ message = "", variant = "notice" }) => {
    const id = crypto.randomUUID();
    const nextToasts = [
      ...toasts,
      { message, variant, id, onClose: () => removeToast(id) },
    ];
    setToasts(nextToasts);
  };
  return (
    <ToastContext value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext>
  );
}

export default ToastProvider;
