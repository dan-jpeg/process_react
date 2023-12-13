import React, { useState, useEffect } from 'react';
import p5 from 'p5';

function StarSketch() {
    // const [nb, setNb] = useState(100);
    // const [dMin, setDMin] = useState(150);
    // const [particles, setParticles] = useState([]);
    // const [backgroundColor, setBackgroundColor] = useState([1, 1, 1]);
    // const [strokeColor, setStrokeColor] = useState([255, 255, 255]);
    // const velocityX = [-1, 0.05];
    // const velocityY = [-0.05, 0.1];
    const nb = 100;
    const dMin = 150;

    useEffect(() => {
        const sketch = (p) => {
            let particles = [];

            class Particle {
                constructor(x, y) {
                    this.size = p.random(2, 6);
                    this.x = x;
                    this.y = y;
                    this.vx = p.random(-1, 0.05);
                    this.vy = p.random(-0.05, 0.1);
                }

                draw() {
                    p.stroke(255);
                    this.x += this.vx;
                    this.y += this.vy;

                    if (this.x < 0 || this.x > p.width || this.y < 0 || this.y > p.height) {
                        this.x = p.random(0, p.width);
                        this.y = p.random(0, p.height);
                    }

                    p.circle(this.x, this.y, this.size);
                }
            }

            p.setup = () => {
                p.createCanvas(p.windowWidth, p.windowHeight);
                for (let i = 0; i < nb; i++) {
                    particles.push(new Particle(p.random(0, p.width), p.random(0, p.height)));
                }
            };

            p.draw = () => {
                p.background("#c4c7d3");
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
    }, []);

    return <div id="sketch-container" />;
}

export default StarSketch;