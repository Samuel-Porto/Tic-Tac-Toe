import classes from "./TicTacToe.module.css";

import cross_icon from "./img/cross_icon.svg";
import circle_icon from "./img/circle_icon.svg";
import { useRef, useState } from "react";

let spacesUsed = [];
let pieceToStart = "x";
let piece = "x";

function TicTacToe() {
    const titleRef = useRef();
    let turn = 1

    const [crossScore, setCrossScore] = useState(0);
    const [circleScore, setCircleScore] = useState(0);

    const [stopGame, setStopGame] = useState(false);
    const [game, setGame] = useState([
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]);

    function selectSpace(e, x, y) {
        if (pieceToStart === "x") piece = turn % 2 === 0 ? 'o' : 'x';
        if (pieceToStart === "o") piece = turn % 2 === 0 ? 'x' : 'o';

        if (game[y][x] === null && !stopGame) {

            let currentGame = game;
            currentGame[y][x] = piece

            setGame(currentGame);
            let currentImg = piece === "x" ? cross_icon : circle_icon;
            let pieceClass = piece === "x" ? classes.cross_space : classes.circle_space;
            let nextPiece = piece === 'x' ? 'o' : 'x';
            e.target.innerHTML = `<img src="${currentImg}" alt=${piece} />`;
            e.target.className = `${classes.space}  ${pieceClass}`;
            spacesUsed.push(e.target);
            titleRef.current.innerHTML = `${nextPiece.toUpperCase()} turn`;
            
            let result = checkIfWin();
            if (result === true) {
                win(piece);
            } else if (result === "draw") {
                draw();
            }

            turn++;
        }
    }

    function checkIfWin() {
        let win = false;
        let columns = [
            [game[0][0], game[1][0], game[2][0]], 
            [game[0][1], game[1][1], game[2][1]], 
            [game[0][2], game[1][2], game[2][2]]
        ];

        game.forEach(row => {
            if(row[0] === row[1] && row[1] === row[2] && row[0] !== null) {
                win = true;
            }
        });
        columns.forEach(column => {
            if(column[0] === column[1] && column[1] === column[2] && column[0] !== null) {
                win = true;
            }
        })
        if(game[0][0] === game[1][1] && game[1][1] === game[2][2] && game[0][0] !== null) {
            win = true;
        }
        if(game[2][0] === game[1][1] && game[1][1] === game[0][2] && game[2][0] !== null) {
            win = true;
        }

        if(turn >= 9 && !win) {
            win = "draw";
        }
        return win;
    }

    function win(piece) {
        let pieceName = piece === "x" ? "cross" : "circle";
        titleRef.current.innerHTML = `${pieceName} win!`;
        if (piece === "x") {
            setCrossScore(crossScore + 1);
            document.body.classList.add("green_theme");
        }
        if (piece === "o") {
            setCircleScore(circleScore + 1);
            document.body.classList.add("blue_theme");
        }
        console.log(pieceName)
        setStopGame(true);
    }

    function draw() {
        titleRef.current.innerHTML = "Draw!";
        document.body.classList.add("draw_theme")
        setStopGame(true);
    }

    function resetGame() {
        setGame([
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ]);
        setStopGame(false);
        spacesUsed.forEach(space => {
            space.innerHTML = "";
            space.className = classes.space;
        });
        let bodyThemes = document.body.classList;
        bodyThemes.forEach(theme => bodyThemes.remove(theme));
        
        pieceToStart = pieceToStart === 'x' ? 'o' : 'x';
        titleRef.current.innerHTML = `${pieceToStart.toUpperCase()} starts!`;
    }

    function resetScore() {
        setCircleScore(0);
        setCrossScore(0);
    }

    return ( <section className={classes.tictactoe}>
        <h2 ref={titleRef}></h2>
        <div className={classes.game}>
            <div className={classes.row}>
                <div onClick={(e) => {selectSpace(e, 0, 0)}} className={classes.space}></div>
                <div onClick={(e) => {selectSpace(e, 1, 0)}} className={classes.space}></div>
                <div onClick={(e) => {selectSpace(e, 2, 0)}} className={classes.space}></div>
            </div>
            <div className={classes.row}>
                <div onClick={(e) => {selectSpace(e, 0, 1)}} className={classes.space}></div>
                <div onClick={(e) => {selectSpace(e, 1, 1)}} className={classes.space}></div>
                <div onClick={(e) => {selectSpace(e, 2, 1)}} className={classes.space}></div>
            </div>
            <div className={classes.row}>
                <div onClick={(e) => {selectSpace(e, 0, 2)}} className={classes.space}></div>
                <div onClick={(e) => {selectSpace(e, 1, 2)}} className={classes.space}></div>
                <div onClick={(e) => {selectSpace(e, 2, 2)}} className={classes.space}></div>
            </div>
        </div>
        <div>
            <button className={classes.reset_game} onClick={() => {resetGame()}}>reset</button>
            <button className={classes.reset_score} onClick={() => {resetScore()}}>Reset Score</button>
        </div>
        <div className={classes.score}>
            <span className={classes.cross_score} >{crossScore}</span>
            <span className={classes.circle_score} >{circleScore}</span>
        </div>
    </section> );
}

export default TicTacToe;