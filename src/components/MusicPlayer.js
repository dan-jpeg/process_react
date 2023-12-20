import React, { useState, useRef } from 'react';
import '../css/MusicPlayer.css';
import audioFile from './tranquility.mp3'


    const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(new Audio(audioFile));

    const togglePlayPause = () => {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if (!prevValue) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    };

    return (
        <div className="music-player">
            <button onClick={togglePlayPause}>
                {isPlaying ? 'Pause' : 'Play'}
            </button>
        </div>
    );
};

export default MusicPlayer;
