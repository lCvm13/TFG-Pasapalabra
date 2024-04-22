import { useEffect } from "react"


export default function Pasapalabra({setLetter,letterValue, className = '', ...props  }) {
    useEffect(()=>{
    const letters = document.getElementsByClassName("letter")
       for(let i=0;i<letters.length;i++){
        let letter = document.getElementById(letters[i].innerHTML.toLocaleLowerCase());
        let verticalMovement= 15*Math.sin(13.33*(Math.PI / 180)*i-((Math.PI)/2)) + 20;
        let horitzontalMovement = 15*Math.cos(13.33*(Math.PI / 180)*i-((Math.PI)/2)) + 20;
        letter.style.top = verticalMovement + "em";
        letter.style.left = horitzontalMovement + "em";
       }
    })
    return (
        <div>
            <span className="letter" onClick={()=>setLetter("a")} id="a" >A</span>
            <span className="letter" onClick={()=>setLetter("b")} id="b" >B</span>
            <span className="letter" onClick={()=>setLetter("c")} id="c">C</span>
            <span className="letter" onClick={()=>setLetter("d")} id="d">D</span>
            <span className="letter" onClick={()=>setLetter("e")} id="e">E</span>
            <span className="letter" onClick={()=>setLetter("f")} id="f">F</span>
            <span className="letter" onClick={()=>setLetter("g")} id="g">G</span>
            <span className="letter" onClick={()=>setLetter("h")} id="h">H</span>
            <span className="letter" onClick={()=>setLetter("i")} id="i">I</span>
            <span className="letter" onClick={()=>setLetter("j")} id="j">J</span>
            <span className="letter" onClick={()=>setLetter("k")} id="k">K</span>
            <span className="letter" onClick={()=>setLetter("l")} id="l">L</span>
            <span className="letter" onClick={()=>setLetter("m")} id="m">M</span>
            <span className="letter" onClick={()=>setLetter("n")} id="n">N</span>
            <span className="letter" onClick={()=>setLetter("ñ")} id="ñ">Ñ</span>
            <span className="letter" onClick={()=>setLetter("o")} id="o">O</span>
            <span className="letter" onClick={()=>setLetter("p")} id="p">P</span>
            <span className="letter" onClick={()=>setLetter("q")} id="q">Q</span>
            <span className="letter" onClick={()=>setLetter("r")} id="r">R</span>
            <span className="letter" onClick={()=>setLetter("s")} id="s">S</span>
            <span className="letter" onClick={()=>setLetter("t")} id="t">T</span>
            <span className="letter" onClick={()=>setLetter("u")} id="u">U</span>
            <span className="letter" onClick={()=>setLetter("v")} id="v">V</span>
            <span className="letter" onClick={()=>setLetter("w")} id="w">W</span>
            <span className="letter" onClick={()=>setLetter("x")} id="x">X</span>
            <span className="letter" onClick={()=>setLetter("y")} id="y">Y</span>
            <span className="letter" onClick={()=>setLetter("z")} id="z">Z</span>
        </div>)


}
