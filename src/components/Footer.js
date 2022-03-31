const Footer = ({ nbPages, currentPage, setCurrentPage }) => {
  return (
    <nav className="footer">
      <ul className='pagination'>
        {/* <a onClick={() => setCurrentPage(0)} href="!#" className="Rectangle-3-Copy-33">
              {'<<'}
            </a>
            <a onClick={() => setCurrentPage(currentPage - 1)} href="!#" className="Rectangle-3-Copy-33">
              {'<'}
            </a> */}
        {nbPages.map(number => (
          <a key={number} onClick={() => setCurrentPage(number)} href="!#" className={number === currentPage ? "Rectangle-3-Copy-33-active" : "Rectangle-3-Copy-33"}>
            {number}
          </a>
        ))}
        {/* <a onClick={() => setCurrentPage(currentPage + 1)} href="!#" className="Rectangle-3-Copy-33">
              {'>'}
            </a>
            <a onClick={() => setCurrentPage(totalPages)} href="!#" className="Rectangle-3-Copy-33">
              {'>>'}
            </a> */}
      </ul>
    </nav>
  )
}

export default Footer