import React from 'react';




function Header({ userStoraged, setUserStoraged, openDialogLogIn, openDialogSignUp }) {

    const clickHandlerButton = () => {
        setUserStoraged("");
    }

    return (
        <nav className="nav-bar">
            {!userStoraged?
                <div>
                    <ul className="nav-box guest-users">
                        <li><button type="button" onClick={openDialogLogIn}>Log In</button></li>
                        <li><button type="button" onClick={openDialogSignUp}>Sign Up</button></li>
                    </ul>
                </div>
                :
                <div className="nav-box user-logged">
                    <p><b>¡Hola {userStoraged.name.charAt(0).toUpperCase() + userStoraged.name.slice(1)}!</b></p>
                    <p><button type="button" onClick={clickHandlerButton}>Log Out</button></p>
                </div>
            }
        </nav>
    )
}

export default Header