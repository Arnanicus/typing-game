import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebaseconfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc } from 'firebase/firestore';

const UserInfo = () => {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUsername(userDoc.data().username);
        }
      }
    };

    fetchUsername();
  }, [user]);

  if (!user) {
    return <div>No user is signed in.</div>;
  }

  return (
    <div className="userprofile">
      <div className="user">
        { <svg width="100" height="100" viewBox="0 0 727 727" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_74_2)"><path d="M363.5 0C162.848 0 0 162.848 0 363.5C0 564.152 162.848 727 363.5 727C564.152 727 727 564.152 727 363.5C727 162.848 564.152 0 363.5 0ZM363.5 145.4C433.655 145.4 490.725 202.469 490.725 272.625C490.725 342.78 433.655 399.85 363.5 399.85C293.344 399.85 236.275 342.78 236.275 272.625C236.275 202.469 293.344 145.4 363.5 145.4ZM363.5 654.3C289.709 654.3 202.469 624.493 140.311 549.612C203.99 499.675 282.576 472.536 363.5 472.536C444.424 472.536 523.01 499.675 586.689 549.612C524.53 624.493 437.29 654.3 363.5 654.3Z" fill="currentColor"/></g><defs><clipPath id="clip0_74_2"><rect width="727" height="727" fill="currentColor"/></clipPath></defs></svg>}
      </div>
      <div className="userinfo">

        <div className="userinfo-row">

            <div className="infotext">
                Username :
            </div>
        
            <div className="page-username">
                {username || user?.displayName}
            </div>

        </div>

        <div className="userinfo-row">

            <div className="infotext">
                E-mail :
            </div>

            <div className="email">
                {user.email}
            </div>

        </div>

      </div>
    </div>
  );
};

export default UserInfo;