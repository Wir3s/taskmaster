import React from 'react';
import GitHubIcon  from '@mui/icons-material/GitHub';

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
            <p style={{
                display: 'flex',
                flexFlow: 'row wrap',
                alignItems: 'center',
            }}>
                <span style={{
                    margin: '1vh',
                }}>
                    © Change The Filter 2023
                </span>
                <a href="https://github.com/Wir3s/taskmaster"
                    style={{
                        margin: '1vh',
                    }}><GitHubIcon/>
                </a>
            </p>
        </footer>
    )
};

export default Footer;