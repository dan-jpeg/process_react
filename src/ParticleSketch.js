import { useEffect } from "react";
import p5 from "p5";
import "./psketch.css";

const ParticleSketch = ({
                            noiseRatio = 0.001,
                            nb = 250,
                            strokeW = 1.66,
                            margin = 100,
                            topBotMargin = 100,
                            backgroundColor = [240, 235, 235],
                            strokeColor = [1, 1, 1],
                            xVel, yVel
                        }) => {
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

                    // Use the margin and topBotMargin props for boundary checks
                    if (
                        this.x < margin ||
                        this.x > p.width - margin ||
                        this.y < topBotMargin ||
                        this.y > p.height - topBotMargin
                    ) {
                        this.x = p.random(margin, p.width - margin);
                        this.y = p.random(topBotMargin, p.height - topBotMargin);
                    }

                    p.strokeWeight(strokeW);
                    p.point(this.x, this.y);
                }
            }

            p.setup = () => {
                p.createCanvas(p.windowWidth * 0.9, p.windowHeight * 0.6).parent(
                    "sketch-container"
                );
                p.angleMode(p.DEGREES);
                p.background(...backgroundColor);
                particles = Array(nb);
                for (let i = 0; i < nb; i++) {
                    particles[i] = new Particle(
                        p.random(margin, p.width - margin),
                        p.random(topBotMargin, p.height - topBotMargin)
                    );
                }
            };

            p.draw = () => {
                p.stroke(...strokeColor, p.map(p.frameCount, 1, 400, 255, 0));
                p.fill(...strokeColor);
                for (let particle of particles) {
                    particle.draw();
                }
            };
        });

        return () => {
            myp5.remove();
        };
    }, [noiseRatio, nb, strokeW, margin, topBotMargin, backgroundColor, strokeColor]);

    return <div id="sketch-container" />;
};

export default ParticleSketch;
