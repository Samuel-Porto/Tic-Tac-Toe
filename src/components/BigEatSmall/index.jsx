import { useRef, useState } from "react";
import classes from "./BigEatSmall.module.css";

import green_piece_small from "./img/green_piece_small.svg";
import green_piece_medium from "./img/green_piece_medium.svg";
import green_piece_big from "./img/green_piece_big.svg";
import blue_piece_small from "./img/blue_piece_small.svg";
import blue_piece_medium from "./img/blue_piece_medium.svg";
import blue_piece_big from "./img/blue_piece_big.svg";

const orderOfSize = ['small', 'medium', 'big'];

let turn = 'green';
let pieceToStart = 'green';

let spacesUsed = [];

function BigEatSmall() {
    const [greenPieces, setGreenPieces] = useState(['small', 'small', 'small', 'medium', 'medium', 'medium', 'big', 'big', 'big']);
    const [bluePieces, setBluePieces] = useState(['small', 'small', 'small', 'medium', 'medium', 'medium', 'big', 'big', 'big']);
    const [pieceChoice, setPieceChoice] = useState('small');
    const [stopGame, setStopGame] = useState(false);
    const [game, setGame] = useState([
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]);
    const [round, setRound] = useState(1);

    const pieceSmall = useRef();
    const pieceMedium = useRef();
    const pieceBig = useRef();

    function hasPiece(piece) {
        let response = false;
        if (turn === 'green' && greenPieces.find(element => element === piece) !== undefined) {
            response = true;
        }
        if (turn === 'blue' && bluePieces.find(element => element === piece) !== undefined) {
            response = true;
        }
        return response;
    }

    function getPieceImg(color, size) {
        let piece;

        if (color === "green") {
            switch(size) {
                case "small":
                    piece = green_piece_small;
                    break;
                case "medium":
                    piece = green_piece_medium;
                    break;
                case "big":
                    piece = green_piece_big;
                    break;
            }
        }
        if (color === "blue") {
            switch(size) {
                case "small":
                    piece = blue_piece_small;
                    break;
                case "medium":
                    piece = blue_piece_medium;
                    break;
                case "big":
                    piece = blue_piece_big;
                    break;
            }
        }

        return piece;
    }

    function checkSpace(e, x, y) {
        let currentGame = game;
        let spacePiece = currentGame[y][x];
        if (checkIfMovementIsValid(spacePiece) && hasPiece(pieceChoice) && !stopGame) {
            currentGame[y][x] = [turn, pieceChoice];

            e = e.target;

            if (e.nodeName === "IMG") e = e.parentNode;

            e.innerHTML = `<img src="${getPieceImg(turn, pieceChoice)}" alt="" />`;
            e.style.background = turn === 'green' ? "#4c9e6f" : "#427D9D";

            let newPieceList;

            if (turn === 'green') setGreenPieces((prev) => {
                newPieceList = greenPieces;
                newPieceList.splice(newPieceList.indexOf(pieceChoice), 1);
                return newPieceList;
            });

            if (turn === 'blue') setBluePieces((prev) => {
                newPieceList = bluePieces;
                newPieceList.splice(newPieceList.indexOf(pieceChoice), 1);
                return newPieceList;
            });

            setGame(currentGame);
            spacesUsed.push(e);
            
            checkIfWin() ? win() : setRound(round + 1);
            
            turn = turn === 'green' ? 'blue' : 'green';
        }
    }

    function checkIfMovementIsValid(spacePiece) {
        let response = false;
        if (spacePiece === null || orderOfSize.indexOf(spacePiece[1]) < orderOfSize.indexOf(pieceChoice)) response = true;
        return response;
    }

    function checkIfWin() {
        let win = false;
        let columns = [
            [game[0][0], game[1][0], game[2][0]], 
            [game[0][1], game[1][1], game[2][1]], 
            [game[0][2], game[1][2], game[2][2]]
        ];

        let diagonals = [
            [game[0][0], game[1][1], game[2][2]],
            [game[2][0], game[1][1], game[0][2]]
        ];

        game.forEach(row => {
            if (row.find(e => e === null) === undefined) {
                if (row[0][0] === row[1][0] && row[1][0] === row[2][0]) win = true;
            }
        });
        columns.forEach(column => {
            if (column.find(e => e === null) === undefined) {
                if (column[0][0] === column[1][0] && column[1][0] === column[2][0]) win = true;
            }
        })

        diagonals.forEach(diagonal => {
            if (diagonal.find(e => e === null) === undefined) {
                if (diagonal[0][0] === diagonal[1][0] && diagonal[1][0] === diagonal[2][0]) win = true;
            }
        })

        return win;
    }

    function win() {
        setStopGame(true);
        document.body.classList.add(turn === 'green' ? 'green_theme' : 'blue_theme');
    }

    function resetGame() {
        setGame([
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ]);

        setGreenPieces(['small', 'small', 'small', 'medium', 'medium', 'medium', 'big', 'big', 'big']);
        setBluePieces(['small', 'small', 'small', 'medium', 'medium', 'medium', 'big', 'big', 'big']);
        
        spacesUsed.forEach(space => {
            space.style.background = '';
            space.innerHTML = '';
        });
        spacesUsed = [];

        pieceToStart = pieceToStart === 'green' ? 'blue' : 'green';
        turn = pieceToStart;

        setStopGame(false);

        document.body.classList.forEach(theme => document.body.classList.remove(theme));
    }

    return ( <section className={classes.BigEatSmall}>
        <ul className={classes.piece_choice}>
            <li><button className={pieceChoice === 'small' ? `${classes.piece_selected} ${classes.piece_button}` : classes.piece_button} onClick={() => setPieceChoice('small')} ref={pieceSmall}>Small</button></li>
            <li><button className={pieceChoice === 'medium' ? `${classes.piece_selected} ${classes.piece_button}` : classes.piece_button} onClick={() => setPieceChoice('medium')} ref={pieceMedium}>Medium</button></li>
            <li><button className={pieceChoice === 'big' ? `${classes.piece_selected} ${classes.piece_button}` : classes.piece_button} onClick={() => setPieceChoice('big')} ref={pieceBig}>Big</button></li>
        </ul>
        <div className={classes.game}>
            <ul className={turn === 'green' ? `${classes.pieces_list} ${classes.his_turn}` : classes.pieces_list}>
                {greenPieces.map(piece => <li><img src={getPieceImg('green', piece)} alt="" /></li>)}
            </ul>
            <div className={classes.grid}>
                <div className={classes.row}>
                    <div className={classes.space} onClick={(e) => checkSpace(e, 0, 0)} ></div>
                    <div className={classes.space} onClick={(e) => checkSpace(e, 1, 0)} ></div>
                    <div className={classes.space} onClick={(e) => checkSpace(e, 2, 0)} ></div>
                </div>
                <div className={classes.row}>
                    <div className={classes.space} onClick={(e) => checkSpace(e, 0, 1)} ></div>
                    <div className={classes.space} onClick={(e) => checkSpace(e, 1, 1)} ></div>
                    <div className={classes.space} onClick={(e) => checkSpace(e, 2, 1)} ></div>
                </div>
                <div className={classes.row}>
                    <div className={classes.space} onClick={(e) => checkSpace(e, 0, 2)} ></div>
                    <div className={classes.space} onClick={(e) => checkSpace(e, 1, 2)} ></div>
                    <div className={classes.space} onClick={(e) => checkSpace(e, 2, 2)} ></div>
                </div>
            </div>
            <ul className={turn === 'blue' ? `${classes.pieces_list} ${classes.his_turn}` : classes.pieces_list}>
                {bluePieces.map(piece => <li><img src={getPieceImg('blue', piece)} alt="" /></li>)}
            </ul>
        </div>
        <button className='reset_button' onClick={() => resetGame()}>reset</button>
    </section> );
}

export default BigEatSmall;