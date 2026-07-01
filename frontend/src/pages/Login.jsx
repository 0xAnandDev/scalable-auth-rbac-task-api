import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all credentials fields');
      return;
    }

    setError('');
    setSubmitting(true);
    
    const result = await login(email, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message || 'Login failed');
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      {error && <div style={styles.errorAlert}>{error}</div>}

      <div style={styles.inputGroup}>
        <label style={styles.label}>Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          style={styles.input}
          required
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          style={styles.input}
          required
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        style={{
          ...styles.submitButton,
          opacity: submitting ? 0.7 : 1,
          cursor: submitting ? 'not-allowed' : 'pointer',
        }}
      >
        {submitting ? 'Authenticating...' : 'Sign In'}
      </button>

      <p style={styles.footerText}>
        Don't have an account?{' '}
        <Link to="/register" style={styles.footerLink}>
          Sign up
        </Link>
      </p>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  errorAlert: {
    padding: '12px 16px',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid var(--error)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--error)',
    fontSize: '14px',
    textAlign: 'left',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '12px',
    fontWeight: '600',
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  input: {
    padding: '12px 16px',
    backgroundColor: 'var(--bg-tertiary)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-md)',
    color: '#ffffff',
    fontSize: '15px',
    outline: 'none',
    transition: 'var(--transition-fast)',
  },
  submitButton: {
    marginTop: '10px',
    padding: '14px',
    backgroundColor: 'var(--primary)',
    color: '#ffffff',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    fontSize: '15px',
    fontWeight: '600',
    transition: 'var(--transition-fast)',
  },
  footerText: {
    textAlign: 'center',
    fontSize: '14px',
    color: 'var(--text-secondary)',
    marginTop: '8px',
  },
  footerLink: {
    color: 'var(--primary)',
    textDecoration: 'none',
    fontWeight: '600',
  },
};

export default Login;
