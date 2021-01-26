/* eslint-disable react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'

import IndividualContributor from './IndividualContributor'

const ContributorsList = ({ contributors, isFounders }) => {
  return (
    <ul
      className={`grid gap-5 ${
        isFounders
          ? 'md:grid-cols-2'
          : 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      }`}
    >
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
  isFounders: PropTypes.bool,
}

ContributorsList.defaultProps = {
  isFounders: false,
}

export default ContributorsList
