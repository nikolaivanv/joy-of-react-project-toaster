import React from "react";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Escape") {
        setToasts([]);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

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
