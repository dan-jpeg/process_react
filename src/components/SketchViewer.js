import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "../css/psketch.css";
import ParticleSketch from "./ParticleSketch";

const SketchViewer = () => {
    const [sketch, setSketch] = useState(null);
    const [error, setError] = useState('');
    const { id } = useParams();

    useEffect(() => {
        fetch(`https://processbackend-production.up.railway.app/sketch/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setSketch(data))
            .catch(error => {
                console.error('Fetch error:', error);
                setError(error.message);
            });
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!sketch) {
        return <div>Loading...</div>;
    }

    return (
        <div>
           <span>allo</span>
            <ParticleSketch
                backgroundColor={sketch.backgroundColor}
                strokeColor={sketch.strokeColor}
                marginX={sketch.marginX}
                marginY={sketch.marginY}
                canvasHeight={sketch.canvasHeight}
                canvasWidth={sketch.canvasWidth}
                xVel={sketch.xVel}
                yVel={sketch.yVel}
                noiseRatio={sketch.noiseRatio}
                nb={sketch.nb}
                strokeW={sketch.strokeW}
                borderColor={sketch.borderColor}
                borderWidth={sketch.borderWidth}



            />
        </div>
    );
};

export default SketchViewer;
