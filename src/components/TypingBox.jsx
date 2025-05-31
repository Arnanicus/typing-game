import React, { useRef, useState , useEffect, useMemo, createRef } from 'react';

import randomWords from 'random-words';
import UpperMenu from './UpperMenu';
import { useTestMode } from '../context/TestModeContext';
import TestResult from './TestResult';

const TypingBox = () => {

    // random words
    const [wordsArray, setWordsArray] = useState(() => randomWords(1000));  

    // takes user input
    const inputRef = useRef(null);

    // test time component
    const {testTime} = useTestMode();

    // check if focused
    const [isFocused, setIsFocused] = useState(true);

    // countdown function
    const [countDown, setCountDown] = useState(testTime);

    // interval to stop test
    const [intervalId, setintervalId] = useState(null);

    // checking if test has started/ended
    const [testStart, setTestStart] = useState(false);
    const [testEnd, setTestEnd] = useState(false);

    // test score accuracy, wpm
    const [correctChars, setCorrectChars] = useState(0);
    const [incorrectChars, setIncorrectChars] = useState(0);
    const [missedChars, setMissedChars] = useState(0);
    const [correctWords, setCorrectWords] = useState(0);

    //  match characters on screen
    const [currentWordIndex, setcurrentWordIndex] = useState(0);
    const [currentCharIndex, setcurrentCharIndex] = useState(0);


    const wordsSpanRef = useMemo(() => {
        return Array(wordsArray.length).fill(0).map(() => createRef(null));
    }, [wordsArray]);


    // timer start function
    const startTimer = ()=>{
      
      const intervalId = setInterval(timer, 1000);
      setintervalId(intervalId);
      function timer(){
        setCountDown((latestCountdown)=>{

          if(latestCountdown === 1){
            setTestEnd(true);
            clearInterval(intervalId);
            return 0;
          }

          return latestCountdown-1;
        });
      }

    }

    //reset test
    const resetTest = ()=>{
      clearInterval(intervalId);
      setCountDown(testTime);
      setcurrentWordIndex(0);
      setcurrentCharIndex(0);
      setTestStart(false);
      setTestEnd(false);
      setWordsArray(randomWords(500));
      resetWordSpanRefClassname();
      focusInput();
    }

    // reset classnames to default for reset
    const resetWordSpanRefClassname = ()=>{
        wordsSpanRef.forEach(i => {
          if (i.current) {
            Array.from(i.current.childNodes).forEach(j => {
              j.className = '';
            });
          }
        });
    if (wordsSpanRef[0]?.current?.childNodes?.[0]) {
      wordsSpanRef[0].current.childNodes[0].className = 'current';
      }
    }

      // check for user input
   const handleUserInput = (e) => {

      if(!testStart){
        startTimer();
        setTestStart(true);
      }
    
      const currentWordRef = wordsSpanRef[currentWordIndex];
      if (!currentWordRef || !currentWordRef.current) return;

      const allCurrentChars = currentWordRef.current.childNodes;

      // handle spacebar
      if (e.code === 'Space') {
        e.preventDefault(); // prevent actual space input

        let correctCharsInWord = wordsSpanRef[currentWordIndex].current.querySelectorAll('.correct');

        if(correctCharsInWord.length === allCurrentChars.length){
          setCorrectWords(correctWords+1);
        }

        if (currentCharIndex >= allCurrentChars.length) {
          if (allCurrentChars[currentCharIndex - 1]) {
            allCurrentChars[currentCharIndex - 1].classList.remove('current-next');
          }
        } else {
          if (currentCharIndex < allCurrentChars.length) {
          setMissedChars(missedChars + (allCurrentChars.length - currentCharIndex));
          for (let i = currentCharIndex; i < allCurrentChars.length; i++) {
            allCurrentChars[i].classList.remove('current', 'current-next');
          }
        }
        }

        const nextWordChars = wordsSpanRef[currentWordIndex + 1]?.current?.childNodes;
        if (nextWordChars && nextWordChars[0]) {
          nextWordChars[0].className = 'current';
        }

        setcurrentWordIndex(currentWordIndex + 1);
        setcurrentCharIndex(0);
        return;
      }

      // handle backspace
      if (e.key === 'Backspace') {
        e.preventDefault();

        const currentWordRef = wordsSpanRef[currentWordIndex];
        const currentChars = currentWordRef.current.childNodes;

        if (currentCharIndex > 0) {
          const currentChar = currentChars[currentCharIndex - 1];

          if (currentChar.classList.contains('extra')) {

            // remove the extra character span from DOM
            currentChar.remove();
          } else {
            currentChar.className = 'current';
          }

          if (currentCharIndex < currentChars.length) {
            currentChars[currentCharIndex].classList.remove('current');
          }

          setcurrentCharIndex(currentCharIndex - 1);
        } else if (currentWordIndex > 0) {

          // move to previous word
          const prevWordRef = wordsSpanRef[currentWordIndex - 1];
          const prevChars = prevWordRef.current.childNodes;

          // clear current highlight
          if (currentChars[0]) {
            currentChars[0].classList.remove('current');
          }

          // set last character of previous word as current
          const lastCharIndex = prevChars.length;
          prevChars[lastCharIndex - 1].className = 'current';
          setcurrentCharIndex(lastCharIndex);


          setcurrentWordIndex(currentWordIndex - 1);
          setcurrentCharIndex(prevChars.length);
        }

        return;
      }
      
      // handle character typing
      if (!allCurrentChars[currentCharIndex]) return;

      const expectedChar = allCurrentChars[currentCharIndex].innerText;
      const typedChar = e.key;

      // clear existing cursor
      allCurrentChars[currentCharIndex].classList.remove('current');

      if (typedChar === expectedChar) {
        allCurrentChars[currentCharIndex].className = 'correct';
        setCorrectChars(correctChars+1);
      } else {
        allCurrentChars[currentCharIndex].className = 'incorrect';
        setIncorrectChars(incorrectChars+1);
      }

      // apply cursor to next character
      if (currentCharIndex + 1 === allCurrentChars.length) {
        allCurrentChars[currentCharIndex].classList.add('current-next');
      } else {
        allCurrentChars[currentCharIndex + 1].className = 'current';
      }

      setcurrentCharIndex(currentCharIndex + 1);
    };

    // calculating wpm
    const calcWPM =  ()=>{
      return Math.round((correctChars/5)/(testTime/60));
    }

    // calculating accuracy
    const calcAcc = () => {
      if (currentWordIndex === 0) return 0;
      return Math.round((correctWords / currentWordIndex) * 100);
    };


   const focusInput = () => {
      if (inputRef.current) {
      inputRef.current.focus();
        }
      }

    useEffect(()=>{
      resetTest();
    }, [testTime])

    useEffect(() => {
        focusInput();
        wordsSpanRef[0].current.childNodes[0].className = 'current';
    }, []);
    
    useEffect(() => {
      wordsSpanRef[currentWordIndex]?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, [currentWordIndex]);


  return (
    <div>
      <UpperMenu countDown={countDown}> 

      
      </UpperMenu>

        {(testEnd) ? 

        (<TestResult 

        wpm={calcWPM()} 
        accuracy={calcAcc()} 
        correctChars={correctChars} 
        incorrectChars={incorrectChars}   
        missedChars={missedChars}
        resetTest={resetTest}
        
        />)

        :(<div id='wordbox' onClick={focusInput}>
          {!isFocused && (
              <div className="focus-warning">
                <span>click here to lock in and start typing</span>
              </div>
            )}
          <div className="words">
                {
                  wordsArray.map((word, index) => (
                    <span key={index} className="word" ref={wordsSpanRef[index]}>
                      {word.split('').map((char, charIndex) => (
                        <span key={charIndex} className="char">{char}</span>
                      ))}
                    </span>
                  ))
                }
          </div>
            <input  
              type='text'
              className='hidden'
              ref={inputRef}
              onKeyDown={handleUserInput}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />

             <div id="button">
                <button id="resetbtn" onClick={resetTest}>
                  <svg width="2.813rem" height="2.813rem" viewBox="0 0 52 52" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17.5912 3.83139C18.2564 3.56539 18.9775 4.06523 18.9622 4.78159L18.6664 18.6878C18.6494 19.4847 17.7533 19.9423 17.098 19.4886L13.0091 16.6566C11.1152 19.2854 10.0003 22.5129 10.0003 26.0003C10.0004 34.8368 17.1638 42.0003 26.0003 42.0003C34.8367 42.0002 42.0003 34.8367 42.0003 26.0003C42.0003 17.1639 34.8367 10.0005 26.0003 10.0003C25.9793 10.0003 25.9579 10.0003 25.9369 10.0003L26.0863 4.00131C38.1969 4.04781 48.0003 13.8788 48.0003 26.0003C48.0003 38.1504 38.1504 48.0002 26.0003 48.0003C13.8501 48.0003 4.00041 38.1505 4.00034 26.0003C4.00034 21.2432 5.5117 16.8401 8.07846 13.2415L4.47787 10.7474C3.82277 10.2935 3.93606 9.29341 4.67612 8.99741L17.5912 3.83139Z" fill="currentColor"/></svg>
                </button>
             </div>

        </div>)}

    </div>      
    )
  }

export default TypingBox
