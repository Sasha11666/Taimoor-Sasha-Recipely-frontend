import React from 'react';
import { useParams } from 'react-router-dom';
import {useState, useEffect} from 'react';
import api from '../../api/axiosConfig';
import './Recipe.css';
import { useNavigate } from 'react-router-dom';
import  Navbar  from "../navbar/Navbar";

const Recipe = ({deleted, setDeleted}) => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState();
    const navigate = useNavigate();

    const getRecipe = async() => {
  
      try{
        const response = await api.get("api/v1/recipes/" + id);
        console.log(response.data);
        setRecipe(response.data);
      } catch(err){
        console.log(err);
      }
  
    }

    const deleteRecipe = async() => {
      try{
        const response = await api.delete("api/v1/recipes/" + id);
        console.log(response.data);
        setDeleted(!deleted);
        navigate('/');
      } catch(err){
        console.log(err);
      }
    
    }
  
    useEffect(() => {
      getRecipe();
    }, [])
  return (
    <div className='recipe-details'>
      {!recipe && (
        <div>
          Recipe not found 😕
        </div>
      )}
      {recipe && (
        <article>
          <Navbar/>
          <h2>{recipe.name}</h2>
          <p><i>Created by {recipe.firstName} {recipe.lastName}</i></p>
          <div className='ingredients'>
            <p className='title'>Ingredients: </p>
            <p>{recipe.ingredients}</p>
          </div>
          <div className='description'>
            <p className='title'>Instructions:</p>
            <p>{recipe.description}</p>
          </div>
          <button onClick={deleteRecipe}>Delete</button>
        </article>
      )}
    </div>
    
  )
}

export default Recipe