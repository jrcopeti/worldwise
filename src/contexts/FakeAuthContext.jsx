import { createContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };

    case "logout":
      return { ...state, user: null, isAuthenticated: false };

    default:
      throw new Error(`Action type ${action.type} is not supported`);
  }
}

function AuthProvider({ children }) {
  const savedUser = sessionStorage.getItem("user");

  if (savedUser) {
    initialState.user = JSON.parse(savedUser);
    initialState.isAuthenticated = true;
  }
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(name) {
    sessionStorage.setItem("user", JSON.stringify(name));
    dispatch({ type: "login", payload: name });
  }

  function logout() {
    sessionStorage.removeItem("user");
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
