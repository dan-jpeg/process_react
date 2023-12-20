import MainView from "./components/MainView";
import "./css/App.css";
import React from 'react';
import SketchViewer from "./components/SketchViewer";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainView />} />
                <Route path="/sketch/:id" element={<SketchViewer />} />
                {/* Define other routes here */}
            </Routes>
        </Router>
    );
}

export default App;