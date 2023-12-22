import classes from "./Menu.module.css";
import ticTacToe from "./img/tic-tac-toe.svg";
import bigEatSmall from './img/big-eat-small.svg';
import { Link } from "react-router-dom";

function Menu() {
    return ( <section className={classes.menu}>
        <div>
            <Link to="/ticTacToe"><img src={ticTacToe} alt=""/></Link>
        </div>
        <div>
            <Link to="/bigEatSmall"><img src={bigEatSmall} alt="" /></Link>
        </div>
    </section> );
}

export default Menu;