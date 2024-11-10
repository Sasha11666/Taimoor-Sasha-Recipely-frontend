import { Link } from 'react-router-dom';
import './Home.css';

const Home = ({recipes}) => {

    return (
        <div>
        {recipes && (<div className="recipes">
            {recipes.map((recipe) => (
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