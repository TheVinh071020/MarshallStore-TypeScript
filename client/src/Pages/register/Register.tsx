import { Navigate } from "react-router-dom";
import RegisterScreen from "../../components/screen/RegisterScreen";

const Register = () => {
  const token = localStorage.getItem("token") || "";
  if (!token) {
    return <RegisterScreen />;
  } else {
    return <Navigate to="/" />;
  }
};

export default Register;
