import { createContext, useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContext = createContext();

export const useToastContext = () => useContext(ToastContext);

export function ToastContextProvider(props) {
  const { children } = props;
  //   const [messages, setMessages] = useState([]);
  const showToast = (message, options = {}) => {
    toast(message, options);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <ToastContainer />
      {children}
    </ToastContext.Provider>
  );
}
