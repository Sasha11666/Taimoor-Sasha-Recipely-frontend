import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useEffect, useState } from "react";
import api from '../../api/axiosConfig';
// import { useUserContext } from "../App";

// import { useDispatch } from "react-redux";

function Login() {
//   const { setUser } = useUserContext();
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
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

  const handleLogin = async () => {
    if (!userName || !password) {
      setError("Fill in all the fields");
      return;
    }
    setDisable(true);

    try{
        const user = { userName, password};
        const response = await api.post("api/v1/login", {
          ...user,
        });
        console.log(response.data);
        setDisable(false);
        if(response.status == 200) {
            localStorage.setItem("user", JSON.stringify(response.data));
            navigate('/');
        } else {
            setError(response);
        }
        
      } catch(err){
        console.log(err);
      }

  };

  // Сбрасываем ошибку если пользователь меняет данные на форме или меняется режим формы
  useEffect(() => {
    setError(null);
  }, [ userName, password]);

  return (
    <div>
            <Link tp="./register">Go to Register Page</Link>
          
            <div>
            
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
            </div>
            {error && <div>{error}</div>}
            <div>
              {disable ? (
                <p style={{ color: "#000" }}>Signing in...</p>
              ) : (
                <button onClick={handleLogin}>
                  Sign in
                </button>
              )}
            </div>
          
       </div>
  );
}

export default Login