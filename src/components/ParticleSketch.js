import {useEffect, useRef} from "react";
import p5 from "p5";
import "../css/psketch.css";


const ParticleSketch = ({
                            noiseRatio = 0.001,
                            nb = 250,
                            strokeW = 1.66,
                            marginX,
                            marginY,
                            backgroundColor,
                            strokeColor,
                            xVel, yVel, canvasHeight, canvasWidth,
                            borderColor, // Default border color: black
                            borderWidth,
                        }) => {

    const canvasRef = useRef(null);
    const isKeyHandled = useRef(false);

    useEffect(() => {
        const myp5 = new p5((p) => {
            let particles = Array(nb);


            class Particle {
                constructor(x, y) {
                    this.x = x;
                    this.y = y;
                    this.vx = p.random(p.int(xVel[0]), p.int(xVel[1]));
                    this.vy = p.random(p.int(yVel[0]), p.int(yVel[1]));
                    // this.vy = p.random(-0.5, 0.1);
                }

                draw() {
                    p.stroke(...strokeColor, p.map(p.frameCount, 1, 400, 255, 0));
                    let n = p.noise(noiseRatio * this.x, noiseRatio * this.y);
                    this.vx = p.cos(n * 360);
                    this.vy = p.sin(n * 360);

                    this.x += this.vx;
                    this.y += this.vy;

                    // Use the marginX and marginY props for boundary checks
                    if (
                        this.x < marginX ||
                        this.x > p.width - marginX ||
                        this.y < marginY ||
                        this.y > p.height - marginY
                    ) {
                        this.x = p.random(marginX, p.width - marginX);
                        this.y = p.random(marginY, p.height - marginY);
                    }

                    p.strokeWeight(strokeW);
                    p.point(this.x, this.y);
                }
            }

            p.setup = () => {
                canvasRef.current = p.createCanvas(canvasWidth, canvasHeight).parent(
                   "particle-sketch-container"
               )
                p.angleMode(p.DEGREES);
                p.background(...backgroundColor);
                particles = Array(nb);
                for (let i = 0; i < nb; i++) {
                    particles[i] = new Particle(
                        p.random(marginX, p.width - marginX),
                        p.random(marginY, p.height - marginY)
                    );
                }
                drawBorder(p);
            };

            const drawBorder = (p) => {
                p.push();
                p.stroke(...borderColor);
                p.strokeWeight(borderWidth);
                p.noFill();
                p.rect(0, 0, canvasWidth, canvasHeight);
                p.pop();
            }

            p.draw = () => {
                p.stroke(...strokeColor, p.map(p.frameCount, 1, 400, 255, 0));
                p.fill(...strokeColor);
                for (let particle of particles) {
                    particle.draw();
                }
            };

            // p.windowResized = () => {
            //     p.resizeCanvas(canvasWidth, canvasHeight);
            // };

            // p.keyPressed = () => {
            //     if (p.key === 'p') {
            //         p.save('process-export.png');
            //     }
            // }

            p.keyPressed = () => {
                if (p.key === 'p' && !isKeyHandled.current) {
                    const dataURL = canvasRef.current.elt.toDataURL('image/png');
                    const link = document.createElement('a');
                    link.download = 'process-export.png';
                    link.href = dataURL;
                    link.click();
                    isKeyHandled.current = true;
                }
            };

            p.keyReleased = () => {
                if (p.key === 'p') {
                    isKeyHandled.current = false;
                }
            }
        });

        return () => {
            myp5.remove();
        };
    }, [
             noiseRatio, nb, strokeW, marginX, marginY,
             backgroundColor, strokeColor, xVel, canvasHeight,
             canvasWidth, borderColor, borderWidth
             ]
    );

    return <div id="particle-sketch-container" />;
};

export default ParticleSketch;
