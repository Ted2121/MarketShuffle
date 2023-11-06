import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

export const designTokens = () => ({
    grey: {
        100: "#e0e0e0",
        200: "#c2c2c2",
        300: "#a3a3a3",
        400: "#858585",
        500: "#666666",
        600: "#525252",
        700: "#3d3d3d",
        800: "#292929",
        900: "#141414",
    },
    primary: {
        100: "rgb(190, 232, 247)",
        400: "#0043B8",
        500: "rgb(0, 29, 80)",
        600: "#00163D",
        700: "#627d74",
        900: "#000F29"
    },
    secondary: {
        400: "#FFF170",
        500: 'rgb(255, 248, 185)',
        600: "#FFF170",
        900: "#A39300"
    },
    white: {
        100: "#ffffff",
        200: "#fcfcfc"
    },
    black: {
        100: "#000000"
    },
    fs: {
        xxs: {
            h1: '1.4rem',
            h2: '1.2rem',
            h3: '1.1rem',
            h4: '1rem',
            h5: '.8rem',
            p: '.6rem',
            c: '.5rem',
        },
        md: {
            h1: '1.4rem',
            h2: '1.2rem',
            h3: '1.1rem',
            h4: '1rem',
            h5: '.8rem',
            p: '.6rem',
            c: '.5rem',
        },
        lg: {
            h1: '1.4rem',
            h2: '1.2rem',
            h3: '1.1rem',
            h4: '1rem',
            h5: '.8rem',
            p: '.6rem',
            c: '.6rem',
        },
        xl: {
            h1: '1.4rem',
            h2: '1.2rem',
            h3: '1.1rem',
            h4: '1rem',
            h5: '.8rem',
            p: '.6rem',
            c: '.5rem',
        },
        xxl: {
            h1: '1.4rem',
            h2: '1.2rem',
            h3: '1.1rem',
            h4: '1rem',
            h5: '.8rem',
            p: '.6rem',
            c: '.5rem',
        },
    },

});

export const themeSettings = (mode) => {
    const tokens = designTokens();
    return {
        palette: {
            mode: mode,
            ...(mode === "dark"
                ? {
                    // palette values for dark mode
                    primary: {
                        light: tokens.primary[400],
                        main: tokens.primary[500],
                        dark: tokens.primary[600],
                    },
                    secondary: {
                        light: tokens.secondary[400],
                        main: tokens.secondary[500],
                        dark: tokens.secondary[600]
                    },
                    modal: {
                        main: tokens.primary[100],
                    },
                    neutral: {
                        dark: tokens.grey[700],
                        main: tokens.grey[500],
                        light: tokens.grey[100],
                    },
                    background: {
                        default: tokens.grey[800],
                    },
                    grey: {
                        light: tokens.grey[300],
                        main: tokens.grey[500],
                        dark: tokens.grey[900],
                    },
                    white: {
                        main: tokens.white[100],
                        text: tokens.white[200]
                    },
                    black: {
                        main: tokens.black[100]
                    }
                }
                : {
                    // palette values for light mode
                    primary: {
                        light: tokens.primary[400],
                        main: tokens.primary[500],
                        dark: tokens.primary[600]
                    },
                    secondary: {
                        light: tokens.secondary[400],
                        main: tokens.secondary[500],
                        dark: tokens.secondary[600]
                    },
                    modal: {
                        main: tokens.primary[100],
                    },
                    neutral: {
                        dark: tokens.grey[700],
                        main: tokens.grey[500],
                        light: tokens.grey[100],
                    },
                    background: {
                        default: tokens.white[200],
                    },
                    grey: {
                        light: tokens.grey[300],
                        main: tokens.grey[500],
                        dark: tokens.grey[800],
                    },
                    white: {
                        main: tokens.white[100],
                        text: tokens.white[200]
                    },
                    black: {
                        main: tokens.black[100]
                    }
                }),
        },
        typography: {
            fontSize: 12,
            h1: {
                fontSize: 40,
            },
            h2: {
                fontSize: 32,
            },
            h3: {
                fontSize: 24,
            },
            h4: {
                fontSize: 20,
            },
            h5: {
                fontSize: 16,
            },
            h6: {
                fontSize: 14,
            },
        },
        breakpoints: {
            values: {
                xxs: 0,
                xs: 290,
                sm: 450,
                tab: 767,
                md: 960,
                lg: 1200,
                xl: 1800,
                xxl: 3800,
            },
        },
        fontSize: {
            h1: {
                xxs: tokens.fs.xxs.h1,
                md: tokens.fs.md.h1,
                lg: tokens.fs.lg.h1,
                xl: tokens.fs.xl.h1,
                xxl: tokens.fs.xxl.h1,
            },
            h2: {
                xxs: tokens.fs.xxs.h2,
                md: tokens.fs.md.h2,
                lg: tokens.fs.lg.h2,
                xl: tokens.fs.xl.h2,
                xxl: tokens.fs.xxl.h2,
            },
            h3: {
                xxs: tokens.fs.xxs.h3,
                md: tokens.fs.md.h3,
                lg: tokens.fs.lg.h3,
                xl: tokens.fs.xl.h3,
                xxl: tokens.fs.xxl.h3,
            },
            h4: {
                xxs: tokens.fs.xxs.h4,
                md: tokens.fs.md.h4,
                lg: tokens.fs.lg.h4,
                xl: tokens.fs.xl.h4,
                xxl: tokens.fs.xxl.h4,
            },
            h5: {
                xxs: tokens.fs.xxs.h5,
                md: tokens.fs.md.h5,
                lg: tokens.fs.lg.h5,
                xl: tokens.fs.xl.h5,
                xxl: tokens.fs.xxl.h5,
            },
            captions: {
                xxs: tokens.fs.xxs.c,
                md: tokens.fs.md.c,
                lg: tokens.fs.lg.c,
                xl: tokens.fs.xl.c,
                xxl: tokens.fs.xxl.c,
            },
        },
        components: {
            MuiToolbar: {
                styleOverrides: {
                    regular: {
                        minHeight: 50,
                        maxHeight: 50,
                        '@media (min-width: 464px)': {
                            minHeight: 50,
                            maxHeight: 50,
                        }
                    }
                }
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        // backgroundColor: mode === "dark" ? grey.main : grey.light,
                    },
                },
            },
            MuiCssBaseline: {
                styleOverrides: {
                    '*': {
                        '&::-webkit-scrollbar': {
                            width: '0.8em',
                        },
                        '&::-webkit-scrollbar-track': {
                            backgroundColor: tokens.grey[700],
                            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: tokens.grey[200],
                            borderRadius: '4px',
                        },
                    },
                },
            }
        },

    };
};

export const ColorModeContext = createContext({
    toggleColorMode: () => { },
});

export const useMode = () => {
    const [mode, setMode] = useState("light");

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () =>
                setMode((prev) => (prev === "light" ? "dark" : "light")),
        }),
        []
    );

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    return [theme, colorMode];
};