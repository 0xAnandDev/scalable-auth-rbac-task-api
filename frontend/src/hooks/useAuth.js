import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * Custom hook wrapper to consume the AuthContext state and helper methods.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be consumed within an AuthProvider context wrapper');
  }
  return context;
};

export default useAuth;
