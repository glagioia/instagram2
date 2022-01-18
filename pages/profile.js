import Head from 'next/head'
import Header from "../components/Header"
import ProfileHeader from "../components/ProfileHeader"


function Profile() {
    return (
        <div className="bg-gray-50 h-screen">
            <Head>
                <title>Instagram 2.0</title>
                <link rel="icon" href="/logo.png" />
            </Head>

            <Header />

            <ProfileHeader />
        </div>
    )
}

export default Profile
