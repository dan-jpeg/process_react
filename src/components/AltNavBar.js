    import React, { useState, useEffect } from "react";
    import "../css/AltNavBar.css";
    import logo1 from "../asset/logoSmall.png";
    import logo2 from "../asset/ph-riposte copy.png";
    import homeIcon from "../asset/home.svg";
    import layerIcon from "../3-layers.svg";

    const Navbar = ({
                        noiseRatio,
                        margin,
                        topBotMargin,
                        nb,
                        strokeW,
                        strokeColor,
                        backgroundColor,
                        handleBackgroundColorChange,
                        handleNbChange,
                        handleMarginChange,
                        handleTopBotMarginChange,
                        handleNoiseRatioChange,
                        handleStrokeColorChange,
                        handleStrokeWChange,
                        xVel, yVel, handleXVelChange, handleYVelChange,
                        setCurrentSketch, currentSketch
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
                        <div>

                        <span>noise</span>{" "}
                        <input
                            type="number"
                            value={noiseRatio}
                            step="0.0001"
                            onChange={(e) => handleNoiseRatioChange(parseFloat(e.target.value))}
                        />
                        </div>
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
                        <span>  MARGIN X</span>{" "}
                        <input className="margin-input"
                               type="number"
                               value={margin}
                               onChange={(e) => handleMarginChange(e.target.value)}
                        />


                        <span>MARGIN Y</span>{" "}
                        <input
                            type="number"
                            value={topBotMargin}
                            onChange={(e) => handleTopBotMarginChange(e.target.value)}
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


                            {/*<div>*/}
                            {/*    <span>SPEED</span>*/}
                            {/*    <div> <span>XMIN</span> */}
                            {/*        <input*/}
                            {/*            type="number"*/}
                            {/*            value={xVel[0]}*/}
                            {/*            onChange={(e) => handleXVelChange([e.target.value, xVel[1]])}*/}
                            {/*        />*/}
                            {/*        <span>XMAX</span>*/}
                            {/*        <input*/}
                            {/*            type="number"*/}
                            {/*            value={xVel[1]}*/}
                            {/*            onChange={(e) => handleXVelChange([xVel[0], e.target.value])}*/}
                            {/*        />*/}
                            {/*    </div>*/}
                            {/*    <div> <span>YMIN</span> */}
                            {/*        <input*/}
                            {/*            type="number"*/}
                            {/*            value={yVel[0]}*/}
                            {/*            onChange={(e) => handleYVelChange([e.target.value, yVel[1]])}*/}
                            {/*        />*/}
                            {/*        <span>YMAX</span>*/}
                            {/*        <input*/}
                            {/*            type="number"*/}
                            {/*            value={yVel[1]}*/}
                            {/*            onChange={(e) => handleYVelChange([yVel[0], e.target.value])}*/}
                            {/*        />*/}
                            {/*    */}
                            {/*    </div>*/}
                            {/*</div>*/}

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


                    </ul>
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
                        <span>CANVAS</span>{"       "}
                        {/*<select*/}
                        {/*    className="sketch-input"*/}
                        {/*    value={currentSketch}*/}
                        {/*    onChange={(e) => setCurrentSketch(e.target.value)}*/}
                        {/*>*/}
                        {/*    <option value="star">starchart</option>*/}
                        {/*    <option value="flow">noiseflow</option>*/}
                        {/*</select>*/}
                        <input
                            type="color"
                            value={backgroundColor}
                            onChange={(e) => handleBackgroundColorChange(e.target.value)}
                        />
                    </ul>
                </div>
            </div>
        );
    };

    export default Navbar;