import React from 'react'

import EmptyDashboardImage from 'assets/images/EmptyDashboardImage'

import getText from 'utils/i18n/Texts'

const EmptyDashboard = () => {
  return (
    <div className='flex flex-col pt-12 mx-auto max-w-screen-2xl md:flex-row'>
      <EmptyDashboardImage className='mb-6 md:mb-0 md:w-2/3 md:mr-6' />

      <div className='w-full md:w-1/3 md:mt-6'>
        <p>{getText('DASHBOARD', 'EMPTY_INTRO')}</p>
        <br />
        <p>{getText('DASHBOARD', 'EMPTY_INTRO_2')}</p>
      </div>
    </div>
  )
}

export default EmptyDashboard
