import React, { useEffect, useState } from 'react'
import moment from 'moment'
import CorazonVacio from '../src/assets/images/corazonVacio.svg'
import CorazonLleno from '../src/assets/images/corazonLleno.svg'
import Timer from '../src/assets/images/timer.svg'
import AngularImg from '../src/assets/images/image-138.png'
import ReactImg from '../src/assets/images/image-140.png'
import VueImg from '../src/assets/images/image-141.png'

function App() {
  const [framework, setFramework] = useState({ img: null, name: 'Select your News:' });
  const [posts, setPosts] = useState([]);
  const [faves, setFaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listHandle, setListHandle] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  useEffect(() => {
    const fetchPost = async () => {
      const data = await fetch(`https://hn.algolia.com/api/v1/search_by_date?query=${framework.name}&page=0`)
      const { hits } = await data.json()

      const arrayAll = []
      hits.forEach(element => {
        const resultado = faves.find(item => item.objectID === element.objectID);

        if (resultado) {
          arrayAll.push(resultado)
        } else {
          arrayAll.push(element)
        }
      });

      setPosts(arrayAll)
      setLoading(false)
    }

    fetchPost()
  }, [framework, faves])

  useEffect(() => {
    const frameworkJson = JSON.parse(localStorage.getItem('framework'))
    if (frameworkJson) setFramework(frameworkJson)    

    const favesJson = JSON.parse(localStorage.getItem('faves'))
    if (favesJson) setFaves(favesJson)
    
  }, [])



  const now = moment();

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  let currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  if (!listHandle) {
    currentPosts = faves.slice(indexOfFirstPost, indexOfLastPost)
  }

  console.log("currentPosts ==>", currentPosts);

  const pageNumbers = []

  const frameworkList = [
    { img: AngularImg, name: 'angular' },
    { img: ReactImg, name: 'react' },
    { img: VueImg, name: 'vue' }
  ]

  for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
    pageNumbers.push(i)
  }

  const handleFaves = (item) => {
    const arrayAuxPosts = posts
    const arrayAuxFaves = faves
    if (item.faves) {
      arrayAuxPosts.forEach(element => {
        if (element.objectID === item.objectID) {
          element.faves = false
        }
      });
      setPosts(arrayAuxPosts)

      const result = arrayAuxFaves.filter(f => f.objectID !== item.objectID);
      localStorage.setItem('faves', JSON.stringify(result))
      setFaves(result)
    } else {
      item.faves = true
      arrayAuxFaves.push(item)

      let hash = {};
      const result = arrayAuxFaves.filter(o => hash[o.objectID] ? false : hash[o.objectID] = true);
      localStorage.setItem('faves', JSON.stringify(result))
      setFaves(result)
    }

    console.log("item ==>", item);


  }

  const handleFramework = (item) => {
    localStorage.setItem('framework', JSON.stringify(item))
    setFramework(item)
  }

  const clickOpen = (url) => {
    window.open(url);
  }

  return (
    <div className="Front-End-Test---Home-view">
      <div className="Rectangle-2-Copy">
        <span className="HACKER-NEWS">
          HACKER NEWS
        </span>
      </div>

      <div className="RectangleContent">
        <div className="Rectangle" onClick={() => setListHandle(true)} style={listHandle ? { border: 'solid 1px #1797ff' } : {}}>
          <span className="All" >
            All
          </span>
        </div>

        <div className="Rectangle" onClick={() => setListHandle(false)} style={listHandle ? {} : { border: 'solid 1px #1797ff' }}>
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
                  {framework.name[0].toUpperCase() + framework.name.slice(1)}
                </span>
              </button>
              <div className="dropdown-content">
                {
                  frameworkList.map((item, i) => {
                    return (
                      <span key={i} onClick={() => handleFramework(item)} className="Text">
                        <img src={item.img} alt="Angular" className="Image-138" />
                        {item.name[0].toUpperCase() + item.name.slice(1)}
                      </span>
                    )
                  })
                }
              </div>
            </div>

            <div className="Reactangle-Card-Content">
              {
                currentPosts.map((post, i) => {
                  const duration = moment.duration(now.diff(post.created_at));
                  let agoByAuthor = `${duration._data.hours} hours ago by ${post.author}`

                  if (duration._data.hours < 1) {
                    agoByAuthor = `${duration._data.minutes} minutes ago by  ${post.author}`
                  }

                  return (
                    <div className="Rectangle-Card" key={i}>
                      <div style={{ display: 'grid' }} onClick={() => clickOpen(post.story_url)}>
                        <span className="-hours-ago-by-autho">
                          <img src={Timer} alt="timer" className="iconmonstr-time-2" />
                          {agoByAuthor}
                        </span>

                        <span className="Yes-React-is-taking">
                          {post.story_title}
                        </span>
                      </div>

                      <div className="Rectangle-Right" onClick={() => handleFaves(post)}>
                        {
                          post.faves ? (
                            <img src={CorazonLleno} alt="heart" className="iconmonstr-favorite-3" />
                          ) : (
                            <img src={CorazonVacio} alt="heart" className="iconmonstr-favorite-3" />
                          )
                        }

                      </div>
                    </div>
                  )
                })}
            </div>
          </>
        )
      }

      <div>
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

    </div>
  );
}

export default App;