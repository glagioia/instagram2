import { getProviders, signIn as SignIntoProvider } from 'next-auth/react'
import Header from '../../components/Header'

//Browser
function signIn({ providers }) {
    return (
        <>
            <Header />
            <div className='flex flex-col items-center justify-center min-h-screen py-2 -mt-56 text-center'>
                <img  className="w-80" src="/instagram.png" alt='' />
                <p className='text-md font-semibold italic '>this is not a REAL app, it is built for educational purposes only</p>
                <div className='mt-40'>
                    {Object.values(providers).map((provider) => (
                        <div key={provider.name}>
                            <button className='p-3 bg-gonza-violet-500 hover:bg-gonza-violet-700 rounded-lg text-white font-semibold' onClick={() => SignIntoProvider(provider.id, {callbackUrl:"/"})}>
                                Sign in with {provider.name}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}


//Server side render
export async function getServerSideProps() {
    const providers = await getProviders()
    return {
        props: {
            providers
        }
    }
}

export default signIn
