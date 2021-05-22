import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import getText from 'utils/i18n/Texts'

// Lib imports
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import 'react-quill/dist/quill.snow.css'
import nookies from 'nookies'
import { verifyIdToken } from 'utils/db/firebaseAdmin'

// Component imports
import AccountInteriorLayout from 'layouts/AccountInteriorLayout'
import { useEditJob } from 'store/edit-job_store'
// import { loadStripe } from '@stripe/stripe-js'
// import firebase from 'firebase/app'
import { db } from 'utils/db'
import toast from 'react-hot-toast'
// import { v4 as uuidv4 } from 'uuid'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const Edit = ({ session }) => {
  const router = useRouter()
  const { jobId, displayName } = router.query
  const editJob = useEditJob((s) => s.editJob)

  const Schema = Yup.object().shape({
    jobtitle: Yup.string().required('Job title is a required field.'),
    roleFocus: Yup.string().required('Please select a focus area.'),
    positionType: Yup.string().required('Please select a position type.'),
    jobDescription: Yup.string().required(
      'Please describe the job and its responsibilities.'
    ),
  })

  // react-hook-form
  const { register, handleSubmit, control, errors } = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
    defaultValues: {
      jobtitle: editJob.job.jobtitle,
      roleFocus: editJob.job.roleFocus,
      positionType: editJob.job.positionType,
      jobDescription: editJob.job.jobDescription,
    },
  })

  const handleFormEntry = async (data) => {
    try {
      await db.collection('jobs').doc(jobId).update({
        jobtitle: data.jobtitle,
        roleFocus: data.roleFocus,
        positionType: data.positionType,
        jobDescription: data.jobDescription,
      })

      router.push(`/company/${displayName}/dashboard`)
    } catch {
      toast.error('oops! something went wrong')
    }
  }

  if (session) {
    return (
      <AccountInteriorLayout className='mt-12'>
        <h1 className='sr-only'>Edit Job Listing</h1>

        <section>
          <div className='container relative z-30 p-6 bg-white rounded-lg shadow-md md:p-8'>
            <form onSubmit={handleSubmit(handleFormEntry)}>
              <h2 className='text-xl text-blue-900 mb-4'>
                {getText('GLOBAL', 'ABOUT_THE_JOB')}
              </h2>

              <div className='flex flex-col mb-3'>
                <label
                  htmlFor='jobtitle'
                  className='mb-2 font-semibold text-blue-900'
                >
                  {getText('GLOBAL', 'JOB_TITLE')}
                </label>

                <input
                  id='jobtitle'
                  name='jobtitle'
                  ref={register}
                  className='input'
                  type='text'
                  autoComplete='off'
                />

                <p
                  name='jobtitle'
                  component='span'
                  className='input-error'
                  role='alert'
                >
                  {errors.jobtitle && errors.jobtitle.message}
                </p>
              </div>

              <div className='md:flex'>
                <div className='flex flex-col mb-3 md:w-1/2 md:mr-6'>
                  <label
                    htmlFor='roleFocus'
                    className='font-semibold text-blue-900'
                  >
                    {getText('GLOBAL', 'ROLE_FOCUS')}
                  </label>

                  <span className='mb-2 text-xs tracking-tight text-blue-500 '>
                    {getText('GLOBAL', 'ROLE_FOCUS_OPTIONS')}
                  </span>

                  <div className='select-wrap'>
                    <select
                      id='roleFocus'
                      name='roleFocus'
                      ref={register}
                      className='input input-select '
                    >
                      <option value='' className='text-gray-300'>
                        {getText('GLOBAL', 'SELECT_ONE')}
                      </option>

                      <option value='Front-end'>
                        {getText('GLOBAL', 'FRONT_END')}
                      </option>

                      <option value='Back-end'>
                        {getText('GLOBAL', 'BACK_END')}
                      </option>

                      <option value='Full-stack'>
                        {getText('GLOBAL', 'FULL_STACK')}
                      </option>
                    </select>
                  </div>

                  <p
                    name='roleFocus'
                    component='span'
                    className='input-error'
                    role='alert'
                  >
                    {errors.roleFocus && errors.roleFocus.message}
                  </p>
                </div>

                <div className='flex flex-col mb-3 md:w-1/2'>
                  <label
                    htmlFor='positionType'
                    className='font-semibold text-blue-900'
                  >
                    {getText('GLOBAL', 'POSITION_TYPE')}
                  </label>

                  <span className='mb-2 text-xs tracking-tight text-blue-500 '>
                    {getText('GLOBAL', 'POSITION_TYPE_OPTIONS')}
                  </span>

                  <div className='select-wrap'>
                    <select
                      id='positionType'
                      name='positionType'
                      className='input input-select '
                      ref={register}
                    >
                      <option value='' className='text-gray-300'>
                        {getText('GLOBAL', 'SELECT_ONE')}
                      </option>
                      <option value='Full-time'>
                        {getText('GLOBAL', 'FULL_TIME')}
                      </option>
                      <option value='Part-time'>
                        {getText('GLOBAL', 'PART_TIME')}
                      </option>
                      <option value='Contract'>
                        {getText('GLOBAL', 'CONTRACT')}
                      </option>
                    </select>
                  </div>

                  <p
                    name='positionType'
                    component='span'
                    className='input-error'
                    role='alert'
                  >
                    {errors.positionType && errors.positionType.message}
                  </p>
                </div>
              </div>

              <div className='flex flex-col mb-3'>
                <label
                  htmlFor='jobDescription'
                  className='mb-2 font-semibold text-blue-900'
                >
                  {getText('GLOBAL', 'JOB_DESCRIPTION')}
                </label>

                <Controller
                  name='jobDescription'
                  control={control}
                  render={({ value, onChange }) => (
                    <ReactQuill
                      value={value}
                      onChange={onChange}
                      modules={{ keyboard: { bindings: { tab: false } } }}
                    />
                  )}
                />

                <p
                  name='jobDescription'
                  component='span'
                  className='input-error'
                  role='alert'
                >
                  {errors.jobDescription && errors.jobDescription.message}
                </p>
              </div>

              <button type='submit' className='btn btn-teal'>
                {getText('GLOBAL', 'SAVE')}
              </button>
            </form>
          </div>
        </section>
      </AccountInteriorLayout>
    )
  }
}

export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context)
    const token = await verifyIdToken(cookies.token)
    const { email } = token

    return {
      props: {
        session: `Your email is ${email}`,
      },
    }
  } catch (err) {
    context.res.writeHead(302, { location: '/sign-in' })
    context.res.end()
    return { props: [] }
  }
}

export default Edit
