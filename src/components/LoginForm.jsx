import React, { useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import { useTheme } from '../context/ThemeContext';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = ({handleClose}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {theme} = useTheme();


    const handleSubmit = ()=>{
        if (!email || !password) {
            toast.error("Fill all fields!");
            return;
        }

        signInWithEmailAndPassword(auth, email, password).then((res)=>{
            toast.success("Successful login!");
            console.log('User:', res.user);
            handleClose();
        }).catch((err)=>{
            toast.error("Invalid Details");
            handleClose();
        })
    }

  return (
    <Box
    p={5}
    style={{
        display: 'flex',
        flexDirection: 'column',
        gap:'20px'
    }}
    >
         <>
        <svg width="320" height="50" viewBox="0 0 752 757" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M423.4 236.057C450.243 236.057 473.94 241.509 494.491 252.414C515.462 263.319 531.61 276.53 542.935 292.049V241.719H615.283V753.196H542.935V538.036C531.61 553.555 515.253 566.766 493.862 577.671C472.472 588.576 448.146 594.028 420.884 594.028C391.105 594.028 363.843 586.479 339.098 571.38C314.772 555.862 295.269 534.471 280.59 507.209C266.33 479.528 259.199 448.281 259.199 413.47C259.199 378.658 266.33 347.831 280.59 320.988C295.269 294.146 314.982 273.385 339.728 258.705C364.892 243.606 392.783 236.057 423.4 236.057ZM565.229 0C668.379 6.5973e-05 752 83.6206 752 186.771V565.229C752 632.311 716.633 691.131 663.529 724.065V186.771C663.529 132.906 620.204 89.1586 566.499 88.4785L565.229 88.4707H186.771L185.501 88.4785C131.796 89.1587 88.4707 132.906 88.4707 186.771V565.229L88.4785 566.499C89.1533 619.781 132.219 662.847 185.501 663.521L186.771 663.529H491.503V752H186.771C83.6206 752 6.59902e-05 668.379 0 565.229V186.771C0 83.6206 83.6205 0 186.771 0H565.229ZM437.87 298.34C419.416 298.34 402.22 302.954 386.282 312.181C370.344 320.988 357.342 334.2 347.276 351.815C337.63 369.011 332.807 389.563 332.807 413.47C332.807 437.376 337.63 458.347 347.276 476.382C357.342 494.417 370.344 508.258 386.282 517.904C402.639 527.131 419.835 531.745 437.87 531.745C456.324 531.745 473.521 527.131 489.459 517.904C505.397 508.677 518.188 495.256 527.835 477.641C537.901 459.606 542.935 438.634 542.935 414.728C542.935 390.821 537.901 370.06 527.835 352.444C518.188 334.829 505.397 321.408 489.459 312.181C473.521 302.954 456.324 298.34 437.87 298.34Z" fill="currentColor"/></svg>
      </>
         <ToastContainer 
                position="bottom-right" 
                autoClose={2000} 
                theme="dark"  
            />
        <TextField
            variant='outlined'
            type='email'
            label='Enter Email'
            onChange={(e)=>setEmail(e.target.value)}
            InputLabelProps={{
                style:{
                color: theme.typeBoxText
                }
            }}
            InputProps={{
                style:{
                color: theme.typeBoxText
                }
            }}
            />
            
        <TextField
            variant='outlined'
            type='password'
            label='Enter Password'
            onChange={(e)=>setPassword(e.target.value)}
            InputLabelProps={{
                style:{
                color: theme.typeBoxText
                }
            }}
            InputProps={{
                style:{
                color: theme.typeBoxText
                }
            }}
         />
        <Button
        variant='contained'
        size='large'
        style={{backgroundColor: theme.textColor, color: theme.background}} 
        onClick = {handleSubmit}
        >Login</Button>
    </Box>
  )
}

export default LoginForm