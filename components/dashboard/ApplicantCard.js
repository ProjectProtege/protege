import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { db } from 'utils/db'

import Happy from 'assets/images/icons/happy'
import User from 'assets/images/icons/user'

const ApplicantCard = ({ application }) => {
  const [candidate, setCandidate] = useState()
  const [isFavorited, setIsFavorited] = useState(application.favorited)

  useEffect(async () => {
    const candidateInfo = await db
      .collection('candidates')
      .doc(application.candidateId)
      .get()

    setCandidate(candidateInfo.data())
  }, [])

  const favoriteCandidate = async () => {
    await db
      .collection('applications')
      .doc(application.id)
      .update({ favorited: !isFavorited })

    setIsFavorited(!isFavorited)
  }

  return (
    <li className='mb-4 px-4 py-2 bg-white shadow rounded-md'>
      <div className='flex items-center'>
        <div className='bg-blue-700 rounded-full w-12 mr-6'>
          <User className='h-full w-full text-teal-300 blur' />
        </div>

        <div className='w-full flex justify-between items-center'>
          <div>
            <p className='font-bold'>Protege</p>
            <p className='blurry-text text-sm'>no.peeking@gmail.com</p>
            <p className='blurry-text text-sm'>dontlook.com</p>
          </div>
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
  }).isRequired,
}

export default ApplicantCard
