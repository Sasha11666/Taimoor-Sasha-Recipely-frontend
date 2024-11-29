import { Link } from 'react-router-dom';
import './Home.css';
import  Navbar  from "../navbar/Navbar";




const Home = ({recipes}) => {

    return (
        <div>
        <Navbar/>
        {recipes && (<div className="recipes">
            {recipes.filter((recipe) => recipe.userId.toString() == localStorage.getItem("userId").replace(/"/g, '')).map((recipe) => (
                <div className="recipe-preview" key={recipe.id}>
                    <Link to={`/recipes/${recipe.id}`}>
                        <h2>{recipe.name}</h2>
                        <p>Created by {recipe.firstName}</p>
                    </Link>
                    
                </div>
               
            ))}
        </div>)}
        </div>
    )
}

export default Home