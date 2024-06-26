import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import ContentRoute from './components/ContentRoute';
import Footer from './components/Footer';
import FinisherCanvas from "./styles/Particle";



function App() {
    return (
        <Router>
            {/*<FinisherCanvas/>*/}
            <div style={{ position: 'relative', zIndex: 1 }}>
                <Navbar />
                <ContentRoute />
                <Footer />
            </div>
        </Router>
    );
}

export default App;
