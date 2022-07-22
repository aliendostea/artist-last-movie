import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import "./sass/App.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <AnimatePresence exitBeforeEnter>
        <App />
      </AnimatePresence>
    </Provider>
  </BrowserRouter>
);

///// TODO
///// 1- filtro de likes, nombre de a - z, genero, peliculas o series ---
///// 2- likes en las fotos con animacion onclick -------
///// 3- animacion onclick al darle click a un artista con foto
///// 4- diseño y animación en details
///// 5- test async await y otros
///// 6- login para ver otras cosas en la web, como trending artist
