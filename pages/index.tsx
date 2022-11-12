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

  
       
          <ImageCard props={{image:'https://www.fillmurray.com/250/175', displayTitle:'A picture of Bill Murray', description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi. Mauris ultrices eros in cursus. Laoreet non curabitur gravida arcu ac tortor. Nunc consequat interdum varius sit amet mattis. Porttitor rhoncus dolor purus non enim praesent elementum. Arcu non sodales neque sodales ut etiam sit amet. Eleifend quam adipiscing vitae proin sagittis nisl. Aenean vel elit scelerisque mauris pellentesque pulvinar.'}}/>
        


    
    </div>
  )
}

export default Home
