import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import navData from '../../data/components-text/navData';
import { Link } from 'react-router-dom';
import ExportButton from '../../import-export/export-button';

const pages = navData;

function Navbar() {
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                        <Box sx={{ flexGrow: 1, display: 'flex' }}>
                            {pages.map((page, index) => (
                                <Link
                                    key={index}
                                    to={page.route} style={{ textDecoration: 'none' }}>
                                    <Button
                                        key={page.id}
                                        sx={{
                                            my: 2, color: 'white.main',
                                            fontSize: '1.1rem',
                                            marginRight: '16px'
                                        }}
                                    >
                                        {page.text}
                                    </Button>
                                </Link>
                            ))}
                        </Box>
                        <Box>
                            <ExportButton />
                        </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;