import React, { useEffect } from 'react';

export default function RoscoPasapalabra({ setLetter, letterValue, className = '', ...props }) {
    useEffect(() => {
        const letters = document.querySelectorAll(".letter");
        letters.forEach((letter, i) => {
            let element = document.getElementById(letter.innerHTML.toLocaleLowerCase());
            let verticalMovement = 15 * Math.sin(13.33 * (Math.PI / 180) * i - (Math.PI / 2)) + 20;
            let horizontalMovement = 15 * Math.cos(13.33 * (Math.PI / 180) * i - (Math.PI / 2)) + 20;
            element.style.top = verticalMovement + "em";
            element.style.left = horizontalMovement + "em";
        });
    }, [letterValue]);

    return (
        <div>
            {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'].map(letter => (
                <span key={letter} className="letter" onClick={() => setLetter(letter)} id={letter}>{letter.toUpperCase()}</span>
            ))}
        </div>
    );
}