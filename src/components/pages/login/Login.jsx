import { Link } from 'react-router-dom'

const Login = () => {
  return (

    <>
    <h2>Login</h2>
    <Link to="/">Ir al Home - </Link>

    {/* quiero que despues de estar logueado me redirija a la pagina de peliculas, por mientras lo dejo asi */}
    <Link to="/peliculas">Ver peliculas</Link>
    </>
  )
}

export default Login