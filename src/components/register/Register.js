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

//   const handleLogin = async () => {
//     if (!email || !password) {
//       setError("Заполните все поля");
//       return;
//     }
//     setDisable(true);
//     loginUser(email, password)
//       .then((data) => {
//         setUser(data);
//         localStorage.setItem("user", JSON.stringify(data));
//         dispatch(setCurrentAlbumName("main"));
//         navigate("/");
//       })
//       .then(() => {
//         getToken(email, password).then((data) => {
//           localStorage.setItem("token", JSON.stringify(data));
//           localStorage.setItem("refreshToken", JSON.stringify(data.refresh));
//         });
//       })
//       .catch((err) => {
//         setError(err.message);
//       })
//       .finally(() => {
//         setDisable(false);
//       });
//   };

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
  }, [ userName, password, repeatPassword]);

  return (
    <div>
            <Link tp="./login">Go to Login Page</Link>
          
            <div>
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
            <div>
              {disable ? (
                <p style={{ color: "#000" }}>Registering user...</p>
              ) : (
                <button onClick={handleRegister}>
                  Register
                </button>
              )}
            </div>
          
       </div>
  );
}

export default Register