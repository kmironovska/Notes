import React from 'react';


const Header = props => (

    <header className="header row">
        <a className="header-logo col" onClick={() => window.location.href = '/'}>Seavus Notes</a>
    </header>
);


export default Header;