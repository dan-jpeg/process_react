import React, { useState, useEffect } from 'react';
import p5 from 'p5';

function StarSketch( {currentsketch, backgroundColor, dMin, nb, marginX, marginY, yVel, xVel}) {


    // const [particles, setParticles] = useState([]);

    // const [strokeColor, setStrokeColor] = useState([255, 255, 255]);
    // const velocityX = [-1, 0.05];
    // const velocityY = [-0.05, 0.1];
    // const nb = 100;
    // const dMin = 150;


    useEffect(() => {
        const sketch = (p) => {
            let particles = [];

            class Particle {
                constructor(x, y) {
                    this.size = p.random(2, 6);
                    this.x = x;
                    this.y = y;
                    this.vx = p.random(xVel[0], xVel[1]);
                    this.vy = p.random(yVel[0], yVel[1]);
                }

                draw() {
                    p.stroke(255);
                    this.x += this.vx;
                    this.y += this.vy;

                    if (this.x < marginX  || this.x > p.width-marginX || this.y < marginY || this.y > p.height-marginY) {
                        this.x = p.random(0, p.width);
                        this.y = p.random(0, p.height);
                    }

                    p.circle(this.x, this.y, this.size);
                }
            }

            p.setup = () => {
                p.createCanvas((p.windowWidth), (p.windowHeight*0.9)).parent(
                    "star-sketch-container");
                for (let i = 0; i < nb; i++) {
                    particles.push(new Particle(p.random(0, p.width), p.random(0, p.height)));
                }
            };

            p.draw = () => {
                p.background(backgroundColor);
                p.noStroke();
                p.fill(255);

                particles.forEach(particle => {
                    particle.draw();
                });

                for (let i = 0; i < nb; i++) {
                    let pi = particles[i];
                    for (let j = i + 1; j < nb; j++) {
                        let pj = particles[j];
                        let d = p.dist(pi.x, pi.y, pj.x, pj.y);
                        if (d < dMin) {
                            p.line(pi.x, pi.y, pj.x, pj.y);
                        }
                    }
                }
            };
        };

        let myp5 = new p5(sketch);

        return () => {
            myp5.remove();
        };
    }, [currentsketch, backgroundColor, dMin, nb, marginX, marginY, xVel, yVel]);

    return <div id="star-sketch-container" />;
}

export default StarSketch;