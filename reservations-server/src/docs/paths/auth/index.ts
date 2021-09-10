import signup from './signup';
import signupWithEmailVerification from './signup-with-email-verification';
import activateAccount from './activate-account';
import login from './login';
import forgotPassword from './forgot-password';
import resetPassword from './reset-password';
import currentUser from './current-user';

export default {
  '/auth/signup': {
    ...signup,
  },
  '/auth/signup-with-email-verification': {
    ...signupWithEmailVerification,
  },
  '/auth/activate-account': {
    ...activateAccount,
  },
  '/auth/login': {
    ...login,
  },
  '/auth/forgot-password': {
    ...forgotPassword,
  },
  '/auth/reset-password': {
    ...resetPassword,
  },
  '/auth/current-user': {
    ...currentUser,
  },
};
