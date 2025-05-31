import React, { useEffect } from 'react';
import { auth, db } from '../firebaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import errorMapping from '../utilities/errorMapping';
import { collection, addDoc } from 'firebase/firestore'; 



const TestResult = ({ wpm, accuracy, correctChars, incorrectChars, missedChars, resetTest }) => {

    const pushDataToDB = () => {
        const { uid } = auth.currentUser;
        const resultsRef = collection(db, 'Results');

        addDoc(resultsRef, {
            wpm: wpm,
            accuracy: accuracy,
            characters: `${correctChars}/${incorrectChars}/${missedChars}`,
            timeStamp: new Date(),
            userId: uid,
        }).then(() => {
            toast.success('Data saved successfully!');
        }).catch((err) => {
            toast.error(errorMapping[err.code] || 'Something went wrong.');
        });
    };

    useEffect(() => {
        if (auth.currentUser) {
            pushDataToDB();
        } else {
            toast.warning('Log in to save results!');
        }
    }, []); 
    

    return (
        <>
            <ToastContainer 
                position="bottom-right" 
                autoClose={2000} 
                theme="dark"  
                toastClassName="custom-toast"
            />
            
                <div id="resultwrap">
                    <div className="resultbox">
                        <div className='boxwrap'>
                            <div className="resheading">wpm</div>
                            <div className="ressubheading">{wpm}</div>
                        </div>

                        <div className="boxwrap">
                            <div className="resheading">accuracy</div>
                            <div className="ressubheading">{accuracy}</div>
                        </div>

                        <div className="boxwrap">
                            <div className="resheading">characters</div>
                            <div id="charsubheading">
                                <div>correct: {correctChars}</div>
                                <div>incorrect: {incorrectChars}</div>
                                <div>missed: {missedChars}</div>
                            </div>
                        </div>    
                    </div>
                </div>

                <div id="button">
                    <button id="resetbtn" onClick={resetTest}>
                        <svg width="2.813rem" height="2.813rem" viewBox="0 0 52 52" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17.5912 3.83139C18.2564 3.56539 18.9775 4.06523 18.9622 4.78159L18.6664 18.6878C18.6494 19.4847 17.7533 19.9423 17.098 19.4886L13.0091 16.6566C11.1152 19.2854 10.0003 22.5129 10.0003 26.0003C10.0004 34.8368 17.1638 42.0003 26.0003 42.0003C34.8367 42.0002 42.0003 34.8367 42.0003 26.0003C42.0003 17.1639 34.8367 10.0005 26.0003 10.0003C25.9793 10.0003 25.9579 10.0003 25.9369 10.0003L26.0863 4.00131C38.1969 4.04781 48.0003 13.8788 48.0003 26.0003C48.0003 38.1504 38.1504 48.0002 26.0003 48.0003C13.8501 48.0003 4.00041 38.1505 4.00034 26.0003C4.00034 21.2432 5.5117 16.8401 8.07846 13.2415L4.47787 10.7474C3.82277 10.2935 3.93606 9.29341 4.67612 8.99741L17.5912 3.83139Z" fill="currentColor"/></svg>
                    </button>
                </div>
        </>
    );
};

export default TestResult;