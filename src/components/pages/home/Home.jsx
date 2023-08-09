import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
    <h2>Home</h2>
    
    <Link to="/login">Login -</Link>
    <Link to="/formulario"> Registro</Link>
    </>

  )
}

export default Home