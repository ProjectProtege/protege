// React/Next imports
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import nookies from 'nookies'
import { verifyIdToken } from 'utils/db/firebaseAdmin'

// Lib imports
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import 'react-quill/dist/quill.snow.css'
import { v4 as uuidv4 } from 'uuid'
import toast from 'react-hot-toast'

import { db } from 'utils/db'
import { useAuth } from 'store/AuthContext'
import { useProfileInfo } from 'store/profile_info'
import { useTags } from 'store/tags_store'
import AccountInteriorLayout from 'layouts/AccountInteriorLayout'
import VerifyEmail from 'components/dashboard/VerifyEmail'

import getText from 'utils/i18n/Texts'

import timezones from 'data/timezones.json'

import { WithContext as ReactTags } from 'react-tag-input'

const CandidateEditProfile = ({ session }) => {
  const router = useRouter()
  const { currentUser } = useAuth()
  // const [error, setError] = useState(null)
  const [timezonesArray, setTimezonesArray] = useState([])

  const [techArray, setTechArray] = useState([])

  const [projectItemName, setProjectItemName] = useState('')
  const [projectItemUrl, setProjectItemUrl] = useState('')
  const [projectsArray, setProjectsArray] = useState([])

  const profileInfo = useProfileInfo((s) => s.profileInfo)
  const tags = useTags((s) => s.tags)

  useEffect(() => {
    setTimezonesArray(timezones)

    async function fetchTech() {
      await db
        .collection('candidates')
        .where('userUid', '==', currentUser.userUid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setTechArray(doc.data().tech ?? [])
          })
        })
    }

    async function fetchProjects() {
      await db
        .collection('candidates')
        .where('userUid', '==', currentUser.userUid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setProjectsArray(doc.data().projects ?? [])
          })
        })
    }

    fetchTech()
    fetchProjects()
  }, [])

  const Schema = Yup.object().shape({
    firstName: Yup.string().required(getText('GLOBAL', 'FIRST_NAME_REQUIRED')),
    lastName: Yup.string().required(getText('GLOBAL', 'LAST_NAME_REQUIRED')),
    email: Yup.string()
      .email(getText('GLOBAL', 'EMAIL_VALID'))
      .required(getText('GLOBAL', 'EMAIL_REQUIRED')),
    timezone: Yup.string(),
    timeframe_from: Yup.string(),
    timeframe_to: Yup.string(),
    question1: Yup.string().required(getText('GLOBAL', 'QUESTION_REQUIRED')),
    question2: Yup.string().required(getText('GLOBAL', 'QUESTION_REQUIRED')),
    question3: Yup.string().required(getText('GLOBAL', 'QUESTION_REQUIRED')),
  })

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
    defaultValues: {
      firstName: profileInfo?.firstName ? profileInfo.firstName : '',
      lastName: profileInfo?.lastName ? profileInfo.lastName : '',
      email: profileInfo?.email ? profileInfo.email : '',
      portfolio: profileInfo?.portfolio ? profileInfo.portfolio : '',
      social_dev: profileInfo?.social_dev ? profileInfo.social_dev : '',
      social_github: profileInfo?.social_github
        ? profileInfo.social_github
        : '',
      social_linkedin: profileInfo?.social_linkedin
        ? profileInfo.social_linkedin
        : '',
      social_twitter: profileInfo?.social_twitter
        ? profileInfo.social_twitter
        : '',
      timezone: profileInfo?.timezone ? profileInfo.timezone : '',
      timeframe_from: profileInfo?.timeframe_from
        ? profileInfo.timeframe_from
        : '',
      timeframe_to: profileInfo?.timeframe_to ? profileInfo.timeframe_to : '',
      question1: profileInfo?.question1 ? profileInfo.question1 : '',
      question2: profileInfo?.question2 ? profileInfo.question2 : '',
      question3: profileInfo?.question3 ? profileInfo.question3 : '',
    },
  })

  const addToArray = (arrayType, array) => {
    if (arrayType === 'tech') {
      db.collection('candidates')
        .doc(profileInfo.userUid)
        .update({
          tech: array,
        })
        .then(() => {
          toast.success(`Item ${getText('GLOBAL', 'TECH_ARRAY_ADD_SUCCESS')}`)
        })
        .catch((err) => {
          toast.error(getText('GLOBAL', 'TECH_ARRAY_ADD_ERROR') + err.message)
        })
    } else {
      db.collection('candidates')
        .doc(profileInfo.userUid)
        .update({
          projects: array,
        })
        .then(() => {
          toast.success(
            `${projectItemName} ${getText(
              'GLOBAL',
              'PROJECT_ARRAY_ADD_SUCCESS'
            )}`
          )
        })
        .catch((err) => {
          toast.error(
            getText('GLOBAL', 'PROJECT_ARRAY_ADD_ERROR') + err.message
          )
        })
    }
  }

  const removeFromArray = (arrayType, array) => {
    if (arrayType === 'tech') {
      db.collection('candidates')
        .doc(profileInfo.userUid)
        .update({
          tech: array,
        })
        .then(() => {
          toast.success(
            `Item ${getText('GLOBAL', 'TECH_ARRAY_REMOVE_SUCCESS')}`
          )
        })
        .catch((err) => {
          toast.error(
            getText('GLOBAL', 'TECH_ARRAY_REMOVE_ERROR') + err.message
          )
        })
    } else {
      db.collection('candidates')
        .doc(profileInfo.userUid)
        .update({
          projects: array,
        })
        .then(() => {
          toast.success(
            `Item ${getText('GLOBAL', 'PROJECT_ARRAY_REMOVE_SUCCESS')}`
          )
        })
        .catch((err) => {
          toast.error(
            getText('GLOBAL', 'PROJECT_ARRAY_REMOVE_ERROR') + err.message
          )
        })
    }
  }

  const addTech = (tech) => {
    try {
      setTechArray([...techArray, tech])
      addToArray('tech', [...techArray, tech])
    } catch (e) {
      toast.error('Oops! Something went wrong.')
    }
  }

  const deleteTech = (i) => {
    const newTechArray = techArray.filter((tag, index) => index !== i)
    setTechArray(newTechArray)
    removeFromArray('tech', newTechArray)
  }

  const saveProjectName = (e) => {
    setProjectItemName(e.target.value)
  }

  const saveProjectUrl = (e) => {
    setProjectItemUrl(e.target.value)
  }

  const addProject = () => {
    setProjectsArray([
      ...projectsArray,
      { id: uuidv4(), projectItemName, projectItemUrl },
    ])
    addToArray('projects', [
      ...projectsArray,
      { id: uuidv4(), projectItemName, projectItemUrl },
    ])
    setProjectItemName('')
    setProjectItemUrl('')
  }

  const deleteProject = (i) => {
    console.log(i)
    const newProjectArray = projectsArray.filter((el, index) => index !== i)
    setProjectsArray(newProjectArray)
    removeFromArray('projects', newProjectArray)
  }

  const handleProfileForm = (data) => {
    db.collection('candidates')
      .doc(profileInfo.userUid)
      .update({
        accountType: 'candidate',
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        portfolio: data.portfolio,
        social_dev: data.social_dev,
        social_github: data.social_github,
        social_linkedin: data.social_linkedin,
        social_twitter: data.social_twitter,
        timezone: data.timezone,
        timeframe_from: data.timeframe_from,
        timeframe_to: data.timeframe_to,
        // tech: techArray,
        // projects: projectsArray,
        question1: data.question1,
        question2: data.question2,
        question3: data.question3,
      })
      .then(() => {
        router.push(`/candidate/${profileInfo.slug}/dashboard`)
      })
      .catch((err) => {
        throw new Error('Error writing document: ', err)
      })
  }

  if (session) {
    return (
      <>
        <AccountInteriorLayout>
          {currentUser?.emailVerified ? (
            <>
              <div className='flex items-center mb-6'>
                <h1 className='text-xl text-blue-900 mr-4'>
                  {getText('GLOBAL', 'PROFILE_INFO')}
                </h1>
                <span className='text-sm text-teal-600'> * required</span>
              </div>

              <form
                autoComplete='on'
                onSubmit={handleSubmit(handleProfileForm)}
                className='mb-6'
              >
                {/* name */}
                <div className='grid-cols-2 gap-8 md:grid'>
                  <div className='flex flex-col w-full mb-3'>
                    <label htmlFor='firstName'>
                      {getText('GLOBAL', 'FIRST_NAME')}
                      <span className='text-teal-600'> *</span>
                    </label>
                    <input
                      id='firstName'
                      type='text'
                      name='firstName'
                      className='input'
                      ref={register}
                    />
                    {errors.firstName ? (
                      <p className='input-error'>
                        {errors.firstName && errors.firstName.message}
                      </p>
                    ) : null}
                  </div>

                  <div className='flex flex-col w-full mb-3'>
                    <label htmlFor='lastName'>
                      {getText('GLOBAL', 'LAST_NAME')}
                      <span className='text-teal-600'> *</span>
                    </label>
                    <input
                      id='lastName'
                      type='text'
                      name='lastName'
                      className='input'
                      ref={register}
                    />
                    {errors.lastName ? (
                      <p className='input-error'>
                        {errors.lastName && errors.lastName.message}
                      </p>
                    ) : null}
                  </div>
                </div>

                {/* email/portfolio */}
                <div className='grid-cols-2 gap-8 mb-12 md:grid'>
                  <div className='flex flex-col w-full mb-3 '>
                    <label htmlFor='email'>
                      {getText('GLOBAL', 'EMAIL')}
                      <span className='text-teal-600'> *</span>
                    </label>
                    <input
                      id='email'
                      type='text'
                      name='email'
                      className='input'
                      ref={register}
                    />
                    {errors.email ? (
                      <p className='input-error'>
                        {errors.email && errors.email.message}
                      </p>
                    ) : null}
                  </div>

                  <div className='flex flex-col w-full mb-3 '>
                    <label htmlFor='portfolio'>
                      {getText('GLOBAL', 'PORTFOLIO')}
                      <span className='text-teal-600'> *</span>
                    </label>
                    <input
                      id='portfolio'
                      type='text'
                      name='portfolio'
                      className='input'
                      ref={register}
                    />
                  </div>
                </div>

                {/* social/timezone */}
                <div className='grid-cols-2 gap-8 mb-12 md:grid'>
                  <div className='mb-6 md:mb-0'>
                    <label htmlFor='social'>
                      {getText('GLOBAL', 'SOCIAL_ACCOUNTS')}
                    </label>

                    <div className='flex items-center my-2 mb-4'>
                      <div className='mr-4 text-3xl opacity-50'>
                        <i className='fab fa-dev' />
                      </div>
                      <input
                        type='text'
                        name='social_dev'
                        className='w-full input'
                        ref={register}
                      />
                    </div>

                    <div className='flex items-center mb-4'>
                      <div className='mr-3 text-3xl opacity-50'>
                        <i className='fab fa-github' />
                      </div>
                      <input
                        type='text'
                        name='social_github'
                        className='w-full input '
                        ref={register}
                      />
                    </div>

                    <div className='flex items-center mb-4'>
                      <div className='mr-4 text-3xl opacity-50'>
                        <i className='fab fa-linkedin' />
                      </div>
                      <input
                        type='text'
                        name='social_linkedin'
                        className='w-full input '
                        ref={register}
                      />
                    </div>

                    <div className='flex items-center mb-4'>
                      <div className='mr-3 text-3xl opacity-50'>
                        <i className='fab fa-twitter' />
                      </div>
                      <input
                        type='text'
                        name='social_twitter'
                        className='w-full input '
                        ref={register}
                      />
                    </div>
                  </div>

                  <div className='flex flex-col w-full'>
                    {/* timezone */}
                    <div className='flex flex-col w-full mb-8'>
                      <label htmlFor='timezone'>
                        {getText('GLOBAL', 'TIMEZONE')}
                      </label>
                      <div className='select-wrap'>
                        <select
                          id='timezone'
                          type='text'
                          name='timezone'
                          className='w-full input input-select'
                          ref={register}
                        >
                          {profileInfo?.timezone ? (
                            <option
                              value={profileInfo.timezone}
                              className='text-gray-300'
                            >
                              {profileInfo.timezone}
                            </option>
                          ) : (
                            <option value={getText('GLOBAL', 'SELECT')}>
                              {getText('GLOBAL', 'SELECT')}
                            </option>
                          )}

                          {timezonesArray.map((timezone, index) => {
                            return (
                              <option
                                key={index}
                                value={timezone.text}
                                className='text-gray-300'
                              >
                                {timezone.text}
                              </option>
                            )
                          })}
                        </select>
                      </div>
                      {errors.timezone ? (
                        <p className='input-error'>
                          {errors.timezone && errors.timezone.message}
                        </p>
                      ) : null}
                    </div>

                    {/* timeframe */}
                    <div className='flex flex-col w-full'>
                      <label htmlFor='timeframe'>
                        {getText('GLOBAL', 'WORK_WITHIN')}
                      </label>

                      <div className='grid grid-cols-2 gap-6'>
                        <div className='flex flex-col w-full '>
                          <div className='select-wrap'>
                            <select
                              id='timeframe_from'
                              type='text'
                              name='timeframe_from'
                              className='input input-select'
                              ref={register}
                            >
                              {!profileInfo?.timeframe_from ? (
                                <option value='' className='text-gray-300'>
                                  {getText('GLOBAL', 'FROM')}
                                </option>
                              ) : (
                                <option
                                  value={profileInfo.timeframe_from}
                                  className='text-gray-300'
                                >
                                  {profileInfo.timeframe_from}
                                </option>
                              )}

                              {timezonesArray.map((timezone, index) => {
                                return (
                                  <option
                                    key={index}
                                    value={timezone.text}
                                    className='text-gray-300'
                                  >
                                    {timezone.text}
                                  </option>
                                )
                              })}
                            </select>
                          </div>
                          {errors.timeframe_from ? (
                            <p className='input-error'>
                              {errors.timeframe_from &&
                                errors.timeframe_from.message}
                            </p>
                          ) : null}
                        </div>

                        <div className='flex flex-col w-full '>
                          <div className='select-wrap'>
                            <select
                              id='timeframe_to'
                              type='text'
                              name='timeframe_to'
                              className='input input-select'
                              ref={register}
                            >
                              {!profileInfo?.timeframe_to ? (
                                <option value='' className='text-gray-300'>
                                  {getText('GLOBAL', 'TO')}
                                </option>
                              ) : (
                                ''
                              )}

                              {timezonesArray.map((timezone, index) => {
                                return (
                                  <option
                                    key={index}
                                    value={timezone.text}
                                    className='text-gray-300'
                                  >
                                    {timezone.text}
                                  </option>
                                )
                              })}
                            </select>
                          </div>

                          {errors ? (
                            <p className='input-error'>
                              {errors.timeframe_to &&
                                errors.timeframe_to.message}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* tech used/projects */}
                <div className='grid-cols-2 gap-8 mb-12 md:grid'>
                  <div className='flex flex-col w-full mb-3'>
                    <label htmlFor='tech'>
                      {getText('GLOBAL', 'TECH_USED')}
                    </label>
                    <div className='flex items-center space-x-6'>
                      <ReactTags
                        tags={techArray}
                        suggestions={tags}
                        handleAddition={addTech}
                        handleDelete={deleteTech}
                        inputFieldPosition='top'
                        autocomplete
                        allowDragDrop={false}
                        className='w-full'
                      />
                    </div>
                  </div>

                  <div className='flex flex-col w-full mb-3'>
                    <div className='flex flex-col items-end space-y-4'>
                      <div className='w-full space-y-2'>
                        <label htmlFor='projectName'>
                          {getText('GLOBAL', 'PROJECT_NAME')}
                        </label>
                        <input
                          type='text'
                          name='projectName'
                          className='w-full input'
                          onChange={saveProjectName}
                          value={projectItemName}
                        />
                      </div>
                      <div className='w-full space-y-2'>
                        <label htmlFor='projectUrl'>
                          {getText('GLOBAL', 'PROJECT_URL')}
                        </label>
                        <input
                          type='text'
                          name='projectUrl'
                          className='w-full input'
                          onChange={saveProjectUrl}
                          value={projectItemUrl}
                        />
                      </div>
                      <div className='flex items-start justify-between w-full'>
                        <button
                          type='button'
                          className='btn btn-blue order-last'
                          onClick={addProject}
                        >
                          Add
                        </button>
                        <ul className='flex flex-col mt-4 space-y-2'>
                          {projectsArray &&
                            projectsArray?.map((p, index) => (
                              <li className='text-gray-600' key={p.id}>
                                <button
                                  type='button'
                                  className='mr-4 font-bold text-gray-500'
                                  onClick={() => deleteProject(index)}
                                >
                                  x{' '}
                                  <span className='sr-only'>
                                    Delete {p.projectItemName}
                                  </span>
                                </button>
                                <a
                                  href={p.projectItemUrl}
                                  className='text-teal-600'
                                >
                                  {p.projectItemName}
                                </a>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* question1 */}
                <div className='flex flex-col w-full mb-10 space-y-3'>
                  <label htmlFor='question1'>
                    {getText('GLOBAL', 'QUESTION1')}
                    <span className='text-teal-600'> *</span>
                  </label>
                  <textarea
                    name='question1'
                    id='question1'
                    className='input'
                    cols='30'
                    rows='5'
                    ref={register}
                  />
                  {errors ? (
                    <p className='input-error'>
                      {errors.question1 && errors.question1.message}
                    </p>
                  ) : null}
                </div>

                {/* question2 */}
                <div className='flex flex-col w-full mb-10 space-y-3'>
                  <label htmlFor='question2'>
                    {getText('GLOBAL', 'QUESTION2')}
                    <span className='text-teal-600'> *</span>
                  </label>
                  <textarea
                    name='question2'
                    id='question2'
                    className='input'
                    cols='30'
                    rows='5'
                    ref={register}
                  />
                  {errors ? (
                    <p className='input-error'>
                      {errors.question2 && errors.question2.message}
                    </p>
                  ) : null}
                </div>

                {/* question3 */}
                <div className='flex flex-col w-full mb-4 space-y-3'>
                  <label htmlFor='question3'>
                    {getText('GLOBAL', 'QUESTION3')}
                    <span className='text-teal-600'> *</span>
                  </label>
                  <textarea
                    name='question3'
                    id='question3'
                    className='input'
                    cols='30'
                    rows='5'
                    ref={register}
                  />
                  {errors ? (
                    <p className='input-error'>
                      {errors.question3 && errors.question3.message}
                    </p>
                  ) : null}
                </div>

                <button type='submit' className='btn btn-teal'>
                  {getText('GLOBAL', 'SAVE')}
                </button>

                {/* {error ? (
            <p className='p-3 mt-6 text-lg text-center text-red-500 bg-red-100 rounded-md'>
              {error}
            </p>
          ) : null} */}
              </form>
            </>
          ) : (
            <VerifyEmail />
          )}
        </AccountInteriorLayout>
      </>
    )
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

export default CandidateEditProfile
