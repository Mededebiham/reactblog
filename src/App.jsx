import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Navbar from "./components/Navbar";
import ContentRoute from "./components/ContentRoute";
import Footer from "./components/Footer";

function App() {
    return (
            <Router>
                <div>
                    <Navbar/>
                    <ContentRoute/>
                    <Footer/>
                </div>
            </Router>
    )}

export default App;
