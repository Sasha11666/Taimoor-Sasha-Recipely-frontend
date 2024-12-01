import './App.css';
import api from './api/axiosConfig';
import {useState, useEffect} from 'react';
import Layout from './components/Layout';
import {Routes, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Recipe from './components/recipe/Recipe';
import Create from './components/create/Create';
import NotExist from './components/notexist/NotExist';
import Login from './components/login/Login';
import Register from './components/register/Register';
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {

  const [recipes, setRecipes] = useState();
  const [deleted, setDeleted] = useState();
  const [loggedIn, setLoggedIn] = useState();

  const getRecipes = async() => {

    try{
      const response = await api.get("api/v1/recipes");
      setRecipes(response.data);
    } catch(err){
      console.log(err);
    }

  }

  useEffect(() => {
    getRecipes();
  }, [deleted, loggedIn])

  return (
    <div className="App">
      
      
      <Routes>
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} loggedIn={loggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route
        element={
          <ProtectedRoute isAllowed={Boolean(localStorage.getItem("userId"))} />
         }
        >
          <Route path="/" element={<Home setDeleted={setDeleted} deleted={deleted} recipes={recipes}/>}/>
          <Route path="/create" element={<Create deleted={deleted} setDeleted={setDeleted}/>}/>
          <Route path="/recipes/:id" element={<Recipe deleted={deleted} setDeleted={setDeleted}/>}/>
      </Route>
        
        <Route path="*" element={<NotExist/>}/>
      </Routes>

    </div>
  );
}

export default App;
