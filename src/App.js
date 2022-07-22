import React from "react";
import { Route, Routes } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "./components/Layout/Layout";
import Home from "./components/Layout/Home/Home";
import Details from "./components/Layout/Details/Details";

function App() {
  return (
    <motion.div key="app">
      <Layout>
        <Routes>
          <React.Fragment>
            <Route path="/">
              <Route exact path="/" element={<Home />} />
            </Route>
            <Route path="/details/:itemId">
              <Route exact path="/details/:itemId" element={<Details />} />
            </Route>
          </React.Fragment>
        </Routes>
      </Layout>
    </motion.div>
  );
}

export default App;
