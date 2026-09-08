// frontend/src/components/ui/Field.tsx

'use client';

import { useId } from 'react';
import { FiAlertCircle } from 'react-icons/fi';

interface BaseProps {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

/**
 * Labelled input with an accessible error message.
 * The label is tied to the control with htmlFor/id, and the error is announced
 * via aria-describedby + role="alert".
 */
export function Field({
  label,
  error,
  hint,
  required,
  ...props
}: BaseProps & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {required && (
          <span className="ml-0.5 text-red-600" aria-hidden>
            *
          </span>
        )}
      </label>
      <input
        id={id}
        className="field"
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : hint ? hintId : undefined}
        {...props}
      />
      {hint && !error && (
        <p id={hintId} className="mt-1 text-[13px] text-subtle">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="field-error">
          <FiAlertCircle aria-hidden size={14} /> {error}
        </p>
      )}
    </div>
  );
}

export function TextArea({
  label,
  error,
  hint,
  required,
  ...props
}: BaseProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {required && (
          <span className="ml-0.5 text-red-600" aria-hidden>
            *
          </span>
        )}
      </label>
      <textarea
        id={id}
        className="field resize-y"
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : hint ? hintId : undefined}
        {...props}
      />
      {hint && !error && (
        <p id={hintId} className="mt-1 text-[13px] text-subtle">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="field-error">
          <FiAlertCircle aria-hidden size={14} /> {error}
        </p>
      )}
    </div>
  );
}

export function Select({
  label,
  error,
  hint,
  required,
  children,
  ...props
}: BaseProps & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {required && (
          <span className="ml-0.5 text-red-600" aria-hidden>
            *
          </span>
        )}
      </label>
      <select
        id={id}
        className="field"
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : hint ? hintId : undefined}
        {...props}
      >
        {children}
      </select>
      {hint && !error && (
        <p id={hintId} className="mt-1 text-[13px] text-subtle">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="field-error">
          <FiAlertCircle aria-hidden size={14} /> {error}
        </p>
      )}
    </div>
  );
}

/**
 * Hidden honeypot. Real people never see or fill this; bots do, and the
 * backend rejects any submission where it has a value.
 */
export function Honeypot({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div aria-hidden className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
      <label htmlFor="website-hp">Leave this field empty</label>
      <input
        id="website-hp"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
