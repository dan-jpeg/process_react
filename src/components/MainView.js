import React, {useCallback, useEffect, useState} from "react";
import ParticleSketch from "./ParticleSketch";
import Navbar from "./AltNavBar";
import StarSketch from "./StarSketch";
import CanvasOptions from "./CanvasOptions";
import MusicPlayer from "./MusicPlayer";


function MainView() {
    const [noiseRatio, setNoiseRatio] = useState(0.001);
    const [nb, setNb] = useState(200);
    const [strokeW, setStrokeW] = useState(1.66);
    const [marginX, setMarginX] = useState(parseInt(window.innerWidth * 0.20))
    const [backgroundColor, setBackgroundColor] = useState([230, 230, 230]);
    const [strokeColor, setStrokeColor] = useState([255, 255, 255]);
    const [xVel, setXVel] = useState([-1, 1]);
    const [yVel, setYVel] = useState([-1, 0.05]);
    const [canvasHeight, setCanvasHeight] = useState(parseInt(window.innerHeight *0.6));
    const [canvasWidth, setCanvasWidth] = useState(window.innerWidth);
    const [marginY, setMarginY] = useState(parseInt(window.innerWidth * 0.10))
    const [currentSketch, setCurrentSketch] = useState("flow");
    const [dMin, setDmin] = useState(66);
    const [canvasOptionsExpanded, setCanvasOptionsExpanded] = useState(false);
    const [canvasErrors, setCanvasErrors] = useState({ width: '', height: '' });
    const [maxNb, setMaxNb] = useState(77777);
    const [borderColor, setBorderColor] = useState([0, 0, 0]); // Default border color: black
    const [borderWidth, setBorderWidth] = useState(0);        // Default border width
    const [sketchUrl, setSketchUrl] = useState('');           // URL of the saved sketch (for sharing)

    const validateInput = () => {
        let isValid = true;
        let errors = { width: '', height: '' };

        if (canvasWidth < 10 || canvasWidth > window.innerWidth) {
            errors.width = 'canvas width cannot exceed page width :c';
            isValid = false;
        }
        if (canvasHeight < 10 || canvasHeight > window.innerHeight) {
            errors.height = 'canvas height cannot exceed page height';
            isValid = false;
        }

        setCanvasErrors(errors);
        return isValid;
    };

    const handleSubmit = () => {
        if (validateInput()) {
            setCanvasWidth(canvasWidth);
            setCanvasHeight(canvasHeight);
        }
    }

    const saveSketch = async () => {
        const sketchData = {
            currentSketch,
            backgroundColor,
            marginX,
            marginY,
            canvasHeight,
            canvasWidth,
            strokeColor,
            borderWidth,
            borderColor,
            noiseRatio,
            nb,
            strokeW,
            xVel,
            yVel,
            dMin
        };

        try {
            const response = await fetch('https://processbackend-production.up.railway.app/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sketchData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Sketch saved! URL:', result.uniqueUrl);
            setSketchUrl(result.uniqueUrl);

            // Do something with result.uniqueUrl (display or share)
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };


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

    const handleBorderColorChange = (hexValue) => {
        const rgbArray = hexToRgb(hexValue);
        setBorderColor(rgbArray);
    }

    const handleStrokeColorChange = (hexValue) => {
        const rgbArray = hexToRgb(hexValue);
        setStrokeColor(rgbArray);
    }

    const handleColorChange = (hexValue, type) => {
        const rgbArray = hexToRgb(hexValue);
        switch (type) {
            case 'background':
                setBackgroundColor(rgbArray);
                break;
            case 'border':
                setBorderColor(rgbArray);
                break;
            case 'stroke':
                setStrokeColor(rgbArray);
                break;
            default:
                console.warn('Invalid color type specified');
        }
    };


    const handleSketchChange = (value) => {
        setCurrentSketch(value);
        if (currentSketch === "flow") {
            setBackgroundColor([15, 30, 45])
            setMarginX(0)
            setMarginY(0)
            setMaxNb(1777)
        }

        if (currentSketch === "star") {

            setMaxNb(77777)
        }
    }

    const handleXVelChange = (index, value) => {
        const updatedValues = [...xVel];
        updatedValues[index] = parseFloat(value) || 0; // Default to 0 if NaN
        setXVel(updatedValues);
    };

    const handleYVelChange = (index, value) => {
        const updatedValues = [...yVel];
        updatedValues[index] = parseFloat(value) || 0; // Default to 0 if NaN
        setYVel(updatedValues);
    };

    const handleMarginXChange = (value) => {
        if ( isNaN(value)) {
            setMarginX(0)
        }
        else {
            setMarginX(parseInt(value));
        }
    }

    const handleMarginYChange = (value) => {
        if ( isNaN(value)) {
            setMarginY(0)
        }
        else {
            setMarginY(parseInt(value));
        }
    }

    const handleCanvasWidthChange = (value) => {
        setCanvasWidth(parseInt(value, 10) || 0); // Update state immediately
    };

    const handleCanvasHeightChange = (value) => {
        setCanvasHeight(parseInt(value, 10) || 0); // Update state immediately
    };



    const debounce = (func, wait) => {
        let timeout;

        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };

            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    const validateDimensions = useCallback(debounce(() => {
        let errors = { width: '', height: '' };
        let isValid = true;

        if (canvasWidth < 10 || canvasWidth > window.innerWidth) {
            errors.width = 'Canvas width cannot exceed page width';
            isValid = false;
        }
        if (canvasHeight < 10 || canvasHeight > window.innerHeight) {
            errors.height = 'Canvas height cannot exceed page height';
            isValid = false;
        }

        setCanvasErrors(errors);
        return isValid;
    }, 500), [canvasWidth, canvasHeight]); // Dependencies


    const handleNbChange = (value) => {
        value = parseInt(value); // Ensure value is an integer
        if (value > maxNb) {
            setNb(maxNb);
        } else if ( value >= 0 ) {
            setNb(value);
        } else {
            setNb(1); // Or handle this case differently if needed
        }
    }



    useEffect(() => {
        validateDimensions();
    }, [validateDimensions]);

    const toggleExpand = () => {
        console.log("Before toggle:", canvasOptionsExpanded);
        setCanvasOptionsExpanded(!canvasOptionsExpanded);
        console.log("After toggle:", canvasOptionsExpanded);
    };

    return (

        <div className="MainView">
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
                handleXVelChange={handleXVelChange}
                handleYVelChange={handleYVelChange}
                currentSketch={currentSketch}
                handleSketchChange={handleSketchChange}
                dMin={dMin}
                handleDMinChange={(value) => setDmin(parseInt(value))}
                canvasHeight={canvasHeight}
                canvasWidth={canvasWidth}
                handleCanvasHeightChange={(value) => setCanvasHeight(parseInt(value))}
                handleCanvasWidthChange={(value) => setCanvasWidth(parseInt(value))}
                canvasOptionsExpanded={canvasOptionsExpanded}
                toggleExpand={toggleExpand}
                saveSketch={saveSketch}
                sketchUrl={sketchUrl}


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
                    canvasWidth={canvasWidth}
                    borderWidth={borderWidth}
                    borderColor={borderColor}
                /> ) : currentSketch === "star" ? (

                <StarSketch
                    currentsketch={currentSketch}
                    backgroundColor={backgroundColor}
                    canvasHeight={canvasHeight}
                    canvasWidth={canvasWidth}
                    dMin={dMin}
                    nb={nb}
                    marginY={marginY}
                    marginX={marginX}
                    xVel={xVel}
                    yVel={yVel}
                    borderWidth={borderWidth}
                    borderColor={borderColor}


                />

            ) : null)}


            <CanvasOptions currentSketch={currentSketch}
                           backgroundColor={backgroundColor}
                           marginX={marginX}
                           marginY={marginY}
                           canvasHeight={canvasHeight}
                           canvasWidth={canvasWidth}
                           handleCanvasHeightChange={(value) => handleCanvasHeightChange(value)}
                           handleCanvasWidthChange={(value) => handleCanvasWidthChange(value)}
                           handleMarginXChange={handleMarginXChange}
                           handleMarginYChange={handleMarginYChange}
                           strokeColor={strokeColor}
                           handleBackgroundColorChange={handleBackgroundColorChange}
                           handleColorChange={handleColorChange}
                           canvasOptionsExpanded={canvasOptionsExpanded}
                           canvasErrors={canvasErrors}
                           borderWidth={borderWidth}
                           borderColor={borderColor}
                           setBorderWidth={setBorderWidth}
                           handleBorderColorChange={handleBorderColorChange}
            />



            {/*    <span>h </span>*/}
            {/*    <input type="string"*/}
            {/*           value={canvasHeight}*/}
            {/*           onChange={(e) => setCanvasHeight(parseInt(e.target.value, 10))}*/}
            {/*    />*/}

            {/*</div>*/}

        </div>
    );
}

export default MainView;