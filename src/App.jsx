import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Navbar from "./components/Navbar";
import ContentRoute from "./components/ContentRoute";

function App() {

  return (
    <Router>
      <div>
        <Navbar />
        <ContentRoute />
      </div>
    </Router>
  );
}

export default App;
