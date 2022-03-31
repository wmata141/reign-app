const SelectList = ({ listHandle, setListHandleFunction }) => {
    return (
        <div className="RectangleContent">
            <div className="Rectangle" onClick={() => setListHandleFunction(true)} style={listHandle ? { border: 'solid 1px #1797ff' } : {}}>
                <span className="All" >
                    All
                </span>
            </div>

            <div className="Rectangle" onClick={() => setListHandleFunction(false)} style={listHandle ? {} : { border: 'solid 1px #1797ff' }}>
                <span className="My-faves">
                    My faves
                </span>
            </div>
        </div>
    )
}

export default SelectList
