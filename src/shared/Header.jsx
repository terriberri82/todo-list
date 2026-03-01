
import {NavLink, useLocation} from 'react-router-dom'
import styles from './Header.module.css';
import { useState, useEffect } from 'react';

function Header(){
 const location =useLocation()
 const [title, setTitle] = useState("Todo List");

 useEffect(() => {
    if (location.pathname === "/") {
      setTitle("Todo List");
    } else if (location.pathname === "/about") {
      setTitle("About");
    } else {
      setTitle("Not Found");
    }
  }, [location]);
return(
    <div>
        <h1>{title}</h1>
        <nav>
            <NavLink to="/" className={({isActive}) =>isActive ? styles.active : styles.inactive}>
            Home </NavLink>
            <NavLink to="/about" className={({isActive}) =>isActive ? styles.active : styles.inactive}>About</NavLink>
        </nav>
    </div>
)

}

export default Header