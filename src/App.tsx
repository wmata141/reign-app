import React, { useEffect, useState } from 'react'
import SelectList from './components/SelectList'
import SelectFramework from './components/SelectFramework'
import ContentList from './components/ContentList'
import Footer from './components/Footer'

interface Post {
  author: string;
  created_at: string;
  objectID: string;
  story_title: string;
  faves: boolean;
}

function App() {
  const [framework, setFramework] = useState({ img: null, name: 'Select your News:' });
  const [posts, setPosts] = useState<Post[]>([]);
  const [faves, setFaves] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [listHandle, setListHandle] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(0);
  // const [totalPages, setTotalPages] = useState(0);
  const [nbPages, setNbPages] = useState<number[]>([])

  useEffect(() => {
    // GET INFORMATION FROM THE API     
    const fetchPost = async () => {
      const frameworkJson = JSON.parse(localStorage.getItem('framework') || '{}')
      
      let data
      if (Object.keys(frameworkJson).length > 0) {
        data = await fetch(`https://hn.algolia.com/api/v1/search_by_date?query=${frameworkJson.name}&page=${currentPage}`)
      } else {
        data = await fetch(`https://hn.algolia.com/api/v1/search_by_date?query=${framework.name}&page=${currentPage}`)
      }

      const { hits, nbPages } = await data.json()

      const pageNumbers: number[] = [];
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

      const allJson = JSON.parse(localStorage.getItem(`all ${framework.name}`) || '{}')

      if (Object.keys(allJson).length > 0) {        
        setPosts(allJson)
      } else {
        const arrayAll: any[] = []
        
        hits.forEach(element => {
          const result = faves.find(item => item.objectID === element.objectID);

          if (result) {
            arrayAll.push(result)
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
    const frameworkJson = JSON.parse(localStorage.getItem('framework') || '{}')
    if (Object.keys(frameworkJson).length > 0) setFramework(frameworkJson)

    const favesJson = JSON.parse(localStorage.getItem(`faves ${framework.name}`) || '{}')
    if (Object.keys(favesJson).length > 0) {
      setFaves(favesJson)
    } else {
      setFaves([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          element.faves = false
        }
      });
      localStorage.setItem(`all ${framework.name}`, JSON.stringify(arrayAuxPosts))
      setPosts(arrayAuxPosts)

      const result = arrayAuxFaves.filter(f => f.objectID !== item.objectID);
      localStorage.setItem(`faves ${framework.name}`, JSON.stringify(result))
      setFaves(result)
    } else {
      arrayAuxPosts.forEach(element => {
        if (element.objectID === item.objectID) {
          element.faves = true
        }
      });
      localStorage.setItem(`all ${framework.name}`, JSON.stringify(arrayAuxPosts))      
      
      setPosts(arrayAuxPosts)

      item.faves = true
      arrayAuxFaves.push(item)

      let hash = {};
      const result = arrayAuxFaves.filter(o => hash[o.objectID] ? false : hash[o.objectID] = true);
      localStorage.setItem(`faves ${framework.name}`, JSON.stringify(result))
      setFaves(result)
    }
  }

  // SELECT ANGULAR REACT VUE
  const handleFramework = (item) => {
    localStorage.setItem('framework', JSON.stringify(item))
    setFramework(item)

    const favesJson = JSON.parse(localStorage.getItem(`faves ${item.name}`) || '{}')
    if (Object.keys(favesJson).length > 0) {
      setFaves(favesJson)
    } else {
      setFaves([])
    }
  }

  const setListHandleFunction = (flag) => {
    setListHandle(flag)
    const favesJson = JSON.parse(localStorage.getItem(`faves ${framework.name}`) || '{}')
    if (Object.keys(favesJson).length > 0) {
      setFaves(favesJson)
    } else {
      setFaves([])
    }
  }

  // localStorage.clear()
  return (
    <div className="Front-End-Test---Home-view">
      <div className="Rectangle-2-Copy">
        <span className="HACKER-NEWS">
          HACKER NEWS
        </span>
      </div>

      <SelectList listHandle={listHandle} setListHandleFunction={setListHandleFunction} />

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