import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Navbar from './components/Navbar';
import ContentRoute from './components/ContentRoute';
import Footer from './components/Footer';
import bg from './assets/bg.jpg';

function App() {
    return (<Router>
            {/*<FinisherCanvas/>*/}
            <div
                className="flex flex-col min-h-screen relative bg-gradient-to-tr from-subtext1 to-overlay2 dark:from-mantle dark:to-crust">
                <img src={bg} alt="background-image" className="w-full h-full object-cover absolute mix-blend-overlay"/>
                <div className="relative z-10 flex-1 flex flex-col">
                    <Navbar/>
                    <div className="flex-1 overflow-auto">
                        <ContentRoute/>
                    </div>
                    <Footer/>
                </div>
            </div>
        </Router>);
}

export default App;
