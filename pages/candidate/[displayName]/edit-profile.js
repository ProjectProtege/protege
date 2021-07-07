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
import AccountInteriorLayout from 'layouts/AccountInteriorLayout'
import Info from 'assets/images/icons/info'

import getText from 'utils/i18n/Texts'

import timezones from 'data/timezones.json'

const CandidateEditProfile = ({ session }) => {
  const router = useRouter()
  const { currentUser } = useAuth()
  // const [error, setError] = useState(null)
  const [timezonesArray, setTimezonesArray] = useState([])

  const [techItem, setTechItem] = useState('')
  const [techArray, setTechArray] = useState([])

  const [projectItemName, setProjectItemName] = useState('')
  const [projectItemUrl, setProjectItemUrl] = useState('')
  const [projectsArray, setProjectsArray] = useState([])

  const profileInfo = useProfileInfo((s) => s.profileInfo)

  useEffect(() => {
    setTimezonesArray(timezones)

    async function fetchTech() {
      await db
        .collection('candidates')
        .where('userUid', '==', currentUser.userUid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setTechArray(doc.data().tech)
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
            setProjectsArray(doc.data().projects)
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
    timezone: Yup.string().required(getText('GLOBAL', 'TIMEZONE_REQUIRED')),
    timeframe_from: Yup.string().required(
      getText('GLOBAL', 'TIMEFRAME_REQUIRED')
    ),
    timeframe_to: Yup.string().required(
      getText('GLOBAL', 'TIMEFRAME_REQUIRED')
    ),
    projectUrl: Yup.string().when('projectName', (projectName) => {
      if (projectName)
        return Yup.string().required(getText('GLOBAL', 'PROJECTURL_REQUIRED'))
    }),
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
          toast.success(
            `${techItem} ${getText('GLOBAL', 'TECH_ARRAY_ADD_SUCCESS')}`
          )
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

  const removeFromArray = (arrayType, item, array) => {
    if (arrayType === 'tech') {
      db.collection('candidates')
        .doc(profileInfo.userUid)
        .update({
          tech: array,
        })
        .then(() => {
          toast.success(
            `${item} ${getText('GLOBAL', 'TECH_ARRAY_REMOVE_SUCCESS')}`
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
            `${item} ${getText('GLOBAL', 'PROJECT_ARRAY_REMOVE_SUCCESS')}`
          )
        })
        .catch((err) => {
          toast.error(
            getText('GLOBAL', 'PROJECT_ARRAY_REMOVE_ERROR') + err.message
          )
        })
    }
  }

  const saveTech = (e) => {
    setTechItem(e.target.value)
  }

  const addTech = () => {
    setTechArray([...techArray, { id: uuidv4(), techItem }])
    addToArray('tech', [...techArray, { id: uuidv4(), techItem }])
    setTechItem('')
  }

  const deleteTech = (id, item) => {
    const newTechArray = techArray.filter((el) => el.id !== id)
    setTechArray(newTechArray)
    removeFromArray('tech', item, newTechArray)
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

  const deleteProject = (id, item) => {
    const newProjectArray = projectsArray.filter((el) => el.id !== id)
    setProjectsArray(newProjectArray)
    removeFromArray('projects', item, newProjectArray)
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
          <div className='flex items-center justify-between mb-6'>
            <h1 className='mb-3 text-lg text-blue-900'>
              {getText('GLOBAL', 'PROFILE_INFO')}
            </h1>
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
                </label>
                <input
                  id='firstName'
                  type='text'
                  name='firstName'
                  className='input'
                  ref={register}
                />
                {errors.firstName ? (
                  <p className='input-error' data-cy='firstName-error'>
                    {errors.firstName && errors.firstName.message}
                  </p>
                ) : null}
              </div>

              <div className='flex flex-col w-full mb-3'>
                <label htmlFor='lastName'>
                  {getText('GLOBAL', 'LAST_NAME')}
                </label>
                <input
                  id='lastName'
                  type='text'
                  name='lastName'
                  className='input'
                  ref={register}
                />
                {errors.lastName ? (
                  <p className='input-error' data-cy='lastName-error'>
                    {errors.lastName && errors.lastName.message}
                  </p>
                ) : null}
              </div>
            </div>

            {/* email/portfolio */}
            <div className='grid-cols-2 gap-8 mb-12 md:grid'>
              <div className='flex flex-col w-full mb-3 '>
                <label htmlFor='email'>{getText('GLOBAL', 'EMAIL')}</label>
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
                  <span className='text-sm font-normal'> (optional)</span>
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
                  <span className='text-sm font-normal'> (optional)</span>
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
                      <option value={getText('GLOBAL', 'SELECT')}>
                        {getText('GLOBAL', 'SELECT')}
                      </option>

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
                      <label htmlFor='timeframe_from' className='sr-only'>
                        {getText('GLOBAL', 'FROM')}
                      </label>
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
                      <label htmlFor='timeframe_to' className='sr-only'>
                        {getText('GLOBAL', 'TO')}
                      </label>
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
                          {errors.timeframe_to && errors.timeframe_to.message}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* tech used/projects */}
            <div className='grid-cols-2 gap-8 mb-12 md:grid'>
              <div className='flex flex-col w-full mb-3 space-y-4'>
                <div className='flex items-end justify-between'>
                  <div className='flex-grow mr-4 space-y-2'>
                    <label htmlFor='tech'>
                      {getText('GLOBAL', 'TECH_USED')}
                      <span className='text-sm font-normal'>
                        {' '}
                        (optional) <Info />
                      </span>
                    </label>
                    <input
                      id='tech'
                      type='text'
                      name='tech'
                      className='w-full input'
                      ref={register}
                      onChange={saveTech}
                      value={techItem}
                    />
                  </div>
                  <button
                    type='button'
                    className='btn btn-blue'
                    onClick={addTech}
                    data-cy='submit-tech'
                  >
                    {getText('GLOBAL', 'ADD')}
                  </button>
                </div>

                <ul className='flex flex-col'>
                  {techArray.map((t) => (
                    <>
                      <li
                        className='text-gray-600'
                        key={t.id}
                        data-cy='tech-item'
                      >
                        <button
                          type='button'
                          className='mr-4 font-bold text-gray-500'
                          onClick={() => deleteTech(t.id, t.techItem)}
                        >
                          x
                        </button>
                        {t.techItem}
                      </li>
                    </>
                  ))}
                </ul>
              </div>

              <div className='flex flex-col w-full mb-3'>
                <div className='flex flex-col items-end space-y-4'>
                  <div className='w-full space-y-2'>
                    <label htmlFor='projectName'>
                      {getText('GLOBAL', 'PROJECT_NAME')}
                      <span className='text-sm font-normal'>
                        {' '}
                        (optional) <Info />
                      </span>
                    </label>
                    <input
                      id='projectName'
                      type='text'
                      name='projectName'
                      ref={register}
                      className='w-full input'
                      onChange={saveProjectName}
                      value={projectItemName}
                      // {...register('projectName')}
                    />
                  </div>
                  <div className='w-full space-y-2'>
                    <label htmlFor='projectUrl'>
                      {getText('GLOBAL', 'PROJECT_URL')}
                    </label>
                    <input
                      id='projectUrl'
                      type='text'
                      name='projectUrl'
                      ref={register}
                      className='w-full input'
                      onChange={saveProjectUrl}
                      value={projectItemUrl}
                      {...register('projectUrl')}
                    />
                    {errors.projectUrl ? (
                      <p className='input-error' data-cy='projectUrl-error'>
                        {errors.projectUrl && errors.projectUrl.message}
                      </p>
                    ) : null}
                  </div>

                  <div className='flex items-start justify-between w-full'>
                    <ul className='flex flex-col space-y-2'>
                      {projectsArray &&
                        projectsArray.map((p) => (
                          <>
                            <li
                              className='text-gray-600'
                              key={p.id}
                              data-cy='project-item'
                            >
                              <button
                                type='button'
                                className='mr-4 font-bold text-gray-500'
                                onClick={() =>
                                  deleteProject(p.id, p.projectItemName)
                                }
                              >
                                x
                              </button>
                              <a
                                href={p.projectItemUrl}
                                className='text-teal-600'
                              >
                                {p.projectItemName}
                              </a>
                            </li>
                          </>
                        ))}
                    </ul>
                    <button
                      type='button'
                      className='btn btn-blue'
                      onClick={addProject}
                      data-cy='submit-project'
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* question1 */}
            <div className='flex flex-col w-full mb-10 space-y-3'>
              <label htmlFor='question1'>
                {getText('GLOBAL', 'QUESTION1')}
              </label>
              <textarea
                name='question1'
                id='question1'
                className='input'
                cols='30'
                rows='5'
                ref={register}
                data-cy='question-one'
              />
              {errors.question1 ? (
                <p className='input-error' data-cy='question-one-error'>
                  {errors.question1 && errors.question1.message}
                </p>
              ) : null}
            </div>

            {/* question2 */}
            <div className='flex flex-col w-full mb-10 space-y-3'>
              <label htmlFor='question2'>
                {getText('GLOBAL', 'QUESTION2')}
              </label>
              <textarea
                name='question2'
                id='question2'
                className='input'
                cols='30'
                rows='5'
                ref={register}
                data-cy='question-two'
              />
              {errors.question2 ? (
                <p className='input-error' data-cy='question-two-error'>
                  {errors.question2 && errors.question2.message}
                </p>
              ) : null}
            </div>

            {/* question3 */}
            <div className='flex flex-col w-full mb-4 space-y-3'>
              <label htmlFor='question3'>
                {getText('GLOBAL', 'QUESTION3')}
              </label>
              <textarea
                name='question3'
                id='question3'
                className='input'
                cols='30'
                rows='5'
                ref={register}
                data-cy='question-three'
              />
              {errors.question3 ? (
                <p className='input-error' data-cy='question-three-error'>
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
