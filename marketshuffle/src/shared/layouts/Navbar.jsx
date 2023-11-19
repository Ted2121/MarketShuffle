import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Logo from '../../assets/icons/Logo.png'
import { useNavigate, useLocation, Link } from 'react-router-dom';
import navData from '../../data/components-text/navData';
import { styled } from '@mui/system';

function Navbar(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const [items, setItems] = useState([]);
    const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);

    const [scrolling, setScrolling] = useState(false);
    const navbarClass = scrolling ? 'navbar-hidden' : '';

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleScroll = () => {
                if (window.scrollY > 50) {
                    setScrolling(true);
                } else {
                    setScrolling(false);
                }
            };

            window.addEventListener('scroll', handleScroll);

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, []);

    useEffect(() => {
        setItems(navData);
    }, []);

    const logo = (
        <Link to='/' style={{ textDecoration: 'none' }}>
            <picture style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                    src={Logo}
                    alt='quizbytes'
                    style={{ height: '100%', objectFit: 'contain', width: '120px' }}
                />
            </picture>
        </Link>
    );

    const onReadClick = () => {
        toggleSubscribeModal();
    }

    return (
        <Box sx={{ display: 'flex', position: 'fixed' }}>
            <AppBar
                component='nav'
                elevation={0}
                className={`navbar ${navbarClass}`}
                sx={{
                    backgroundColor: 'transparent',
                    pt: { md: '5px', lg: '10px' },
                    pl: { md: '0', lg: '10px' },
                }}
            >
                <Toolbar
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                    variant='regular'
                >
                    <Box
                        sx={{ display: 'flex' }}
                    >
                        <Box>
                            {logo}
                        </Box>
                        <Box>
                            {items.map((item) => (
                                <Link key={item.id} to={item.route} style={{ textDecoration: 'none' }}>
                                    <Button
                                        variant='text'
                                        key={item.id}
                                        onClick={item.text === 'Read' ? onReadClick : () => { }}
                                        sx={{
                                            color: 'black.main',
                                            fontSize: { md: 'small', lg: 'medium' },
                                            fontWeight: '400',
                                            size: 'medium',
                                            mt: '5px',
                                            ml: { md: '20px', lg: '30px' },
                                        }}
                                    >
                                        {item.text}
                                    </Button>
                                </Link>
                            ))}
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
export default Navbar;

