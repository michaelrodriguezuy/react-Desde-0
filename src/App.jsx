import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./components/pages/home/Home"
import Login from "./components/pages/login/Login"
import Formulario from "./components/pages/formulario/Formulario"
import Peliculas from "./components/pages/peliculas/Peliculas"
import AuthContextProvider from "./context/AuthContext"


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/formulario" element={<Formulario />} />

            {/* quiero que despues de estar logueado me redirija a la pagina de peliculas, por mientras lo dejo asi */}
            <Route path="/peliculas" element={<Peliculas />} />

          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
