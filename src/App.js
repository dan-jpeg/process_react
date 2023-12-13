import React, { useState } from "react";
import "./css/App.css";
import ParticleSketch from "./components/ParticleSketch";
import Navbar from "./components/AltNavBar";
import StarSketch from "./components/StarSketch";

function App() {
    const [noiseRatio, setNoiseRatio] = useState(0.001);
    const [nb, setNb] = useState(250);
    const [strokeW, setStrokeW] = useState(1.66);
    const [margin, setMargin] = useState(parseInt(window.innerWidth * 0.20))
    const [backgroundColor, setBackgroundColor] = useState([230, 230, 230]);
    const [strokeColor, setStrokeColor] = useState([255, 255, 255]);
    const [xVel, setXVel] = useState([-1, 20]);
    const [yVel, setYVel] = useState([-1, 0.05]);
    const [canvasHeight, setCanvasHeight] = useState(parseInt(window.innerHeight * 0.6));
    const [topBotMargin, setTopBotMargin] = useState(parseInt(window.innerWidth * 0.10));
    const [currentSketch, setCurrentSketch] = useState("flow");


    const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16)
        ] : null;
    };

    const handleBackgroundColorChange = (hexValue) => {
        const rgbArray = hexToRgb(hexValue);
        setBackgroundColor(rgbArray);
    };


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
                handleBackgroundColorChange={handleBackgroundColorChange}
                handleStrokeColorChange={(value) => setStrokeColor(value)}
                xVel={xVel}
                yVel={yVel}
                handleXVelChange={(value) => setXVel(value)}
                handleYVelChange={(value) => setYVel(value)}
                setCurrentSketch={(value) => setCurrentSketch(value)}
                currentSketch={currentSketch}

            />
            {(currentSketch === "flow" ? (
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
            /> ) : currentSketch === "star" ? (

            <StarSketch />
                ) : null)}
            {/*<div className="footer" >*/}

            {/*    <span>h </span>*/}
            {/*    <input type="string"*/}
            {/*           value={canvasHeight}*/}
            {/*           onChange={(e) => setCanvasHeight(parseInt(e.target.value, 10))}*/}
            {/*    />*/}

            {/*</div>*/}

        </div>
    );
}

export default App;