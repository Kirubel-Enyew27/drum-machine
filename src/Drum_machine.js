import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const Drum_machine = () => {
  const [isOn, setIsOn] = useState(true);
  const [volume, setVolume] = useState(1);

  const handleClick = (id) => {
    const buttonElement = document.getElementById(id);
    buttonElement.volume = volume;
    isOn ? buttonElement.play() : buttonElement.pause();
  };

  const handleSwitchButton = () => {
    setIsOn((prevIsOn) => !prevIsOn);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      // Map key presses to corresponding button IDs
      const keyMap = {
        Q: 'Q',
        W: 'W',
        E: 'E',
        A: 'A',
        S: 'S',
        D: 'D',
        Z: 'Z',
        X: 'X',
        C: 'C',
      };

      // Check if the pressed key is mapped to a button ID
      if (keyMap.hasOwnProperty(event.key)) {
        const audioElement = document.getElementById(keyMap[event.key]);

        if (audioElement) {
          if (isOn) {
            audioElement.currentTime = 0; // Reset the audio to the beginning
            audioElement.volume = volume;
            audioElement.play();
          } else {
            audioElement.pause();
            audioElement.currentTime = 0; // Reset the audio to the beginning
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    // Clean up event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isOn, volume]);

  return (
    <div id="drum-machine" className="container d-flex flex-column align-items-center justify-content-center">
      <div id="display" className="d-flex flex-wrap justify-content-center">
        <button className="drum-pad" onClick={() => handleClick('Q')}>
          Q
          <audio className="clip" id="Q">
            <source src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" />
          </audio>
        </button>

        <button className="drum-pad" onClick={() => handleClick('W')}>
          W
          <audio className="clip" id="W">
            <source src="https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" />
          </audio>
        </button>

        <button className="drum-pad" onClick={() => handleClick('E')}>
          E
          <audio className="clip" id="E">
            <source src="https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" />
          </audio>
        </button>

        <button className="drum-pad" onClick={() => handleClick('A')}>
          A
          <audio className="clip" id="A">
            <source src="https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" />
          </audio>
        </button>

        <button className="drum-pad" onClick={() => handleClick('S')}>
          S
          <audio className="clip" id="S">
            <source src="https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" />
          </audio>
        </button>

        <button className="drum-pad" onClick={() => handleClick('D')}>
          D
          <audio className="clip" id="D">
            <source src="https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" />
          </audio>
        </button>

        <button className="drum-pad" onClick={() => handleClick('Z')}>
          Z
          <audio className="clip" id="Z">
            <source src="https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" />
          </audio>
        </button>

        <button className="drum-pad" onClick={() => handleClick('X')}>
          X
          <audio className="clip" id="X">
            <source src="https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" />
          </audio>
        </button>

        <button className="drum-pad" onClick={() => handleClick('C')}>
          C
          <audio className="clip" id="C">
            <source src="https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" />
          </audio>
        </button>
      </div>

      <div className='switch'>
        <button style={{
          padding: '0 0.5rem',
          background: isOn ? 'linear-gradient(to right, green 45%, transparent 0%)' : 'linear-gradient(to left, red 50%, transparent 0%)',
          border: '1px solid #fff',
          borderRadius: '5px',
          color: 'white',
        }} onClick={handleSwitchButton}>
          ON|OFF
        </button>
      </div>

      <div style={{ margin: '2rem' }}>
        <div>
            <label htmlFor="volume" style={{ padding: '0.5rem', margin: '0.5rem', border: '1px solid white', backgroundColor: 'gray' }}>
            Volume: {Math.round(volume * 100)}
            </label>
        </div>
        <input
          type="range"
          id="volume"
          name="volume"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
};

export default Drum_machine;
