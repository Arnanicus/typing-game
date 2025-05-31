import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import ResultTable from '../components/ResultTable';
import UserInfo from '../components/UserInfo';
import Header from '../components/Header';

const UserPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const testResultRef = collection(db, 'Results');
        const q = query(testResultRef, where('userId', '==', user.uid));
        const snapshot = await getDocs(q);

        const results = snapshot.docs.map(doc => ({
          ...doc.data(),
        }));

        console.log('Loaded results:', results); 

        setData(results); 
      } else {
        console.log('No user is signed in.');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className='App'>
      <Header/>
      <UserInfo totalTestsTaken={data.length}/>
      <ResultTable data={data} /> 
    </div>
  );
};

export default UserPage;