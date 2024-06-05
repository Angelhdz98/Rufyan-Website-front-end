import { Fragment } from "react/jsx-runtime";
import "../styles/styleBurguerMenu.css"
import classNames from 'classnames';
interface BurguerMenuProps{
    // onClick: () => void;
    activeMenu: boolean;
}

function BurguerMenu({ activeMenu}: BurguerMenuProps){
    
    return <Fragment >
    <span className={classNames('',{"activoBarraMenu1":activeMenu })} ></span>
    <span className={classNames('',{"activoBarraMenu2":activeMenu})}></span>
    <span className={classNames('',{"activoBarraMenu3":activeMenu})}></span>
    </Fragment>
}

export default BurguerMenu;
