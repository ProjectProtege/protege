/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { db } from '../../firebase/firebase'

import JobTemplate from '../job/JobTemplate'
import AdminJobEdit from './AdminJobEdit'
import AdminNotification from './AdminNotification'

import Edit from '../../assets/images/svg/edit-icon'
import DeleteForever from '../../assets/images/svg/delete-forever-icon'

const AdminReviewJob = ({
  id,
  receivingEdit,
  receivingNotification,
  deleteJobForever,
}) => {
  const docRef = db.collection('jobs').doc(id)
  const timeStamp = new Date()
  const uuid = `${id}-${timeStamp.getUTCMilliseconds()}`

  const [job, setJob] = useState()
  const [approval, setApproval] = useState()
  const [status, setStatus] = useState()
  const [updating, setUpdating] = useState(false)
  const [editJob, setEditJob] = useState(false)
  const [notificationRes, setNotificationRes] = useState(false)
  const [notificationId, setNotificationId] = useState()

  async function retrieveJob() {
    try {
      const res = await docRef.get()

      if (res.exists) {
        setJob(res.data())
        setApproval(res.data().approved)
        setStatus(res.data().status)
      }
    } catch (err) {
      alert(err)
    }
  }

  useEffect(() => {
    retrieveJob(id)
  }, [id])

  async function updateApprovalStatus() {
    setApproval(!approval)

    try {
      await docRef.update({
        approved: !approval,
      })

      receivingEdit(uuid)
      receivingNotification(uuid, true)
    } catch (err) {
      receivingNotification(err, false)
    }
  }

  async function updateJobStatus(e) {
    setUpdating(true)
    setStatus(e.target.value)

    try {
      await docRef.update({
        status: e.target.value,
      })
      receivingEdit(uuid, true)
      receivingNotification(uuid, true)
      setUpdating(false)
    } catch (err) {
      receivingNotification(err, false)
    }
  }

  function receivingCancel() {
    setEditJob('')
  }

  function editNotification(uid, res, editId) {
    setNotificationId(uid)
    setNotificationRes(res)

    if (res === true) {
      retrieveJob(editId)
    }
  }

  if (!job) return null

  return (
    <div>
      {notificationId && (
        <AdminNotification
          notificationId={notificationId}
          notificationRes={notificationRes}
        />
      )}
      <div className='mb-4 p-3 bg-gray-100 grid grid-cols-3'>
        <div className='flex flex-row items-center'>
          <label className='approval-toggle font-display text-blue-600 text-sm mr-3 flex'>
            <input
              type='checkbox'
              checked={approval}
              onChange={updateApprovalStatus}
            />
            <span className='publish-dot round shadow-inner' />
          </label>
        </div>

        <div className={`flex flex-row items-center select-wrap `}>
          <label
            htmlFor='job-select'
            className='font-display text-blue-600 text-sm mr-3'
          >
            Status
          </label>
          <select
            id='job-select'
            className={`w-full appearance-none pl-4 pr-1 py-1 rounded-full shadow-inner focus:outline-none ${
              updating ? 'opacity-50 pointer-events-none' : ''
            } ${status === 'active' ? 'text-teal-700' : null}
                ${status === 'inactive' ? 'text-error-full' : 'text-blue-800'}
            `}
            defaultValue={job.status}
            onChange={updateJobStatus}
          >
            <option value='active'>Active</option>
            <option value='inactive'>Inactive</option>
            <option value='filled'>Filled</option>
          </select>
        </div>

        <div className='col-span-1 flex justify-end items-center'>
          <button
            onClick={() => setEditJob(id)}
            className='w-4 h-4 text-teal-900 opacity-50 hover:opacity-100 transition ease-in-out duration-150 mr-6'
            type='button'
          >
            <Edit />
          </button>
          <button
            type='button'
            onClick={() => {
              if (
                window.confirm(
                  'This is a permanent and destructive action. Are you sure?'
                )
              )
                deleteJobForever(id)
            }}
            className='w-3 h-3 text-error-full opacity-50 hover:opacity-100 transition ease-in-out duration-150'
          >
            <DeleteForever />
          </button>
        </div>
      </div>

      <JobTemplate props={job} />

      {editJob && (
        <AdminJobEdit
          jobData={job}
          id={id}
          receivingCancel={receivingCancel}
          editNotification={editNotification}
        />
      )}
    </div>
  )
}

AdminReviewJob.propTypes = {
  id: PropTypes.number.isRequired,
  receivingEdit: PropTypes.func.isRequired,
  receivingNotification: PropTypes.func.isRequired,
  deleteJobForever: PropTypes.func.isRequired,
}

export default AdminReviewJob
