import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AudioPreloader({ audioIds }) {
    useEffect(() => {
        const preloadAudio = async () => {
            for (const audioUrl of audioUrls) {
                try {
                    // Fetch the audio file using Axios
                    const response = await axios.get(audioUrl, {
                        responseType: 'blob', // Ensure Axios treats the response as binary data
                    });

                    // Create an <audio> element and set preload="auto"
                    const audioElement = new Audio();
                    audioElement.src = URL.createObjectURL(new Blob([response.data]));
                    audioElement.preload = 'auto';

                    // Append the <audio> element to the document (it will preload in the background)
                    document.body.appendChild(audioElement);
                } catch (error) {
                    console.error('Axios error:', error);
                }
            }
        };

    // Call the preloadAudio function when the component mounts
    preloadAudio();
}, [audioUrls]);

return null; // This component doesn't render anything visible
  }

export default AudioPreloader;