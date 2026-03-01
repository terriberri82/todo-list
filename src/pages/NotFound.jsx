
import {NavLink} from 'react-router-dom'

function NotFound(){
  return (
    <>
    <p>page not found</p>
    <NavLink to="/">Go back home</NavLink>
    </>
  )
}
export default NotFound