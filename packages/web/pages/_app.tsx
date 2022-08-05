import { ThemeProvider } from 'next-themes'
import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'

import 'styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute='class' disableTransitionOnChange>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
