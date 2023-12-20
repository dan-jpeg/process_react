    import React, { useState, useEffect } from "react";
    import "../css/AltNavBar.css";
    import logo1 from "../asset/logoSmall.png";
    import logo2 from "../asset/ph-riposte copy.png";
    import homeIcon from "../asset/home.svg";
    import layerIcon from "../3-layers.svg";
    import MusicPlayer from "./MusicPlayer";

    const Navbar = ({
                        noiseRatio,
                        marginX,
                        marginY,
                        nb,
                        strokeW,
                        strokeColor,
                        backgroundColor,
                        handleBackgroundColorChange,
                        handleNbChange,
                        handleMarginXChange,
                        handleMarginYChange,
                        handleNoiseRatioChange,
                        handleStrokeColorChange,
                        handleStrokeWChange,
                        xVel, yVel, handleXVelChange, handleYVelChange,
                        setCurrentSketch,
                        currentSketch,
                        dMin,
                        handleDMinChange,
                        handleSketchChange,
                        toggleExpand,
                        canvasOptionsExpanded,
                        saveSketch,
                        sketchUrl
                    }) => {
        const [scrolled, setScrolled] = useState(false);

        const [isMarginFocused, setIsMarginFocused] = useState(false);

        useEffect(() => {
            const handleScroll = () => {
                if (window.scrollY > 10) {
                    setScrolled(true);
                } else {
                    setScrolled(false);
                }
            };

            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }, []);

        const rgbToHex = (r, g, b) => {
            // Convert an individual number to a hexadecimal string
            const toHex = (n) => {
                // Ensure the number is within the range 0-255
                if (n < 0) n = 0;
                if (n > 255) n = 255;

                // Convert to hexadecimal and add a leading zero if necessary
                let hex = n.toString(16);
                return hex.length === 1 ? '0' + hex : hex;
            };

            // Convert each component and concatenate
            return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
        };



        return (
            <div className={`navbar ${scrolled ? "scrolled" : ""}`}>
                <div className="navbar-left">

                    <ul className={`link ${scrolled ? "move-up" : ""}`}>

                        {currentSketch === "flow" && (
                        <div>
                        <span>noise</span>{" "}
                        <input
                            type="number"
                            className="noise-input"
                            value={noiseRatio}
                            step="0.0001"
                            onChange={(e) => handleNoiseRatioChange(parseFloat(e.target.value))}
                        />
                        </div>
                        )}

                        <div>
                        <span>amount</span>{" "}
                        <input
                            type="number"
                            value={nb}
                            onChange={(e) => handleNbChange(e.target.value)}
                        />

                        <span>weight</span>{" "}
                        <input
                            type="number"
                            min="1"
                            max="10"
                            step="0.1"
                            value={strokeW}
                            onChange={(e) => handleStrokeWChange(parseFloat(e.target.value))}
                        />
                        </div>






                            {/*<div>*/}
                            {/*<span>amount</span>{" "}*/}
                            {/*<input*/}
                            {/*    type="number"*/}
                            {/*    value={nb}*/}
                            {/*    onChange={(e) => handleNbChange(e.target.value)}*/}
                            {/*/>*/}
                            {/*</div>*/}

                        {currentSketch === "star" && (
                            <div>
                                <div style={{ paddingTop: "1rem"}}>
                                    <span>LINE DIST</span> {" "}
                                    <input
                                        type="number"
                                        value={dMin}
                                        onChange={(e) => handleDMinChange(e.target.value)}
                                    />
                                    <div> <span>XMIN</span>{" "}
                                        <input
                                            type="number"
                                            value={xVel[0]}
                                            onChange={(e) => handleXVelChange(0, e.target.value)}
                                        />
                                        <span>XMAX</span>{" "}
                                        <input
                                            type="number"
                                            value={xVel[1]}
                                            onChange={(e) => handleXVelChange(1, e.target.value)}
                                        />
                                    </div>
                                    <div> <span>YMIN</span>{" "}
                                        <input
                                            type="number"
                                            value={yVel[0]}
                                            onChange={(e) => handleYVelChange(0, e.target.value)}
                                        />
                                        <span>YMAX</span>{" "}
                                        <input
                                            type="number"
                                            value={yVel[1]}
                                            onChange={(e) => handleYVelChange(1, e.target.value)}
                                        />

                                    </div>

                                </div>

                            </div>
                        )}
                        <div className="show-canvas-options-button">
                            <span onClick={toggleExpand}> {`${canvasOptionsExpanded ? "hide" : "show" } CANVAS OPTIONS`}</span>
                        </div>
                        <div className="save-sketch-button">
                            <span onClick={saveSketch}> SAVE SKETCH</span>
                        </div>
                        { sketchUrl ? <div className="sketch-url-display">
                                <span>{` url :${sketchUrl}`}</span>
                            </div> : null }


                        <MusicPlayer />

                         </ul>


                    {/*<input className="xvel-input1"*/}
                        {/*       type="number"*/}
                        {/*       value={xVel[0]}*/}
                        {/*       onChange={(e) => handleXVelChange([e.target.value, xVel[1]])}*/}
                        {/*/>*/}

                        {/*<input className="xvel-input"*/}
                        {/*       type="number"*/}
                        {/*       value={xVel[1]}*/}
                        {/*       onChange={(e) => handleXVelChange([xVel[0], e.target.value])}*/}
                        {/*/>*/}



                </div>
                <div className="navbar-center">
                    <img
                        src={logo2}
                        alt="Big Logo"
                        className={`logo big-logo ${scrolled ? "move-up" : ""}`}
                    />
                </div>

                <div className="navbar-right">
                    <ul className={`link down-link-right ${scrolled ? "move-up" : ""}`}>

                        {/*<input className="xvel-input1"*/}
                        {/*    type="number"*/}
                        {/*    value={xVel[0]}*/}
                        {/*    onChange={(e) => handleXVelChange([e.target.value, xVel[1]])}*/}
                        {/*    />*/}

                        {/*<input className="xvel-input"*/}
                        {/*    type="number"*/}
                        {/*    value={xVel[1]}*/}
                        {/*    onChange={(e) => handleXVelChange([xVel[0], e.target.value])}*/}
                        {/*    />*/}
                       <div>
                           {/*<span>amount</span>{" "}*/}
                           {/*<input*/}
                           {/*    type="number"*/}
                           {/*    value={nb}*/}
                           {/*    onChange={(e) => handleNbChange(e.target.value)}*/}
                           {/*/>*/}
                       {/* <div>*/}
                       {/*    <span>weight</span>{" "}*/}
                       {/*    <input*/}
                       {/*        type="number"*/}
                       {/*        min="1"*/}
                       {/*        max="10"*/}
                       {/*        step="0.1"*/}
                       {/*        value={strokeW}*/}
                       {/*        onChange={(e) => handleStrokeWChange(parseFloat(e.target.value))}*/}
                       {/*    />*/}
                       {/*</div>*/}

                               <div className="sketch-select-div">
            <span
                className={`sketch-select-span ${currentSketch === "flow" ? "selected" : ""}`}
                onClick={() => handleSketchChange("flow")}
            >
                noiseflow
            </span>

                                   <span
                                       className={`sketch-select-span ${currentSketch === "star" ? "selected" : ""}`}
                                       onClick={() => handleSketchChange("star")}
                                   >
                starchart
            </span>
                               </div>

                           </div>

                    </ul>
                </div>
            </div>
        );
    };

    export default Navbar;