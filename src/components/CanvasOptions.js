import React, { useState,  } from "react";
import "../css/canvas-options.css";

const CanvasOptions = ( {currentSketch, backgroundColor, marginX, marginY,
                            canvasHeight, canvasWidth, handleMarginYChange,handleMarginXChange,
                            handleBackgroundColorChange, canvasOptionsExpanded, canvasErrors,
                            handleCanvasWidthChange, handleCanvasHeightChange,
                            borderColor,    borderWidth, setBorderWidth, handleBorderColorChange, strokeColor, handleColorChange}) => {


    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        console.log("Button clicked");
    };

    const rgbToHex = (color) => {
        // Destructure the RGB values from the array
        const [r, g, b] = color;

        // Convert an individual number to a hexadecimal string
        const toHex = (n) => {
            if (n < 0) n = 0;
            if (n > 255) n = 255;
            let hex = n.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };

        // Convert each component and concatenate
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    };
    return (
        <div>
            <div className={`canvas-options ${canvasOptionsExpanded ? "expanded" : ""}`}>
                <div className="canvas-options-content">
                    <div className="canvas-options-content-item-color">
                        <div><span>CANVAS</span></div>
                        <div><input type="color"
                               value={rgbToHex(backgroundColor)}
                               onChange={(e) => handleBackgroundColorChange(e.target.value)}
                        /></div>

                    </div>

                    <div className="canvas-options-content-item-color">
                        <div><span>STROKE</span></div>
                        <div><input type="color"
                                    value={rgbToHex(strokeColor)}
                                    onChange={(e) => handleColorChange(e.target.value, "stroke")}
                        /></div>

                    </div>
                    <div className="canvas-options-content-item">
                        <span>MARGIN X</span>
                        <input type="string"
                               value={marginX}
                               onChange={(e) => handleMarginXChange(e.target.value)}
                        />
                    </div>
                    <div className="canvas-options-content-item">
                        <span>MARGIN Y</span>
                        <input type="string"
                               value={marginY}
                               onChange={(e) => handleMarginYChange(e.target.value)}
                        />
                    </div>
                    <div className="canvas-options-content-item">
                        <span>HEIGHT</span>
                        <input type="string"
                               value={canvasHeight}
                               onChange={(e) => handleCanvasHeightChange(e.target.value)}
                        />
                    </div>
                    <div className="canvas-options-content-item">
                        <span>WIDTH</span>
                        <input type="string"
                               value={canvasWidth}
                               onChange={(e) => handleCanvasWidthChange(e.target.value)}
                        />
                    </div>
                    <div className="canvas-options-content-item border">
                        <div className="label">BORDER</div> {/* Label */}
                        <div className="inputs"> {/* Inputs container */}
                            w<input type="string" value={borderWidth} onChange={(e) => setBorderWidth(parseInt(e.target.value))}/>
                            <div className="color-picker border">
                                <input type="color" value={rgbToHex(borderColor)} onChange={(e) => handleBorderColorChange(e.target.value)}/>
                            </div>
                        </div>
                    </div>



                    {/*// Errors.height && <p className="error">{canvasErrors.height}</p>}*/}
                </div>
            </div>
        </div>
    )
}

export default CanvasOptions;