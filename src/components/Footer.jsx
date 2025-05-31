import Select from 'react-select'
import React, { useState } from 'react'
import { themeOptions } from '../utilities/themeOptions';
import { useTheme } from '../context/ThemeContext';


const Footer = () => {
    const {setTheme, theme} = useTheme();

    const handleChange  = (e)=>{
    
        localStorage.setItem("theme", JSON.stringify(e.value));
    }

  return (
    <div id='footer'>
        <div className="themeButton">
            <div className="selectwrap">
            <Select
                value={{ label: theme.label, value: theme }}
                onChange={(selectedOption) => {
                    setTheme(selectedOption.value); 
                }}
                options={themeOptions}
                menuPlacement='top'
                isSearchable={false}
                styles={{
                    control: styles => ({
                        ...styles,
                        backgroundColor: theme.background,
                        borderColor: theme.textColor,
                        boxShadow: 'none', 
                        '&:hover': {
                            borderColor: theme.textColor
                        },
                    }),
                    menu: styles => ({
                        ...styles,
                        backgroundColor: theme.background,
                    }),
                    option: (styles, { isFocused }) => ({
                        ...styles,
                        backgroundColor: !isFocused ? theme.background : theme.textColor,
                        color: !isFocused ? theme.textColor : theme.background,
                        cursor: 'pointer',
                    }),
                    indicatorSeparator: () => ({
                        display: 'none'            
                    }),
                    dropdownIndicator: (styles) => ({
                        ...styles,
                        color: theme.textColor, // sets the arrow color
                    }),
                    singleValue: (styles) => ({
                        ...styles,
                        color: theme.correctText
                    })
                }}
            />
            </div>
        </div>

        <div id='footertext'>
              <a href="https://www.example.com">
               <svg width="30" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 39.0536C8 42.0536 8 34.0536 4 33.0536M32 45.0536V37.3136C32.075 36.3599 31.9462 35.4012 31.622 34.5012C31.2979 33.6011 30.7859 32.7804 30.12 32.0936C36.4 31.3936 43 29.0136 43 18.0936C42.9995 15.3012 41.9254 12.616 40 10.5936C40.9117 8.1506 40.8472 5.45028 39.82 3.05359C39.82 3.05359 37.46 2.35359 32 6.01359C27.416 4.77123 22.584 4.77123 18 6.01359C12.54 2.35359 10.18 3.05359 10.18 3.05359C9.15275 5.45028 9.08829 8.1506 10 10.5936C8.06025 12.631 6.98505 15.3405 7 18.1536C7 28.9936 13.6 31.3736 19.88 32.1536C19.222 32.8335 18.7145 33.6444 18.3906 34.5334C18.0667 35.4225 17.9336 36.3697 18 37.3136V45.0536" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </a>
        </div>
    </div>
  )
}

export default Footer