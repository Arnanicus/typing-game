import React from 'react';
import TypingBox from '../components/TypingBox';
import Footer from '../components/Footer';
import Header from '../components/Header';

const HomePage = () => {
  
  return (
    <div className="App">
        <Header/>

          <div id="game">
              <TypingBox/>
          </div>

          <div>
            <Footer/>
          </div>

    </div>
  )
}

export default HomePage