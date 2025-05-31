import { AppBar, Box, Modal, Tab, Tabs } from '@mui/material'
import React, { useState, useEffect } from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import { useTheme } from '../context/ThemeContext'
import errorMapping from '../utilities/errorMapping';
import GoogleButton from 'react-google-button'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { onAuthStateChanged } from 'firebase/auth'; 
import { auth } from '../firebaseconfig';
import { useNavigate } from 'react-router-dom'




const AccIcon = () => {

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(0);

    // detect user
    const [currentUser, setCurrentUser] = useState(null);
    const user = currentUser;
    

    //navigate
    const navigate = useNavigate();

    // open login/signup
    const handeModalOpen = ()=>{
      if(user){
        navigate('/user');
      }
      else{
        setOpen(true);
      }

    };

    // close login/signup
    const handleClose = ()=>{
      setOpen(false);
    }

    const handleValueChange = (e,v)=>{
      setValue(v);
    }

    const logout = ()=>{
      auth.signOut().then((res)=>{
        console.log('logout successful');
        toast.success('Successfully logged out.');
      })
      .catch((err)=>{toast.error(errorMapping[err.code] || 'Unable to log out');
      });
    }

    const googleProvider = new GoogleAuthProvider();

    const handleGoogleSignIn = ()=>{
      signInWithPopup(auth, googleProvider).then((res)=>{
        toast.success('Google login successful!');
      })
      .catch((err)=>{toast.error(errorMapping[err.code] || 'Something went wrong.');
      });
    }

    const {theme} = useTheme();

     useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

      // Cleanup on unmount
      return () => unsubscribe();
    }, []);


  return (
    <>
     <ToastContainer 
                    position="bottom-right" 
                    autoClose={2000} 
                    theme="dark"  
                    toastClassName="custom-toast"
                />

    <div className='logs'>
        <div className="usericon" onClick={handeModalOpen}>
          <svg width="727" height="727" viewBox="0 0 727 727" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_74_2)"><path d="M363.5 0C162.848 0 0 162.848 0 363.5C0 564.152 162.848 727 363.5 727C564.152 727 727 564.152 727 363.5C727 162.848 564.152 0 363.5 0ZM363.5 145.4C433.655 145.4 490.725 202.469 490.725 272.625C490.725 342.78 433.655 399.85 363.5 399.85C293.344 399.85 236.275 342.78 236.275 272.625C236.275 202.469 293.344 145.4 363.5 145.4ZM363.5 654.3C289.709 654.3 202.469 624.493 140.311 549.612C203.99 499.675 282.576 472.536 363.5 472.536C444.424 472.536 523.01 499.675 586.689 549.612C524.53 624.493 437.29 654.3 363.5 654.3Z" fill="currentColor"/></g><defs><clipPath id="clip0_74_2"><rect width="727" height="727" fill="currentColor"/></clipPath></defs></svg>
        </div>
          {user && 
          <div className="logouticon" onClick={logout}>
            <svg width="50" height="50" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M3.38636 22.4773C2.73011 22.4773 2.16852 22.2438 1.70159 21.7769C1.23466 21.3099 1.0008 20.748 1 20.0909V3.38636C1 2.73011 1.23386 2.16852 1.70159 1.70159C2.16932 1.23466 2.73091 1.0008 3.38636 1H10.5455C10.8835 1 11.1671 1.11455 11.3962 1.34364C11.6253 1.57273 11.7394 1.85591 11.7386 2.19318C11.7378 2.53045 11.6233 2.81403 11.395 3.04392C11.1667 3.27381 10.8835 3.38795 10.5455 3.38636H3.38636V20.0909H10.5455C10.8835 20.0909 11.1671 20.2055 11.3962 20.4345C11.6253 20.6636 11.7394 20.9468 11.7386 21.2841C11.7378 21.6214 11.6233 21.9049 11.395 22.1348C11.1667 22.3647 10.8835 22.4789 10.5455 22.4773H3.38636ZM17.9134 12.9318H9.35227C9.0142 12.9318 8.73102 12.8173 8.50273 12.5882C8.27443 12.3591 8.15989 12.0759 8.15909 11.7386C8.1583 11.4014 8.27284 11.1182 8.50273 10.8891C8.73261 10.66 9.0158 10.5455 9.35227 10.5455H17.9134L15.6761 8.30824C15.4574 8.08949 15.348 7.82102 15.348 7.50284C15.348 7.18466 15.4574 6.90625 15.6761 6.66761C15.8949 6.42898 16.1733 6.30449 16.5114 6.29415C16.8494 6.28381 17.1378 6.39835 17.3764 6.63778L21.642 10.9034C21.8807 11.142 22 11.4205 22 11.7386C22 12.0568 21.8807 12.3352 21.642 12.5739L17.3764 16.8395C17.1378 17.0781 16.8546 17.1927 16.5269 17.1831C16.1991 17.1736 15.9156 17.0491 15.6761 16.8097C15.4574 16.571 15.3532 16.2878 15.3635 15.9601C15.3739 15.6324 15.488 15.3587 15.706 15.1392L17.9134 12.9318Z" fill="black"/></svg>
          </div>
          }
   
            <Modal
              open={open}
              onClose={handleClose}
              style ={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'

              }}
            >
              <div style= {{ 
                width: '25rem',
                backgroundColor: theme.background,
                borderRadius: '8px',
                outline: 'none',
                }}> 

                <AppBar position='static' style={{background: 'transparent'}}>

                  <Tabs 
                    value={value}
                    onChange={handleValueChange}
                    variant='fullWidth'>

                    <Tab label='login' style={{color: theme.textColor}}></Tab>
                    <Tab label='signup' style={{color: theme.textColor}}></Tab>
                    
                  </Tabs>
                </AppBar>

                {value === 0 && <LoginForm handleClose={handleClose}/>}
                {value === 1 && <SignupForm handleClose={handleClose}/>}

                <Box>
                  <GoogleButton
                   style={{
                    width: '100%',
                    }}
                    onClick={handleGoogleSignIn}
                  />
                </Box>

              </div>
            </Modal>

      </div>

    </>
  )
}

export default AccIcon