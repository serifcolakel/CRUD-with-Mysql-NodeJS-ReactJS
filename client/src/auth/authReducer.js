export default function authReducer(state, action) {
  switch (action.type) {
    case "AUTH_USER":
      return { ...state, authenticated: true, user: action.payload };
    case "UNAUTH_USER":
      return { ...state, authenticated: false, user: null };
    case "AUTH_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
