import { useEffect, useState } from 'react'

import { useTheme } from 'next-themes'

const ExternalLink = ({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) => (
  <a
    className='text-tertiary hover:text-primary transition'
    target='_blank'
    rel='noopener noreferrer'
    href={href}
  >
    {children}
  </a>
)

export default function Footer() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className='flex flex-col items-center'>
      <hr className='w-full border-1 border-gray-100 dark:border-gray-900 mb-8' />
      <div className='w-full max-w-2xl grid grid-cols-1 gap-4 sm:grid-cols-3'>
        <div className='flex flex-col space-y-4'>
          <ExternalLink href='https://github.com/cristicretu/meshgrad'>
            npm
          </ExternalLink>
        </div>
        <div className='flex flex-col space-y-4'>
          <ExternalLink href='https://github.com/cristicretu/meshgrad'>
            GitHub
          </ExternalLink>
          <ExternalLink href='https://twitter.com/cristicrtu'>
            Twitter
          </ExternalLink>
        </div>
        <div className='flex flex-col space-y-4'>
          {mounted && resolvedTheme === 'light' ? (
            <button
              onClick={() => setTheme('dark')}
              className='text-tertiary hover:text-primary transition'
            >
              Change theme to dark
            </button>
          ) : (
            <button
              onClick={() => setTheme('light')}
              className='text-tertiary hover:text-primary transition'
            >
              Change theme to light
            </button>
          )}
        </div>
      </div>
      <p className='mx-auto my-16 text-quaternary'>
        Crafted with care by
        <a
          className='ml-1 text-primary group'
          href='https://cretu.dev'
          target='_blank'
          rel='noopener noreferrer'
        >
          Cristian Crețu
          <span className='ml-1 invisible group-hover:visible transition-all duration-200'>
            ↗
          </span>
        </a>
      </p>
    </div>
  )
}
