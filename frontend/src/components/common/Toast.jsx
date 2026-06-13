/**
 * Toast Component
 * Display toast notifications
 */

import React from 'react';
import { FiX, FiAlertCircle, FiCheckCircle, FiInfo } from 'react-icons/fi';

const Toast = ({ id, message, type, onRemove }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => onRemove(id), 3000);
    return () => clearTimeout(timer);
  }, [id, onRemove]);

  const typeStyles = {
    success: 'bg-green-100 border-green-300 text-green-800',
    error: 'bg-red-100 border-red-300 text-red-800',
    info: 'bg-blue-100 border-blue-300 text-blue-800',
    warning: 'bg-yellow-100 border-yellow-300 text-yellow-800',
  };

  const typeIcons = {
    success: FiCheckCircle,
    error: FiAlertCircle,
    info: FiInfo,
    warning: FiAlertCircle,
  };

  const Icon = typeIcons[type];

  return (
    <div
      className={`flex items-center gap-3 p-4 border rounded-lg ${typeStyles[type]} animate-slideIn`}
    >
      <Icon size={20} />
      <span className="flex-1">{message}</span>
      <button
        onClick={() => onRemove(id)}
        className="text-current hover:opacity-70"
      >
        <FiX size={18} />
      </button>
    </div>
  );
};

const ToastContainer = ({ toasts, onRemoveToast }) => {
  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onRemove={onRemoveToast}
        />
      ))}
    </div>
  );
};

export { Toast, ToastContainer };
export default Toast;
