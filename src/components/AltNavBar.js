    import React, { useState, useEffect } from "react";
    import "../css/AltNavBar.css";
    import logo1 from "../asset/logoSmall.png";
    import logo2 from "../asset/ph-riposte copy.png";
    import homeIcon from "../asset/home.svg";
    import layerIcon from "../3-layers.svg";

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
                        setCurrentSketch, currentSketch, dMin, handleDMinChange, handleSketchChange
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



        return (
            <div className={`navbar ${scrolled ? "scrolled" : ""}`}>
                <div className="navbar-left">
                    <ul href="#" className={`link ${scrolled ? "move-up" : ""}`}>

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


                       <div>
                        <span>  marginX X</span>{" "}
                        <input className="marginX-input"
                               type="number"
                               value={marginX}
                               onChange={(e) => handleMarginXChange(e.target.value)}
                        />


                        <span>marginX Y</span>{" "}
                        <input
                            type="number"
                            value={marginY}
                            onChange={(e) => handleMarginYChange(e.target.value)}
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
                                <div>
                                    <span>SPEED</span>
                                    <div> <span>XMIN</span>
                                        <input
                                            type="number"
                                            value={xVel[0]}
                                            onChange={(e) => handleXVelChange([e.target.value, xVel[1]])}
                                        />
                                        <span>XMAX</span>
                                        <input
                                            type="number"
                                            value={xVel[1]}
                                            onChange={(e) => handleXVelChange([xVel[0], e.target.value])}
                                        />
                                    </div>
                                    <div> <span>YMIN</span>
                                        <input
                                            type="number"
                                            value={yVel[0]}
                                            onChange={(e) => handleYVelChange([e.target.value, yVel[1]])}
                                        />
                                        <span>YMAX</span>
                                        <input
                                            type="number"
                                            value={yVel[1]}
                                            onChange={(e) => handleYVelChange([yVel[0], e.target.value])}
                                        />

                                    </div>

                                </div>
                                <span>MIN DISTANCE</span>
                                <input
                                    type="number"
                                    value={dMin}
                                    onChange={(e) => handleDMinChange(e.target.value)}
                                />
                            </div>
                        )}


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
                       <div> <span>CANVAS</span>{"       "}
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
                        <select
                            className="sketch-input"
                            value={currentSketch}
                            onChange={(e) => (handleSketchChange(e.target.value))}
                        >
                            <option value="star">starchart</option>
                            <option value="flow">noiseflow</option>
                        </select>

                        <input
                            type="color"
                            value={backgroundColor}
                            onChange={(e) => handleBackgroundColorChange(e.target.value)}
                        />
                            </div>
                    </ul>
                </div>
            </div>
        );
    };

    export default Navbar;