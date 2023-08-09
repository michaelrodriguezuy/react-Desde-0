import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./components/pages/home/Home"
import Login from "./components/pages/login/Login"
import Formulario from "./components/pages/formulario/Formulario"
import Peliculas from "./components/pages/peliculas/Peliculas"


function App() {

  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/formulario" element={<Formulario />} />
            <Route path="/peliculas" element={<Peliculas />} />
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
