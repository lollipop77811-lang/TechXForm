import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8">
      <div className="flex gap-6 items-center mb-8">
        <img src={viteLogo} className="w-20" alt="Vite logo" />
        <img src={reactLogo} className="w-20" alt="React logo" />
      </div>
      <h1 className="text-4xl font-bold mb-4">Vite + React + Tailwind</h1>
      <button
        className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 transition-colors mb-6 cursor-pointer"
        onClick={() => setCount((count) => count + 1)}
      >
        Count is {count}
      </button>
      <p className="text-gray-400">
        Edit <code className="bg-gray-800 px-2 py-1 rounded">src/App.jsx</code> and save
      </p>
    </div>
  )
}

export default App
