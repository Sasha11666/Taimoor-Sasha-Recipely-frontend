import './App.css';
import api from './api/axiosConfig';
import {useState, useEffect} from 'react';
import Layout from './components/Layout';
import {Routes, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Recipe from './components/recipe/Recipe';
import Create from './components/create/Create';
import NotExist from './components/notexist/NotExist';
import Navbar from './components/navbar/Navbar';

function App() {

  const [recipes, setRecipes] = useState();
  const [deleted, setDeleted] = useState();

  const getRecipes = async() => {

    try{
      const response = await api.get("api/v1/recipes");
      console.log(response.data);
      setRecipes(response.data);
    } catch(err){
      console.log(err);
    }

  }

  useEffect(() => {
    getRecipes();
  }, [deleted])

  return (
    <div className="App">
      <Navbar/>
      
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" element={<Home recipes={recipes}/>}/>
        </Route>
        <Route path="/create" element={<Create deleted={deleted} setDeleted={setDeleted}/>}/>
        <Route path="/recipes/:id" element={<Recipe deleted={deleted} setDeleted={setDeleted}/>}/>
        <Route path="*" element={<NotExist/>}/>
      </Routes>

    </div>
  );
}

export default App;
