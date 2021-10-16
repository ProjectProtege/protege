import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { db } from 'utils/db'
import Link from 'next/link'

import Happy from 'assets/images/icons/happy'
import User from 'assets/images/icons/user'

const ApplicantCard = ({ application }) => {
  const router = useRouter()
  const [isFavorited, setIsFavorited] = useState(application.favorited)

  const { displayName } = router.query
  const { jobId } = router.query

  const favoriteCandidate = () => {
    db.collection('applications')
      .doc(application.id)
      .update({ favorited: !isFavorited })
      .then(setIsFavorited(!isFavorited))
  }

  return (
    <li
      className={`relative mb-4 px-4 py-2 bg-white shadow rounded-md border-l-6 ${
        application.viewed ? 'border-gray-400' : 'border-teal-500'
      }`}
    >
      <div className='flex items-center'>
        <div className='bg-blue-700 rounded-full w-12 mr-6'>
          <User className='h-full w-full text-teal-300 blur' />
        </div>

        <div className='w-full flex justify-between items-center'>
          <Link href={`/company/${displayName}/${jobId}/${application.id}`}>
            <a className='text-left'>
              <p className='font-bold'>Protege</p>
              <p className='blurry-text text-sm'>no.peeking@gmail.com</p>
              <p className='blurry-text text-sm'>dontlook.com</p>
            </a>
          </Link>
          <button onClick={favoriteCandidate} type='button'>
            <Happy
              className={`h-8 w-8 ${
                isFavorited ? 'text-teal-800' : 'text-gray-400'
              }`}
            />
          </button>
        </div>
      </div>
    </li>
  )
}

ApplicantCard.propTypes = {
  application: PropTypes.shape({
    id: PropTypes.string.isRequired,
    candidateId: PropTypes.string.isRequired,
    favorited: PropTypes.bool.isRequired,
    viewed: PropTypes.bool.isRequired,
  }).isRequired,
}

export default ApplicantCard
