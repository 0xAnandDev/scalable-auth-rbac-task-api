import React from 'react';

/**
 * Reusable button component configured with premium visual styles.
 */
const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  disabled = false,
  loading = false,
  onClick,
  style = {},
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondary;
      case 'danger':
        return styles.danger;
      case 'primary':
      default:
        return styles.primary;
    }
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      style={{
        ...styles.base,
        ...getVariantStyles(),
        opacity: disabled || loading ? 0.6 : 1,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        ...style,
      }}
      {...props}
    >
      {loading ? 'Processing...' : children}
    </button>
  );
};

const styles = {
  base: {
    padding: '10px 18px',
    borderRadius: 'var(--radius-md)',
    fontSize: '14px',
    fontWeight: '600',
    border: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'var(--transition-fast)',
    outline: 'none',
  },
  primary: {
    backgroundColor: 'var(--primary)',
    color: '#ffffff',
  },
  secondary: {
    backgroundColor: 'var(--bg-tertiary)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-color)',
  },
  danger: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    color: 'var(--error)',
    border: '1px solid var(--error)',
  },
};

export default Button;
