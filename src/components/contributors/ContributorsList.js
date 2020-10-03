/* eslint-disable react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'

import IndividualContributor from './IndividualContributor'

const ContributorsList = ({ contributors }) => {
  return (
    <ul className='grid gap-5 row-gap-5 md:grid-cols-2'>
      {contributors
        .filter(({ login }) => login !== 'ImgBotApp')
        .map((contributor) => {
          const { id } = contributor
          return (
            <li key={id}>
              <IndividualContributor props={contributor} />
            </li>
          )
        })}
    </ul>
  )
}

ContributorsList.propTypes = {
  contributors: PropTypes.array.isRequired,
}

export default ContributorsList
