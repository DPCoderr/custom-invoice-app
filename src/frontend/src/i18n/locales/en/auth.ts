export const auth = {
  login: {
    title: "Welcome back",
    description: "Sign in with Google or your email",
    google: "Login with Google",
    divider: "Or continue with",
    submit: "Login",
    noAccount: "Don't have an account?",
    signupLink: "Sign up",
  },
  signup: {
    title: "Create your account",
    description: "Enter your email below to create your account",
    submit: "Create account",
    existingAccount: "Already have an account?",
    loginLink: "Sign in",
  },
  fields: {
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm password",
  },
  placeholders: {
    firstName: "John",
    lastName: "Doe",
    email: "j.doe@gmail.com",
  },
  passwordHint: "Must be at least 6 characters long.",
  logout: "Log out",
  validation: {
    passwordsDoNotMatch: "Passwords do not match",
  },
} as const;
