import nookies from 'nookies'
import { verifyIdToken } from 'utils/db/firebaseAdmin'

const CandidateDashboard = ({ session }) => {
  if (session) {
    return <div className='max-w-screen-lg mx-auto'>hello</div>
  }
}

export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context)
    const token = await verifyIdToken(cookies.token)

    return {
      props: {
        session: { ...token },
      },
    }
  } catch (err) {
    context.res.writeHead(302, { location: '/sign-in' })
    context.res.end()
    return { props: [] }
  }
}

export default CandidateDashboard
