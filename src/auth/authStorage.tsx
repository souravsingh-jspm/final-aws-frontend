const AUTH_TTL = 5 * 60 * 1000; // 5 minutes

export const saveAuth = (token: string, user: object) => {
  const expiry = Date.now() + AUTH_TTL;

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("auth_expiry", expiry.toString());
};

export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("auth_expiry");
};

export const isAuthExpired = () => {
  const expiry = localStorage.getItem("auth_expiry");
  return !expiry || Date.now() > Number(expiry);
};
