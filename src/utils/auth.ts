export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userRole');
  window.location.href = '/login';
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  const role = localStorage.getItem('userRole');
  return !!token && !!role;
};

export const getUserRole = () => {
  return localStorage.getItem('userRole') as 'admin' | 'student' | null;
};

export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};
