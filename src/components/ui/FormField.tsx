'use client';

import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface FormFieldProps {
  label?: string;
  error?: string;
  success?: boolean;
  children: ReactNode;
  required?: boolean;
  className?: string;
  hint?: string;
}

export function FormField({ 
  label, 
  error, 
  success, 
  children, 
  required = false,
  className = '',
  hint
}: FormFieldProps) {
  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-error ml-1" aria-label="required">*</span>}
        </label>
      )}
      
      <div className="relative">
        {children}
        
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
            >
              <AlertCircle className="w-5 h-5 text-error" aria-hidden="true" />
            </motion.div>
          )}
          
          {success && !error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
            >
              <CheckCircle className="w-5 h-5 text-success" aria-hidden="true" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {hint && !error && (
        <p className="mt-1 text-sm text-gray-500">{hint}</p>
      )}
      
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-1 text-sm text-error flex items-center gap-1"
            role="alert"
            aria-live="polite"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

interface FormErrorSummaryProps {
  errors: Record<string, any>;
}

export function FormErrorSummary({ errors }: FormErrorSummaryProps) {
  const errorMessages = Object.entries(errors)
    .filter(([_, error]) => error?.message)
    .map(([field, error]) => ({ field, message: error.message }));

  if (errorMessages.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-error/10 border border-error/20 rounded-lg p-4 mb-6"
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-error mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-semibold text-error mb-2">
            Por favor corrige los siguientes errores:
          </h3>
          <ul className="space-y-1">
            {errorMessages.map(({ field, message }) => (
              <li key={field} className="text-sm text-gray-700">
                • {message}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

interface FormSuccessMessageProps {
  title: string;
  message?: string;
}

export function FormSuccessMessage({ title, message }: FormSuccessMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-success/10 border border-success/20 rounded-lg p-6 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="inline-flex items-center justify-center w-16 h-16 bg-success/20 rounded-full mb-4"
      >
        <CheckCircle className="w-8 h-8 text-success" />
      </motion.div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      {message && (
        <p className="text-gray-600">{message}</p>
      )}
    </motion.div>
  );
}