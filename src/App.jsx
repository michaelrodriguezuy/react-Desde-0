import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Home from "./components/pages/home/Home"
import Login from "./components/pages/login/Login"
import Formulario from "./components/pages/formulario/Formulario"
import Peliculas from "./components/pages/peliculas/Peliculas"
import AuthContextProvider from "./context/AuthContext"
import ProtectedRoutes from "./components/router/ProtectedRoutes"


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

            <Route element={<ProtectedRoutes/>}>
              <Route path="/peliculas" element={<Peliculas />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />

          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </div >
  )
}

export default App
