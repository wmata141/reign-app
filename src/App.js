import React, { useState } from 'react';
import CorazonVacio from '../src/assets/images/corazonVacio.svg'
import CorazonLleno from '../src/assets/images/corazonLleno.svg'
import Timer from '../src/assets/images/timer.svg'
import AngularImg from '../src/assets/images/image-138.png'
import ReactImg from '../src/assets/images/image-140.png'
import VueImg from '../src/assets/images/image-141.png'

function App() {
  const [framework, setFramework] = useState({ img: null, name: 'Select your News:' });

  return (
    <div className="Front-End-Test---Home-view">

      <div className="Rectangle-2-Copy">
        <span className="HACKER-NEWS">
          HACKER NEWS
        </span>
      </div>

      <div className="RectangleContent">
        <div className="Rectangle">
          <span className="All">
            All
          </span>
        </div>

        <div className="Rectangle">
          <span className="My-faves">
            My faves
          </span>
        </div>
      </div>

      <div className="Rectangle-26-Copy-23 dropdown">
        <button className="dropbtn">
          <span className="Text">
            <img src={framework.img}
              className="Image-138" />
            {framework.name} 
          </span>
        </button>


        <div className="dropdown-content">
          <span onClick={() => setFramework({ img: AngularImg, name: 'Angular' })} className="Text">
            <img src={AngularImg}
              className="Image-138" />
            Angular
          </span>
          <span onClick={() => setFramework({ img: ReactImg, name: 'React' })} className="Text">
            <img src={ReactImg}
              className="Image-138" />
            React
          </span>
          <span onClick={() => setFramework({ img: VueImg, name: 'Vue' })} className="Text">
            <img src={VueImg}
              className="Image-138" />
            Vue
          </span>
        </div>
      </div>

      <div className="Reactangle-Card-Content">
        {
          [1, 2, 3, 4].map(i => {
            return (
              <div className="Rectangle-Card" >
                <div style={{ display: 'grid' }}>
                  <span className="-hours-ago-by-autho">
                    <img src={Timer} className="iconmonstr-time-2" />
                    3 hours ago by author
                  </span>

                  <span className="Yes-React-is-taking">
                    Yes, React is taking over front-end development. The question is why.
                  </span>
                </div>

                <div className="Rectangle-Right">
                  <img src={CorazonLleno} className="iconmonstr-favorite-3" />
                </div>
              </div>
            )
          })
        }
      </div>

    </div>
  );
}

export default App;
