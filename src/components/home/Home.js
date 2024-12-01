import { Link } from 'react-router-dom';
import './Home.css';
import  Navbar  from "../navbar/Navbar";



const Home = ({recipes, setDeleted, deleted}) => {

    return (
        <div>
        <Navbar setDeleted={setDeleted} deleted={deleted}/>
        <div className="greet-block">Hello {localStorage.getItem("userFirstName").replace(/"/g, '')}🙂</div>
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
       {recipes && recipes.filter((recipe) => recipe.userId.toString() == localStorage.getItem("userId").replace(/"/g, '')).length == 0 && <div className='empty'>Looks like your recipe collection is still empty... time to spice things up and add something <b>scrumptious</b>!😋</div>}
        
        </div>
    )
}

export default Home