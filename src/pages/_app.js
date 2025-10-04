import '../styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Use logoLP.png as favicon */}
        <link rel="icon" href="/images/logoLP.png" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}