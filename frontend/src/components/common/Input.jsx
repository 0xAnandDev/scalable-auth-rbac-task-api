import React from 'react';

/**
 * Reusable text input field component with validation helper states.
 */
const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
  style = {},
  ...props
}) => {
  return (
    <div style={styles.container}>
      {label && <label style={styles.label}>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={{
          ...styles.input,
          borderColor: error ? 'var(--error)' : 'var(--border-color)',
          ...style,
        }}
        {...props}
      />
      {error && <span style={styles.errorText}>{error}</span>}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    width: '100%',
  },
  label: {
    fontSize: '12px',
    fontWeight: '600',
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  input: {
    padding: '10px 14px',
    backgroundColor: 'var(--bg-tertiary)',
    border: '1px solid',
    borderRadius: 'var(--radius-md)',
    color: '#ffffff',
    fontSize: '14px',
    outline: 'none',
    transition: 'var(--transition-fast)',
  },
  errorText: {
    fontSize: '12px',
    color: 'var(--error)',
    marginTop: '2px',
  },
};

export default Input;
