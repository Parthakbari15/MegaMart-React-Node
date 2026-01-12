export const isAuthenticated = () => {
    return !!localStorage.getItem("megamart_user");
  };
  