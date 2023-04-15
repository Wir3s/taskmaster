import React from 'react';

import { BottomNavigation } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const Footer = () => {
    return (
        // <footer style={{
        //     position: 'sticky',
        //     textAlign: 'center'
        // }}>
        //     <h3>Lovely footer designed by all of us here at TaskMaster ♥</h3>
        // </footer>
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