import CorazonVacio from '../src/assets/images/corazonVacio.svg'
import CorazonLleno from '../src/assets/images/corazonLleno.svg'
import Timer from '../src/assets/images/timer.svg'

function App() {
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

      <div>
        <div className="Rectangle-26-Copy-23">
          <span className="Text">
            Select your news
          </span>
          <div className="Mask">

          </div>
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
