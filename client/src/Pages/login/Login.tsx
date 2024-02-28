import { Navigate } from "react-router-dom";
import LoginScreen from "../../components/screen/LoginScreen";

const Login = () => {
  const token = localStorage.getItem("token") || "";
  if (!token) {
    return <LoginScreen />;
  } else {
    return <Navigate to="/" />;
  }
};

export default Login;
