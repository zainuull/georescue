import { ToastContainer } from 'react-toastify';

const ToastNotify = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      zIndex={2000}
    />
  );
};

export default ToastNotify;
