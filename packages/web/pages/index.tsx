import { useEffect, useState } from 'react'

import { cssLanguage } from '@codemirror/lang-css'
import { githubDark, githubLight } from '@uiw/codemirror-theme-github'
import CodeMirror from '@uiw/react-codemirror'
import Container from 'components/Container'
import { useTheme } from 'next-themes'

import { generateMeshGradient } from '../lib/index'

const ELEMENTS = 6

export default function Home() {
  const { resolvedTheme } = useTheme()
  const [isServer, setIsServer] = useState(true)
  const [history, setHistory] = useState([generateMeshGradient(ELEMENTS)])
  const [index, setIndex] = useState(0)

  const handleNewGradient = () => {
    setIndex(history.length)
    setHistory([...history, generateMeshGradient(ELEMENTS)])
  }

  useEffect(() => {
    setIsServer(false)
  }, [])

  return (
    <Container>
      <div className='flex flex-col items-center justify-center inset-0 gap-4'>
        <h1 className='text-7xl tracking-tighter font-semibold'>Meshgrad</h1>
        <p className='text-tertiary text-xl'>
          A tiny utility for generating CSS Mesh Gradients.
        </p>
        <button
          onMouseDownCapture={() => handleNewGradient()}
          className='text-tertiary hover:text-sky-500 transition'
        >
          Try it here
        </button>
        <div
          style={isServer ? {} : history[index]}
          className='w-48 h-48 rounded-xl'
        />
        <CodeMirror
          readOnly={true}
          contentEditable={false}
          className='w-full'
          theme={resolvedTheme === 'dark' ? githubDark : githubLight}
          lang='css'
          extensions={[cssLanguage]}
          value={JSON.stringify(history[index], null, 2)}
          height='200px'
        />
        <div className='flex gap-4'>
          <button
            onClick={() => {
              if (index > 0) {
                setIndex(index - 1)
              }
            }}
            className='group text-tertiary hover:text-sky-600 transition ease-in-out duration-200'
          >
            <span
              aria-hidden='true'
              className='inline-block translate-x-0 group-hover:-translate-x-1 mr-1 transition-transform ease-in-out duration-200'
            >
              ←
            </span>
            Previous
          </button>

          <button
            onClick={() => {
              if (index < history.length - 1) {
                setIndex(index + 1)
              }
            }}
            className='group text-tertiary hover:text-sky-600 transition ease-in-out duration-200'
          >
            Next
            <span
              aria-hidden='true'
              className='inline-block translate-x-0 group-hover:translate-x-1 ml-1 transition-transform ease-in-out duration-200'
            >
              →
            </span>
          </button>
        </div>
      </div>
    </Container>
  )
}
