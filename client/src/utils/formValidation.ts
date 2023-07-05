export const validateEmail = (email: string) => {
  const emailValid = email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  if (email.length === 0) return 'Please enter an email';
  if (!emailValid) return 'Email is not valid';
};

export const validatePassword = (password: string) => {
  if (password.length === 0) return 'Please enter a password';
  if (password.length < 8) {
    return 'Your password must be at least 8 characters';
  }
  if (password.search(/[a-z]/i) < 0) {
    return 'Your password must contain at least one letter.';
  }
  if (password.search(/^(?=.*[A-Z]).*$/) < 0) {
    return 'Your password must contain at least one uppercase letter.';
  }
  if (password.search(/[0-9]/) < 0) {
    return 'Your password must contain at least one digit.';
  }
};
