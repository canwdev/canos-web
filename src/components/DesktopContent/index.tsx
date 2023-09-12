import './style.scss'
import {useState} from "react";
import IconComputer from '../../assets/shell32/shell32.dll(16).png'
import IconRecycle from '../../assets/shell32/shell32.dll(32).png'
import IconControl from '../../assets/shell32/shell32.dll(22).png'

const MyComponent = () => {
  const [files, setFiles] = useState([{
    icon: IconComputer,
    name: 'My Computer'
  }, {
    icon: IconRecycle,
    name: 'Recycle Bin'
  }, {
    icon: IconControl,
    name: 'Control Panel'
  }])

  const handleIconClick = () => {
    alert(1)
  }

  return (
    <div className='desktop-content'>
      {
        files.map(item => {
          return <div className='desktop-icon-wrap' onClick={handleIconClick} key={item.name}>
            <div  className='desktop-icon'>
              <img className="desktop-icon-image" src={item.icon}></img>
              <div className="desktop-icon-name">{item.name}</div>
            </div>
          </div>
        })
      }
    </div>
  );
};

export default MyComponent;

