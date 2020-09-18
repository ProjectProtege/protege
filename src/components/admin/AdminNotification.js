import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

const AdminNotification = ({ notificationId, notificationRes }) => {
  const [message, setMessage] = useState('')
  const [id, setId] = useState()

  useEffect(() => {
    setId(notificationId)
    if (notificationRes) {
      setMessage('Update Successful!')
    } else {
      setMessage('Oops! Something went wrong.')
    }
  }, [notificationId, notificationRes])

  return (
    <motion.div
      className={`absolute text-blue-500 top-0 right-0 bg-white px-6 py-3 border-l-2 border-teal-600 shadow-md  mt-4 mr-12 ${
        notificationRes ? 'border-teal-600' : 'border-error'
      }`}
      initial={{ y: -200 }}
      animate={{
        y: [-200, 10, 0, 0, -200],
      }}
      transition={{
        times: [0, 0.2, 0.25, 0.9, 1],
        duration: 3,
        ease: 'easeInOut',
      }}
      key={id}
    >
      <p>{message}</p>
    </motion.div>
  )
}

AdminNotification.propTypes = {
  notificationId: PropTypes.func.isRequired,
  notificationRes: PropTypes.func.isRequired,
}

export default AdminNotification
