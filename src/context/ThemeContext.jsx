import React from 'react';
import { children, createContext, useContext, useState, useEffect} from "react";
import { themeOptions } from "../utilities/themeOptions";


const themeContext = createContext();

export const ThemeContextProvider = ({children})=>{

    const defaultValue = JSON.parse(localStorage.getItem('theme')) || themeOptions[0].value;

    const [theme, setTheme] = useState(defaultValue); 

    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(theme));
    }, [theme]);

    const values = {
        theme,
        setTheme
    }

    return (<themeContext.Provider value={values}>{children}</themeContext.Provider>)
}

export const useTheme =  ()=> useContext(themeContext);