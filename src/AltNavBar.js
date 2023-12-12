    import React, { useState, useEffect } from "react";
    import "./AltNavBar.css";
    import logo1 from "./logoSmall.png";
    import logo2 from "./ph-riposte copy.png";
    import homeIcon from "./home.svg";
    import layerIcon from "./3-layers.svg";

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
                        xVel, yVel, handleXVelChange, handleYVelChange
                    }) => {
        const [scrolled, setScrolled] = useState(false);

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
                        <span>noise</span>
                        <input
                            type="number"
                            value={noiseRatio}
                            onChange={(e) => handleNoiseRatioChange(parseFloat(e.target.value))}
                        />
                        <span>amount</span>
                        <input
                            type="number"
                            value={nb}
                            onChange={(e) => handleNbChange(e.target.value)}
                        />
                        <span>weight</span>
                        <input
                            type="number"
                            min="1"
                            max="10"
                            step="0.1"
                            value={strokeW}
                            onChange={(e) => handleStrokeWChange(parseFloat(e.target.value))}
                        />

                        <input
                            type="color"
                            value={backgroundColor}
                            onChange={(e) => handleBackgroundColorChange(e.target.value)}
                        />
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
                        <span>  xVel </span>{" "}

                        <input
                            type="number"
                            value={xVel[0]}
                            onChange={(e) => handleXVelChange([e.target.value, xVel[1]])}
                            />

                        <input
                            type="number"
                            value={xVel[1]}
                            onChange={(e) => handleXVelChange([xVel[0], e.target.value])}
                            />

                        <span>  MARGIN ></span>{" "}
                        <input
                            type="number"
                            value={margin}
                            onChange={(e) => handleMarginChange(e.target.value)}
                        />
                        <span>MARGIN ^</span>{" "}
                        <input
                            type="number"
                            value={topBotMargin}
                            onChange={(e) => handleTopBotMarginChange(e.target.value)}
                        />
                    </ul>
                </div>
            </div>
        );
    };

    export default Navbar;