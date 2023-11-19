import { Box, Input, TextField, Typography } from '@mui/material'
import { display } from '@mui/system'
import React from 'react'

function SimpleShuffle() {
    return (
        <Box sx={{
            width: '100%',
            // height:'100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Box sx={{
                width: '40%',
                // height: '60%',
                border: '1px solid',
                display: 'flex',
                justifyContent: 'center',
                p: 4,
                // alignItems:'center'
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}>
                    <Typography variant='h4'>Check minimum selling point</Typography>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 3,
                        alignItems: 'center',
                        width: '300px',
                        justifyContent: 'space-between'
                    }}>
                        <Typography>
                            Initial Price:
                        </Typography>
                        <TextField type='number' size='small'>
                        </TextField>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 3,
                        alignItems: 'center',
                        width: '300px',
                        justifyContent: 'space-between'
                    }}>
                        <Typography>
                            Margin:
                        </Typography>
                        <TextField type='number' size='small' defaultValue={10}>

                        </TextField>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 3,
                        alignItems: 'center',
                        width: '300px',
                        justifyContent: 'space-between'
                    }}>
                        <Typography>
                            fee:
                        </Typography>
                        <TextField type='number' size='small' defaultValue={2}
                            InputProps={{
                                readOnly: true,
                            }}>

                        </TextField>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 3,
                        alignItems: 'center',
                        width: '300px',
                        justifyContent: 'space-between'
                    }}>
                        <Typography>
                            Sell for:
                        </Typography>
                        <TextField type='number' size='small'
                            InputProps={{
                                readOnly: true,
                            }}>

                        </TextField>
                    </Box>
                </Box>
            </Box>
            <Box sx={{
                width: '40%',
                // height: '40%',
                border: '1px solid',
                display: 'flex',
                justifyContent: 'center',
                p: 4,
                gap: 2,
                // alignItems:'center'
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}>
                    <Typography variant='h4'>Check maximum buying point</Typography>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 3,
                        alignItems: 'center',
                        width: '300px',
                        justifyContent: 'space-between'
                    }}>
                        <Typography>
                            Initial Price:
                        </Typography>
                        <TextField type='number' size='small'>

                        </TextField>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 3,
                        alignItems: 'center',
                        width: '300px',
                        justifyContent: 'space-between'
                    }}>
                        <Typography>
                            Margin:
                        </Typography>
                        <TextField type='number' size='small' defaultValue={10}>

                        </TextField>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 3,
                        alignItems: 'center',
                        width: '300px',
                        justifyContent: 'space-between'
                    }}>
                        <Typography>
                            fee:
                        </Typography>
                        <TextField type='number' size='small' defaultValue={2}
                            InputProps={{
                                readOnly: true,
                            }}>

                        </TextField>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 3,
                        alignItems: 'center',
                        width: '300px',
                        justifyContent: 'space-between'
                    }}>
                        <Typography>
                            Buy until:
                        </Typography>
                        <TextField type='number' size='small'
                            InputProps={{
                                readOnly: true,
                            }}>

                        </TextField>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default SimpleShuffle