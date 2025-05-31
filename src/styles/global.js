import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

:root{
    --bgColor: #DCC995;
    --textPrimary: rgba(32, 29, 22, 1);
    --textSecondary: rgba(165, 152, 116, 1);
    --textIncorrect: #FF0000;
}

.#App {
    display: grid;
    grid-template-rows: auto 1fr auto; 
    min-height: 63vh;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    font-style: normal;
    font-size: 2rem;
}

body{
    height:100%;

    background-color: ${({theme})=>theme.background};
    color: ${({theme})=>theme.textColor};
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    font-style: normal;
    font-size: 2rem;

    margin: 1.5rem;
    padding: 0;

    transition: background-color 0.5s ease-in-out;
    
}

#logo{
    display: flex;
    gap: 1rem;
    
    color: ${({theme})=>theme.logoColor};
    transition: color 0.5s ease-in-out;
    
}

#logotext{
    margin-top: auto;
    margin-bottom: auto;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    font-style: normal;
    font-size: 2rem;
}

#logosubtext{
    font-size: 1rem;
    font-weight: 500;
}

#logo svg{
    width: 4rem;
    height: auto;

    color: ${({ theme }) => theme.logoColor}!important;
    transition: color 0.5s ease-in-out;

}

#header {
    display: grid;
    max-width: auto;
    width: 100%;
    grid-template-columns: 1fr auto;
    align-items: center;
    justify-content: space-between;
}

#header a{
    max-width: 20rem;
}

.logs{
    display: flex;
    flex-direction: left;
}

.usericon svg{
    width: 2rem;
    height: auto;
    margin-right: 0.2rem;
    padding-right: 1rem;

    color: ${({ theme }) => theme.logoColor}!important;
    transition: color 0.5s ease-in-out;
}

.usericon svg path:hover{
    color: ${({ theme })=>theme.typeBoxText};
    transition: color 0.5s ease-in-out;
    cursor: pointer;
}

.logouticon{
     width: 3rem;
}

.logouticon svg{
    width: 2rem;
    height: auto;
    margin-right: 0.2rem;
    padding-right: 1rem;

    color: ${({ theme }) => theme.logoColor}!important;
    transition: color 0.5s ease-in-out;
}

.logouticon svg path:hover{
    color: ${({ theme })=>theme.correctText};
    transition: color 0.5s ease-in-out;
    cursor: pointer;
}


#info{
    color: var(--textPrimary);
}

#button{
    display: flex;
    justify-content: flex-end;
}

#resetbtn{
    width: auto;
    height: 47px;
    border: none;
    cursor: pointer;
    color: ${({ theme }) => theme.textColor};
    background-color: inherit;
    transition: transform 1s ease-in-out;
}

#resetbtn:hover{
    transform: rotate(360deg);
}

#resetbtn svg path {
  transition: fill 0.5s ease-in-out;
}

#resetbtn:hover svg path{
    fill: var(--textSecondary)!important;
}

#game{
    display: grid;
    place-items: center;
    margin-top: 8rem;
}


#wordbox{
    position: relative;
    width: 90vw;      
    max-width: 65rem;
    height: auto; 
    overflow-y: visible;
    padding-top: 3rem;     
    padding-bottom: 0.8rem;
}

.words {
    font-weight: 400;
    font-size: 1.875rem;
    line-height: 1.6em; 
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;

    max-height: calc(1.8em * 3); 
    overflow: hidden;
    
}

.word{
    color: ${({theme})=>theme.typeBoxText};
    margin: 4px;
    padding-right: 1px;
    
    transition: color 0.4s ease-in-out;

}

.hidden{
    opacity: 0;
}

.current{
    border-bottom: 3px solid;
    color: ${({theme})=>theme.logoColor};
}
    
.current-next {
    border-bottom: 3px solid;
    height: 45px;
    color: ${({theme})=>theme.correctText};
}

.correct {
    color: ${({theme})=>theme.correctText};
    font-size: 29.7px;
    font-weight: 500;
    display: inline-block;
    animation: jump 0.3s ease;reg
}

.incorrect {
    display: inline-block;
    color: var(--textIncorrect);
    animation: shake 0.3s ease;
}

@keyframes jump {
    0%   { transform: translateY(0); }
    50%  { transform: translateY(-4px); }
    100% { transform: translateY(2px); }
}

@keyframes shake {
    0%   { transform: translateX(0); }
    25%  { transform: translateX(-4px); }
    50%  { transform: translateX(0px); }
    75%  { transform: translateX(-4px); }
    100% { transform: translateX(0); }
}

.uppermenu{
    font-size: 1.5rem;
    display: flex;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    justify-content: space-between;
}

.modes{
    display: flex;
    gap: 0.7rem;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
    font-weight: 400;
}

.time-mode:hover{
    color: ${({theme})=>theme.typeBoxText};
    cursor: pointer;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
}

#acc {
    display: flex;
    align-items: center;
    gap: 0.7rem; 
}

.username {
    font-weight: 500;
    font-size: 1rem;
    color: inherit;
    margin-bottom: 0.5rem;
}


#footer{
    font-size: 1.2rem;
    max-width: 65rem;
    display: flex;
 
    margin-left: auto;
    margin-right: auto;
    margin-top: 4rem;
}

#footertext a{
    display: flex;
    justify-content: flex-start;
    margin-left: 1rem;
    margin-top: 0.3rem;
    color: ${({ theme }) => theme.textColor}!important;
    text-decoration: none;
}

#footertext a:hover{
    color: ${({theme})=>theme.typeBoxText}!important;
    cursor: pointer;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
}


.selectwrap{
    transition: background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease;
}

#resultwrap{
    max-width: 65rem;
    height: 13.1rem;

    padding-top: 3rem;     
    padding-bottom: 0.8rem;
}

.resultbox {
    height: calc(1.8em * 3);
    max-width: 65rem;
    width: 90vw;
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    align-items: flex-start;
    justify-content: space-between;
    box-sizing: border-box;
}

.boxwrap {
    display: flex;
    margin-right: 5rem;
    flex-direction: column;
    justify-content: flex-start;
    flex: 1;
}

.ressubheading {
    font-weight: 400;
}

#charsubheading {
    font-weight: 400;
    font-size: 1.2rem;
}

.usericon{
    text-align: left;
}

.table ::-webkit-scrollbar {
    width: 8px;
}

.table ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.typeBoxText}; 
    width: 6px;
    border-radius: 4px;
}

.table ::-webkit-scrollbar-thumb {
    background:  ${({theme})=>theme.logoColor};
    border-radius: 4px;
}

.table ::-webkit-scrollbar-thumb:hover {
    background:  ${({theme})=>theme.textColor};
}

.userprofile { 
    display: flex;
    justify-content: center;
    gap: 3rem;
    padding: 1rem;
    margin-top: 2rem;
}

.userinfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.4rem;
}

.userinfo-row {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.infotext{
    font-size: 1.5rem;
}

.page-username, .email{
    font-size: 1.2rem;
    font-weight: 400;
}

.focus-warning {
    position: absolute;
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
    color: ${({theme})=>theme.textColor};
    width: 67rem;
    height: 13rem;
    font-weight: 400;
    backdrop-filter: blur(8px);
    cursor: pointer;

    display: flex; 
    justify-content: center; 
    align-items: center;    

`;






