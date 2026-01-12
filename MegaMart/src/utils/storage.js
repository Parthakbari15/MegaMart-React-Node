export const saveUser = (data) => {
    localStorage.setItem(
      "megamart_user",
      JSON.stringify({
        token: data.token,
        user: data.user,
        loggedInAt: new Date().toISOString(),
      })
    );
  };
  
  export const getUser = () =>
    JSON.parse(localStorage.getItem("megamart_user"));
  
  export const clearUser = () =>
    localStorage.removeItem("megamart_user");
  