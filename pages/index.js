import Head from 'next/head'
import Header from '../components/Header'
import Feed from '../components/Feed'
import Modal from '../components/Modal'




export default function Home() {
  return (
    <div className="bg-gray-50 h-full">
      <Head>
        <title>Instagram 2.0</title>
        <link rel="icon" href="/logo.png" />
      </Head>
           
      <Header/>
    
      <Feed/>

      <Modal/>


    </div>
  )
}
