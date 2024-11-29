import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { useEffect, useState } from "react";
import api from '../../api/axiosConfig';
// import { useUserContext } from "../App";

// import { useDispatch } from "react-redux";

function Register() {
//   const { setUser } = useUserContext();
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [disable, setDisable] = useState(false);
//   const dispatch = useDispatch();
  let navigate = useNavigate();



  const handleRegister = async () => {
    if (!firstName || !lastName || !userName || !password || !repeatPassword) {
      setError("Fill in all the fields");
      return;
    }
    if (password !== repeatPassword) {
      setError("Passwords do not match");
      return;
    }
    setDisable(true);

    try{
        const user = {firstName, lastName, userName, password};
        const response = await api.post("api/v1/register", {
          ...user,
        });
        console.log(response.data);
        setDisable(false);
        navigate('/login');
      } catch(err){
        console.log(err);
      }

  };

  // Сбрасываем ошибку если пользователь меняет данные на форме или меняется режим формы
  useEffect(() => {
    setError(null);
    localStorage.removeItem("user");
  }, [ userName, password, repeatPassword]);

  return (
    <div className="register-page">
          <h1>Recipely🥑</h1>  
          <div>
            <div className="register">
            <input
                type="text"
                name="firstName"
                placeholder="Enter your fisrt name"
                value={firstName}
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(event) => {
                  setLastName(event.target.value);
                }}
              />
              <input
                type="text"
                name="userName"
                placeholder="Enter your username"
                value={userName}
                onChange={(event) => {
                  setUserName(event.target.value);
                }}
              />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              <input
                type="password"
                name="repeat-password"
                placeholder="Repeat password"
                value={repeatPassword}
                onChange={(event) => {
                  setRepeatPassword(event.target.value);
                }}
              />
            </div>
            {error && <div>{error}</div>}
            <div className="button-block">
              {disable ? (
                <p style={{ color: "#000" }}>Registering user...</p>
              ) : (
                <button onClick={handleRegister}>
                  Sign up
                </button>
              )}
            </div>
            </div>
            <div className="link">
                <Link to="/login">Already have an account? Sign in</Link>
            </div>
            
       </div>
  );
}

export default Register