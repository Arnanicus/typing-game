import React from 'react'
import Select from 'react-select'

const defaultTheme = {
    label : 'default',
    background: 'var(--bgColor)',
    textColor: 'var(--textPrimary)',
    logoColor: 'black',
    typeBoxText: 'var(--textSecondary)',
    correctText: 'var(--textPrimary)',

}

const bratTheme = {
    label: '360',
    background: '#8ACE00',
    textColor: 'black',
    logoColor: 'black',
    typeBoxText: '#819654',
    correctText: 'black',

}

const winTheme = {
    label: 'window',
    background: '#fdffff',
    textColor: '#0402cc',
    logoColor: '#818181',
    typeBoxText: '#c3c3c3',
    correctText: '#0402cc',

}

const midnightTheme = {
    label: 'midnight',
    background: '#0E2148',
    textColor: '#E3D095',
    logoColor: '#7965C1',
    typeBoxText: '#483AA0',
    correctText: '#E3D095',
}




export const themeOptions = [
    {label: 'default', value: defaultTheme},
    {label: '360', value: bratTheme},
    {label: 'window', value: winTheme},
    {label: 'midnight', value: midnightTheme}

]
