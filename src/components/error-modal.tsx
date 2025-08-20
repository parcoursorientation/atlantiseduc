'use client';

import React from 'react';
import { X, AlertCircle } from 'lucide-react';

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  type?: 'error' | 'warning' | 'info';
}

const ErrorModal: React.FC<ErrorModalProps> = ({
  isOpen,
  onClose,
  title = 'Attention',
  message,
  type = 'error'
}) => {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'error':
        return {
          icon: <AlertCircle className="h-6 w-6 text-red-500" />,
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          titleColor: 'text-red-800',
          buttonColor: 'bg-red-600 hover:bg-red-700'
        };
      case 'warning':
        return {
          icon: <AlertCircle className="h-6 w-6 text-yellow-500" />,
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          titleColor: 'text-yellow-800',
          buttonColor: 'bg-yellow-600 hover:bg-yellow-700'
        };
      case 'info':
        return {
          icon: <AlertCircle className="h-6 w-6 text-blue-500" />,
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          titleColor: 'text-blue-800',
          buttonColor: 'bg-blue-600 hover:bg-blue-700'
        };
      default:
        return {
          icon: <AlertCircle className="h-6 w-6 text-red-500" />,
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          titleColor: 'text-red-800',
          buttonColor: 'bg-red-600 hover:bg-red-700'
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-2xl shadow-2xl max-w-md w-full border-2 ${styles.borderColor} transform transition-all duration-300 scale-100 opacity-100`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${styles.borderColor}`}>
          <div className="flex items-center space-x-3">
            {styles.icon}
            <h3 className={`text-lg font-semibold ${styles.titleColor}`}>
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 text-base leading-relaxed">
            {message}
          </p>
        </div>

        {/* Footer */}
        <div className={`flex justify-end p-6 border-t ${styles.borderColor} bg-gray-50 rounded-b-2xl`}>
          <button
            onClick={onClose}
            className={`px-6 py-2 rounded-lg text-white font-medium transition-colors ${styles.buttonColor} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
          >
            J'ai compris
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;