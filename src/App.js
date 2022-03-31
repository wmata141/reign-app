import React, { useEffect, useState } from 'react'
import SelectList from './components/SelectList'
import SelectFramework from './components/SelectFramework'
import ContentList from './components/ContentList'
import Footer from './components/Footer'

function App() {
  const [framework, setFramework] = useState({ img: null, name: 'Select your News:' });
  const [posts, setPosts] = useState([]);
  const [faves, setFaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listHandle, setListHandle] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  // const [totalPages, setTotalPages] = useState(0);
  const [nbPages, setNbPages] = useState([])

  useEffect(() => {
    // GET INFORMATION FROM THE API 
    const fetchPost = async () => {
      const data = await fetch(`https://hn.algolia.com/api/v1/search_by_date?query=${framework.name}&page=${currentPage}`)
      const { hits, nbPages } = await data.json()

      const pageNumbers = []
      let initPage = 0
      if (currentPage - 3 <= 0) {
        initPage = 0
      } else {
        initPage = currentPage - 3
      }

      for (let i = initPage; i <= nbPages - 1; i++) {
        if (i <= currentPage + 3 || i <= currentPage - 3) {
          pageNumbers.push(i)
        }
      }
      setNbPages(pageNumbers)

      const allJson = JSON.parse(localStorage.getItem('all'))
      if (allJson) {
        setPosts(allJson)
      } else {
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
      }

      setLoading(false)
      // setTotalPages(nbPages - 1)
    }

    fetchPost()
  }, [framework, faves, currentPage])

  useEffect(() => {
    const frameworkJson = JSON.parse(localStorage.getItem('framework'))
    if (frameworkJson) setFramework(frameworkJson)

    const favesJson = JSON.parse(localStorage.getItem('faves'))
    if (favesJson) setFaves(favesJson)
  }, [])

  let currentPosts = posts
  if (!listHandle) {
    currentPosts = faves
  }

  // FAVORITES CARDS AND ALL CARDS
  const handleFaves = (item) => {
    const arrayAuxPosts = posts
    const arrayAuxFaves = faves

    if (item.faves) {
      arrayAuxPosts.forEach(element => {
        if (element.objectID === item.objectID) {
          console.log("element.faves ==>", element.faves);
          element.faves = false
        }
      });
      localStorage.setItem('all', JSON.stringify(arrayAuxPosts))
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
  }

  // SELECT ANGULAR REACT VUE
  const handleFramework = (item) => {
    localStorage.setItem('framework', JSON.stringify(item))
    setFramework(item)
  }

  return (
    <div className="Front-End-Test---Home-view">
      <div className="Rectangle-2-Copy">
        <span className="HACKER-NEWS">
          HACKER NEWS
        </span>
      </div>

      <SelectList listHandle={listHandle} setListHandle={setListHandle} />

      <div>
        {
          loading ? (
            <div style={{ textAlign: 'center' }}>
              <div className="sp sp-3balls"></div>
            </div>
          ) : (
            <>
              <SelectFramework framework={framework} handleFramework={handleFramework} />
              <ContentList currentPosts={currentPosts} handleFaves={handleFaves} />
            </>
          )
        }
      </div>

      <Footer nbPages={nbPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default App;