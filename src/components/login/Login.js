import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useEffect, useState } from "react";
import api from '../../api/axiosConfig';


function Login({setLoggedIn, loggedIn}) {

  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(false);
  let navigate = useNavigate();



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
        setDisable(false);
        if(response.status == 200) {
            localStorage.setItem("userId", JSON.stringify(response.data.id));
            localStorage.setItem("userFirstName", JSON.stringify(response.data.firstName));
            navigate('/');
            setLoggedIn(!loggedIn);
        } 
        
      } catch(err){
        console.log(err);
        if(err.status == 404) {
          setError("Invalid password or username, try again!");
          setDisable(false);
        }
        
      }

  };

  useEffect(() => {
    setError(null);
    localStorage.removeItem("user");
  }, [ userName, password]);

  return (
    <div className="login-page">
        
         <h1>Recipely🥑</h1>
         <div>
            <div className="login">
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
            {error && <div className="error">{error}</div>}
            <div className="button-block">
              {disable ? (
                <p style={{ color: "#000" }}>Logging in...</p>
              ) : (
                <button onClick={handleLogin}>
                  Log in
                </button>
              )}
            </div>
          </div>
            <div className="link">
                <Link to="/register">Don't have an account? Sign up</Link>
            </div>
       </div>
  );
}

export default Login