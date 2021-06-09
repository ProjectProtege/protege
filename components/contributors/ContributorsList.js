/* eslint-disable react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'

import IndividualContributor from './IndividualContributor'

const ContributorsList = ({ contributors, isFounders }) => {
  return (
    <ul
      className={`grid gap-5 ${
        isFounders
          ? 'sm:grid-cols-2 lg:grid-cols-4'
          : 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      }`}
    >
      {isFounders ? <li className='hidden lg:block' /> : null}

      {contributors
        .filter(({ login }) => login !== 'ImgBotApp')
        .map((contributor) => {
          const { id } = contributor
          return (
            <li key={id}>
              <IndividualContributor contributor={contributor} />
            </li>
          )
        })}

      {isFounders ? <li className='hidden lg:block' /> : null}
    </ul>
  )
}

ContributorsList.propTypes = {
  contributors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      login: PropTypes.string.isRequired,
      twitter_username: PropTypes.string,
      avatar_url: PropTypes.string.isRequired,
      blog: PropTypes.string,
      html_url: PropTypes.string.isRequired,
      contributions: PropTypes.number.isRequired,
    })
  ).isRequired,
  isFounders: PropTypes.bool,
}

ContributorsList.defaultProps = {
  isFounders: false,
}

export default ContributorsList
