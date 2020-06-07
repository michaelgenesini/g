import { AppProps } from 'next/app'
import { Layout } from '@/components/Layout'
import 'emoji-mart/css/emoji-mart.css'
import 'github-markdown-css'
import '@/style/global.css'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default App
