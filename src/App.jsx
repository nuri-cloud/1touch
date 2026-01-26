import { RouterProvider } from 'react-router-dom'
import './App.scss'
import { Myrouter } from './router.jsx'

function App() {
  return (
    <>
     <RouterProvider router={Myrouter}/>
    </>
  )
}

export default App
