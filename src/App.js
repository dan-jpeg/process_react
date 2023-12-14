import React, { useState } from "react";
import "./css/App.css";
import ParticleSketch from "./components/ParticleSketch";
import Navbar from "./components/AltNavBar";
import StarSketch from "./components/StarSketch";

function App() {
    const [noiseRatio, setNoiseRatio] = useState(0.001);
    const [nb, setNb] = useState(200);
    const [strokeW, setStrokeW] = useState(1.66);
    const [marginX, setMarginX] = useState(parseInt(window.innerWidth * 0.20))
    const [backgroundColor, setBackgroundColor] = useState([230, 230, 230]);
    const [strokeColor, setStrokeColor] = useState([255, 255, 255]);
    const [xVel, setXVel] = useState([-1, 1]);
    const [yVel, setYVel] = useState([-1, 0.05]);
    const [canvasHeight, setCanvasHeight] = useState(parseInt(window.innerHeight * 0.6));
    const [marginY, setMarginY] = useState(parseInt(window.innerWidth * 0.10));
    const [currentSketch, setCurrentSketch] = useState("flow");
    const [dMin, setDmin] = useState(66);


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

    const handleSketchChange = (value) => {
        setCurrentSketch(value);
        if (currentSketch === "flow") {
            setBackgroundColor([20, 40, 30])
            setMarginX(0)
            setMarginY(0)
        }
    }

    const handleNbChange = (value) => {
        if (value > 0 && value) {
            setNb(value)
        } else {
            setNb(1)
        }
    }

    return (
        <div className="App">
            <Navbar
                noiseRatio={noiseRatio}
                nb={nb}
                strokeW={strokeW}
                marginX={marginX}
                marginY={marginY}
                backgroundColor={backgroundColor}w
                strokeColor={strokeColor}
                handleNbChange={(value) => handleNbChange(value)}
                handleNoiseRatioChange={(value) => setNoiseRatio(value)}
                handleStrokeWChange={(value) => setStrokeW(value)}
                handleMarginXChange={(value) => setMarginX(parseInt(value, 10))}
                handleMarginYChange={(value) => setMarginY(parseInt(value, 10))}
                handleBackgroundColorChange={handleBackgroundColorChange}
                handleStrokeColorChange={(value) => setStrokeColor(value)}
                xVel={xVel}
                yVel={yVel}
                handleXVelChange={(value) => setXVel(value)}
                handleYVelChange={(value) => setYVel(value)}
                currentSketch={currentSketch}
                handleSketchChange={handleSketchChange}
                dMin={dMin}
                handleDMinChange={(value) => setDmin(parseInt(value))}

            />
            {(currentSketch === "flow" ? (
            <ParticleSketch
                noiseRatio={noiseRatio}
                nb={nb}
                strokeW={strokeW}
                marginX={marginX}
                marginY={marginY}
                backgroundColor={backgroundColor}
                strokeColor={strokeColor}
                xVel={xVel}
                yVel={yVel}
                canvasHeight={canvasHeight}
            /> ) : currentSketch === "star" ? (

            <StarSketch
                currentsketch={currentSketch}
                backgroundColor={backgroundColor}
                canvasHeight={canvasHeight}
                dMin={dMin}
                nb={nb}
                marginY={marginY}
                marginX={marginX}
                xVel={xVel}
                yVel={yVel}

            />
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