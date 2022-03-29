import React, { useEffect, useState } from 'react'
import moment from 'moment'
// import CorazonVacio from '../src/assets/images/corazonVacio.svg'
import CorazonLleno from '../src/assets/images/corazonLleno.svg'
import Timer from '../src/assets/images/timer.svg'
import AngularImg from '../src/assets/images/image-138.png'
import ReactImg from '../src/assets/images/image-140.png'
import VueImg from '../src/assets/images/image-141.png'

function App() {
  const [framework, setFramework] = useState({ img: null, name: 'Select your News:' });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  useEffect(() => {
    const fetchPost = async () => {
      const data = await fetch('https://hn.algolia.com/api/v1/search_by_date?query=angular&page=0')
      const { hits } = await data.json()
      console.log("hits ==>", hits);
      setPosts(hits)
      setLoading(false)
    }

    fetchPost()
  }, [])

  const now = moment();

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
    pageNumbers.push(i)
  }

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

      {
        loading ? (
          <div style={{ textAlign: 'center' }}>
            <div className="sp sp-3balls"></div>
          </div>
        ) : (
          <>
            <div className="Rectangle-26-Copy-23 dropdown">
              <button className="dropbtn">
                <span className="Text">
                  <img src={framework.img} alt="" className="Image-138" />
                  {framework.name}
                </span>
              </button>
              <div className="dropdown-content">
                <span onClick={() => setFramework({ img: AngularImg, name: 'Angular' })} className="Text">
                  <img src={AngularImg} alt="Angular" className="Image-138" />
                  Angular
                </span>
                <span onClick={() => setFramework({ img: ReactImg, name: 'React' })} className="Text">
                  <img src={ReactImg} alt="Angular" className="Image-138" />
                  React
                </span>
                <span onClick={() => setFramework({ img: VueImg, name: 'Vue' })} className="Text">
                  <img src={VueImg} alt="Angular" className="Image-138" />
                  Vue
                </span>
              </div>
            </div>

            <div className="Reactangle-Card-Content">
              {currentPosts.map((post, i) => {
                const duration = moment.duration(now.diff(post.created_at));
                let agoByAuthor = `${duration._data.hours} hours ago by author`

                if (duration._data.hours < 1) {
                  agoByAuthor = `${duration._data.minutes} minutes ago by author`
                }

                return (
                  <div className="Rectangle-Card" key={i}>
                    <div style={{ display: 'grid' }}>
                      <span className="-hours-ago-by-autho">
                        <img src={Timer} alt="timer" className="iconmonstr-time-2" />
                        {agoByAuthor}
                      </span>

                      <span className="Yes-React-is-taking">
                        {post.story_title}
                      </span>
                    </div>

                    <div className="Rectangle-Right">
                      <img src={CorazonLleno} alt="heart" className="iconmonstr-favorite-3" />
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )
      }

      <nav className="footer">
        <ul className='pagination'>
          <a onClick={() => setCurrentPage(1)} href="!#" className="Rectangle-3-Copy-33">
            {'<'}
          </a>
          {pageNumbers.map(number => (
            // <li key={number} className="page-item">
            <a key={number} onClick={() => setCurrentPage(number)} href="!#" className={number === currentPage ? "Rectangle-3-Copy-33-active" : "Rectangle-3-Copy-33"}>
              {number}
            </a>
            // </li>
          ))}
          <a onClick={() => setCurrentPage(pageNumbers.length)} href="!#" className="Rectangle-3-Copy-33">
            {'>'}
          </a>
        </ul>
      </nav>

    </div>
  );
}

export default App;