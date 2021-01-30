import React, { useContext } from 'react'
import ThemeContext from '../context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faToggleOn, faToggleOff} from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    const {darkMode, setDarkMode} = useContext(ThemeContext);
 
    const handleClick = () => {
        setDarkMode(!darkMode);
    }

    return (
        <div className="header">
            <h1>ReactHooks</h1>
            <p className="darkmode">
                <span>DarkMode</span>
                <FontAwesomeIcon 
                    cursor="pointer"
                    className="toggle" 
                    icon={darkMode ? faToggleOn :faToggleOff}  
                    onClick={handleClick}
                />
            </p>
        </div>
    )
}

export default Header;