import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Button} from 'antd'
import {useSnapshot} from 'valtio'
import {counterStore} from './store'

function App() {
  const {count, setCount} = useSnapshot(counterStore)

  return (
    <div style={{padding: '10px', textAlign: 'center'}}>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React ({count})</h1>
      <div className="card">
        <Button type="primary" onClick={() => setCount(count + 1)}>
          count is {count}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </div>
  )
}

export default App
