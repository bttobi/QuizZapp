import { toast } from 'react-toastify';

export enum NotificationType {
  INFO = 'info',
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  DEFAULT = 'default',
}

interface emitNotificationArgs {
  message: string;
  type?: NotificationType;
}

type emitNotification = ({ message, type }: emitNotificationArgs) => void;

const emitNotification: emitNotification = ({ message, type }) => {
  switch (type) {
    case NotificationType.INFO:
      return toast.info(message, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    case NotificationType.SUCCESS:
      return toast.success(message, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    case NotificationType.ERROR:
      return toast.error(message, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    case NotificationType.WARNING:
      return toast.warning(message, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    case NotificationType.DEFAULT:
    default:
      return toast(message, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
  }
};

export default emitNotification;
