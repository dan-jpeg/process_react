import React, { useState } from "react";
import "./App.css";
import ParticleSketch from "./ParticleSketch";
import Navbar from "./AltNavBar";

function App() {
    const [noiseRatio, setNoiseRatio] = useState(0.001);
    const [nb, setNb] = useState(250);
    const [strokeW, setStrokeW] = useState(1.66);
    const [margin, setMargin] = useState(window.innerWidth * 0.15);
    const [topBotMargin, setTopBotMargin] = useState(window.innerWidth * 0.10);
    const [backgroundColor, setBackgroundColor] = useState([230, 230, 230]);
    const [strokeColor, setStrokeColor] = useState([255, 255, 255]);
    const [xVel, setXVel] = useState([-1, 20]);
    const [yVel, setYVel] = useState([-1, 0.05]);
    const [canvasHeight, setCanvasHeight] = useState(window.innerHeight * 0.6);

    return (
        <div className="App">
            <Navbar
                noiseRatio={noiseRatio}
                nb={nb}
                strokeW={strokeW}
                margin={margin}
                topBotMargin={topBotMargin}
                backgroundColor={backgroundColor}w
                strokeColor={strokeColor}
                handleNbChange={(value) => setNb(value)}
                handleNoiseRatioChange={(value) => setNoiseRatio(value)}
                handleStrokeWChange={(value) => setStrokeW(value)}
                handleMarginChange={(value) => setMargin(parseInt(value, 10))}
                handleTopBotMarginChange={(value) => setTopBotMargin(parseInt(value, 10))}
                handleBackgroundColorChange={(value) => setBackgroundColor(value)}
                handleStrokeColorChange={(value) => setStrokeColor(value)}
                xVel={xVel}
                yVel={yVel}
                handleXVelChange={(value) => setXVel(value)}
                handleYVelChange={(value) => setYVel(value)}
            />

            <ParticleSketch
                noiseRatio={noiseRatio}
                nb={nb}
                strokeW={strokeW}
                margin={margin}
                topBotMargin={topBotMargin}
                backgroundColor={backgroundColor}
                strokeColor={strokeColor}
                xVel={xVel}
                yVel={yVel}
                canvasHeight={canvasHeight}
            />
            <div className="footer" >

                <span>h </span>
                <input type="string"
                       value={canvasHeight}
                       onChange={(e) => setCanvasHeight(parseInt(e.target.value, 10))}
                />
            </div>
        </div>
    );
}

export default App;