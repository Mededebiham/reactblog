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
            <div className="flex flex-col min-h-screen" style={{ position: 'relative', zIndex: 1 }}>
                <Navbar />
                <div className="flex-1 overflow-auto">
                    <ContentRoute />
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
