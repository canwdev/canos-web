import './style.scss'
const MyComponent = ({children}) => {
  return (
    <div className='desktop-wallpaper'>
      {children}
    </div>
  );
};

export default MyComponent;
