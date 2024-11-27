import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Create.css";
import api from '../../api/axiosConfig';


const Create = ({deleted, setDeleted}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const navigate = useNavigate();

  const addRecipe = async(e) => {
    try{
      e.preventDefault();
      const newRecipe = { name, description, ingredients};
      const response = await api.post("api/v1/recipes", {
        userId: localStorage.getItem("user").replace(/"/g, ''),
        ...newRecipe,
      });
      console.log(response.data);
      console.log('New recipe added!')
      setDeleted(!deleted);
      navigate('/');
    } catch(err){
      console.log(err);
    }

  }


  return (
    <div className="create">
    <h2>Create a recipe</h2>
    <form onSubmit={addRecipe}>
      <label>Name:</label>
      <input
       type="text"
       required
       value={name}
       onChange={(e) => setName(e.target.value)}
        />
      <label>Description:</label>
      <textarea 
        required
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <label>Ingredients:</label>
      <input
       type="text"
       required
       value={ingredients}
       onChange={(e) => setIngredients(e.target.value)}
      />
      <button>Add a recipe</button>
      
    </form>
    </div>
    
  )
}

export default Create