import React, { useEffect } from 'react';
import p5 from 'p5';

const Sketch = () => {
    useEffect(() => {
        new p5(p5Instance => {
            p5Instance.setup = () => {
                p5Instance.createCanvas(700, 400);
            };

            p5Instance.draw = () => {
                p5Instance.background(200);
                p5Instance.ellipse(p5Instance.width / 2, p5Instance.height / 2, 50, 50);
            };
        });
    }, []);

    return <div />;
};


export default Sketch;
