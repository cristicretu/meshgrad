import { SetStateAction, useCallback, useEffect, useState } from 'react'

// import { generateJSXMeshGradient } from 'meshgrad'

import Container from 'components/Container'
import cn from 'lib/classNames'

import { generateJSXMeshGradient } from '../../meshgrad'
import packageJSON from '../../meshgrad/package.json'

const ELEMENTS = 6

export default function Home() {
  const [isServer, setIsServer] = useState(true)
  const [elements, setElements] = useState(ELEMENTS)
  const [baseColor, setBaseColor] = useState('#BF40BF')
  const [seed, setSeed] = useState(1337)

  const [gradientStyle, setGradientStyle] = useState({})

  const randomizeBaseColor = () => {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16)
    const randomSeed = Math.floor(Math.random() * 10000)
    setSeed(randomSeed)
    setBaseColor(randomColor)
  }

  const updateGradient = useCallback(() => {
    setGradientStyle(
      generateJSXMeshGradient(elements, baseColor, seed, [
        '#F43A47',
        '#453A94',
        '#K43p1c',
      ])
    )
  }, [elements, baseColor, seed])

  useEffect(() => {
    updateGradient()
  }, [elements, baseColor, seed, updateGradient])

  const handleElementsChange = (event: { target: { value: any } }) => {
    setElements(Number(event.target.value))
  }

  const handleBaseColorChange = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setBaseColor(event.target.value)
  }

  const handleSeedChange = (event: { target: { value: any } }) => {
    setSeed(Number(event.target.value))
  }

  useEffect(() => {
    setIsServer(false)
  }, [])

  return (
    <Container>
      <div className='z-10 p-4 bg-white/10 backdrop-blur-md rounded-xl shadow-lg absolute left-4 top-8'>
        <div className='flex flex-col gap-4'>
          <label htmlFor='elements' className='flex flex-col'>
            Number of Elements:
            <input
              type='number'
              id='elements'
              value={elements}
              onChange={handleElementsChange}
              className='mt-1'
            />
          </label>

          <label htmlFor='baseColor' className='flex flex-col'>
            Base Color:
            <input
              type='color'
              id='baseColor'
              value={baseColor}
              onChange={handleBaseColorChange}
              className='mt-1'
            />
          </label>

          <label htmlFor='seed' className='flex flex-col'>
            Seed:
            <input
              type='number'
              id='seed'
              value={seed}
              onChange={handleSeedChange}
              className='mt-1'
            />
          </label>

          <button
            onClick={randomizeBaseColor}
            className='px-4 py-2 bg-sky-500 text-white rounded-md shadow-sm hover:bg-sky-400'
          >
            Randomize Color
          </button>
        </div>
      </div>

      <div className='relative inset-0 flex flex-col items-center justify-center gap-4'>
        <VersionBadge />
        <h1 className='font-semibold tracking-tighter text-7xl'>Meshgrad</h1>
        <p className='text-xl text-center text-tertiary'>
          A tiny utility for generating CSS Mesh Gradients.
        </p>
        <div className='flex flex-col items-center justify-center gap-4 mb-12 md:flex-row'>
          <InstallButton />
          <GitHubButton />
        </div>

        <div
          className='absolute w-[300px] h-[500px] md:w-[800px] md:h-[700px] mt-72 opacity-[12%] backdrop-blur-3xl blur-3xl pointer-events-none rounded-[15rem]'
          style={isServer ? {} : gradientStyle}
        />
        <div
          style={isServer ? {} : gradientStyle}
          className='z-10 w-64 h-64 rounded-xl'
        />
      </div>
      <Footer />
    </Container>
  )
}

function InstallButton() {
  const [copied, setCopied] = useState(false)

  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(`npm install meshgrad`)
          setCopied(true)
          setTimeout(() => {
            setCopied(false)
          }, 2000)
        } catch (e) {
          // sdas
        }
      }}
      className='flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-900 rounded-xl'
    >
      npm install meshgrad
      <span className='p-1.5 bg-gray-100 rounded-xl dark:bg-gray-800'>
        {copied ? <CopiedIcon /> : <CopyIcon />}
      </span>
    </button>
  )
}

function VersionBadge() {
  return (
    <span className='px-4 py-2 bg-gray-100 rounded-xl dark:bg-gray-900'>
      v{packageJSON.version}
    </span>
  )
}

function Footer() {
  return (
    <p className='mx-auto my-16 text-quaternary'>
      Crafted with care by
      <a
        className='ml-1 text-primary group'
        href='https://cretu.dev'
        target='_blank'
        rel='noopener noreferrer'
      >
        Cristian Crețu
        <span className='invisible ml-1 transition-opacity duration-100 ease-in-out group-hover:visible'>
          ↗
        </span>
      </a>
    </p>
  )
}

function CopiedIcon() {
  return (
    <svg
      width='16'
      height='16'
      strokeWidth='1.5'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M5 13L9 17L19 7'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg
      width='16'
      height='16'
      strokeWidth='1.5'
      viewBox='0 0 24 24'
      fill='none'
    >
      <path
        d='M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

function GitHubButton() {
  return (
    <a
      href='https://github.com/cristicretu/meshgrad'
      target='_blank'
      rel='noopener noreferrer'
      className='flex items-center gap-2 px-4 py-2.5 transition duration-200 hover:bg-gray-200 dark:hover:bg-gray-900 rounded-xl'
    >
      <svg
        width='14'
        height='14'
        viewBox='0 0 14 14'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M7 0.175049C3.128 0.175049 0 3.30305 0 7.17505C0 10.259 2.013 12.885 4.79 13.825C5.14 13.891 5.272 13.672 5.272 13.497V12.316C3.325 12.731 2.909 11.375 2.909 11.375C2.581 10.565 2.122 10.347 2.122 10.347C1.488 9.90905 2.166 9.93105 2.166 9.93105C2.866 9.97505 3.237 10.653 3.237 10.653C3.872 11.725 4.878 11.419 5.272 11.243C5.338 10.784 5.512 10.478 5.709 10.303C4.156 10.128 2.516 9.51605 2.516 6.84705C2.516 6.08105 2.778 5.46905 3.237 4.96605C3.172 4.79105 2.931 4.06905 3.303 3.10605C3.303 3.10605 3.893 2.90905 5.228 3.82805C5.79831 3.67179 6.38668 3.5911 6.978 3.58805C7.568 3.58805 8.181 3.67505 8.728 3.82805C10.063 2.93105 10.653 3.10605 10.653 3.10605C11.025 4.06905 10.784 4.79105 10.719 4.96605C11.179 5.44605 11.441 6.08105 11.441 6.84605C11.441 9.53705 9.8 10.128 8.247 10.303C8.487 10.522 8.728 10.937 8.728 11.593V13.519C8.728 13.716 8.859 13.934 9.209 13.847C11.988 12.884 14 10.259 14 7.17505C14 3.30305 10.872 0.175049 7 0.175049V0.175049Z'
          fill='currentColor'
        />
      </svg>
      cristicretu/meshgrad
    </a>
  )
}
