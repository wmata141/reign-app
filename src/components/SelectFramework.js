import AngularImg from '../assets/images/image-138.png'
import ReactImg from '../assets/images/image-140.png'
import VueImg from '../assets/images/image-141.png'

// DATA SELECT FROM FRAMEWORK 
const frameworkList = [
    { img: AngularImg, name: 'angular' },
    { img: ReactImg, name: 'react' },
    { img: VueImg, name: 'vue' }
]

const SelectFramework = ({ framework, handleFramework }) => {
    return (
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
    )
}

export default SelectFramework
