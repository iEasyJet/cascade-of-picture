import './App.css';
import api from '../utils/Api';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [pictures, serPictures] = useState([]);
  const [totalHeight, setTotalHeight] = useState(
    document.body.scrollHeight - window.innerHeight
  );
  const [progress, setProgress] = useState(
    (window.pageXOffset / totalHeight) * 100
  );

  const barRef = useRef();

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  useEffect(() => {
    api.getPictures().then((res) => {
      const newMass = shuffle(res);
      console.log(res);
      serPictures(newMass);
    });
  }, []);

  useEffect(() => {
    setTotalHeight(document.body.scrollHeight - window.innerHeight);
    window.onscroll = function () {
      setProgress((window.pageYOffset / totalHeight) * 100);
      barRef.current.style.height = progress + '%';
    };
  }, [totalHeight, progress]);

  return (
    <>
      <div id='progressbar' ref={barRef}></div>
      <div id='scrollPath'></div>
      <div className='app'>
        {pictures.map((card) => (
          <img
            src={card.download_url}
            key={card.id}
            alt=''
            className='app__img'
          />
        ))}
      </div>
    </>
  );
}

export default App;
