import { Link } from 'react-router-dom';
import './NotExist.css';

const NotExist = () => {
  return (
    <div className="not-exist">
      <h4>Sorry</h4>
      <p>This page doesn't exist 👻</p>
      <Link className="go-home" to="/">Return to the homepage</Link>
    </div>
  )
}

export default NotExist