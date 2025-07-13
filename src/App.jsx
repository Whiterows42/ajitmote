import { useState } from 'react'

import './App.css'
import Lanyard from './Lanyard'
import AdvancedTerminal from './AdvancedTerminal'
import LoadingScreen from './LoadingScreen'

function App() {
  const [count, setCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />
  }

  return (
    <div className="app-container">
      <div className="left-panel">
        <div className="card-container">
          <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
        </div>
        
        {/* Circular Text */}
        <div className="circular-text">
          <svg viewBox="0 0 120 120">
            <defs>
              <path
                id="circle"
                d="M 60, 60 m -50, 0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0"
              />
            </defs>
            <text fontSize="12" fill="#ffffff" opacity="1">
              <textPath href="#circle" startOffset="0%">
                • FULL STACK DEVELOPER • REACT.JS • JAVA • .NET • PORTFOLIO •
              </textPath>
            </text>
          </svg>
        </div>
      </div>
      
      <div className="right-panel">
        <AdvancedTerminal />
      </div>
    </div>
  )
}

export default App
