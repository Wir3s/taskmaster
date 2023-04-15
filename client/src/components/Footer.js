import React from 'react';

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const Footer = () => {
    return (
        <footer style={{
            width: "100%",
            backgroundColor: "transparent",
            position: "static",
            bottom: 0,
            display: 'flex',
            justifyContent: 'center'
        }}>
            <p style={{display: 'flex', flexFlow: 'row wrap', alignItems: 'center'}}>
                <AutoAwesomeIcon/><span style={{margin: "3vh"}}>Change The Filter 2023</span><AutoAwesomeIcon/>
            </p>
        </footer>
    )
};

export default Footer;