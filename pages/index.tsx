import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import ImageCard from '../components/ImageCard'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>DGH</title>
        <meta name="description" content="DGH" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

  
       
          <ImageCard props={{image:'https://www.fillmurray.com/250/175'}}/>
        


    
    </div>
  )
}

export default Home
