import { useAuth } from 'store/AuthContext'

const CompanyEditProfile = () => {
  const { currentUser } = useAuth()

  console.log(currentUser)
  return (
    <div className='max-w-2xl mx-auto'>
      <h1 className='mb-3 text-2xl text-blue-900'>Company Edit Profile</h1>
    </div>
  )
}

export default CompanyEditProfile
