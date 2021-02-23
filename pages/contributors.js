import PropTypes from 'prop-types'
import ContributorsList from 'components/contributors/ContributorsList'

// The OG contributors
const OGContributors = [
  {
    login: 'BitMasher',
    id: 61257372,
    node_id: 'MDQ6VXNlcjYxMjU3Mzcy',
    avatar_url: 'https://avatars2.githubusercontent.com/u/61257372?v=4',
    url: 'https://api.github.com/users/BitMasher',
    html_url: 'https://github.com/BitMasher',
    name: null,
    blog: '',
    twitter_username: null,
    contributions: 'Special',
  },
  {
    login: 'bkegley',
    id: 24785958,
    node_id: 'MDQ6VXNlcjI0Nzg1OTU4',
    avatar_url: 'https://avatars1.githubusercontent.com/u/24785958?v=4',
    url: 'https://api.github.com/users/bkegley',
    html_url: 'https://github.com/bkegley',
    name: null,
    blog: '',
    twitter_username: null,
    contributions: 'Special',
  },
  {
    login: 'kidqueb',
    id: 884128,
    node_id: 'MDQ6VXNlcjg4NDEyOA==',
    avatar_url: 'https://avatars3.githubusercontent.com/u/884128?v=4',
    url: 'https://api.github.com/users/kidqueb',
    html_url: 'https://github.com/kidqueb',
    name: 'Nick Quebbeman',
    blog: 'http://kidqueb.com',
    twitter_username: null,
    contributions: 'Special',
  },
]

/**
 * Generates a list of contributors based on their GitHub information.
 *
 * @returns {object} A list of GitHub contributors to the project.
 */
async function getContributors() {
  const response = await fetch(
    'https://api.github.com/repos/drewclem/protege/contributors',
    {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    }
  )
  const rawContributors = await response.json()

  const individualContributorResponses = await Promise.all(
    rawContributors.map(({ url }) => fetch(url))
  )

  const individualContributorInfos = await Promise.all(
    individualContributorResponses.map((contributorResponse) =>
      contributorResponse.json()
    )
  )

  const contributors = rawContributors.map((contributor, index) => {
    const fullContributorProfileInfo = {
      ...contributor,
      ...individualContributorInfos[index],
    }

    return fullContributorProfileInfo
  })

  return contributors.concat(OGContributors)
}

/**
 * Renders a list of contributors to the Protege project.
 *
 * @param {object} props
 * @param {object} props.contributors A list of contributors to the Protege repository.
 */
export default function Contributors({ contributors }) {
  const filteredContributors = contributors.reduce(
    (allContributors, contributor) => {
      allContributors[
        ['drewclem', 'pickleat'].includes(contributor.login)
          ? 'founders'
          : 'regular'
      ].push(contributor)
      return allContributors
    },
    { founders: [], regular: [] }
  )

  return (
    <div className='container mx-auto'>
      <div className='mx-auto' style={{ maxWidth: 680 }}>
        <h1 className='mb-3 text-2xl text-blue-900'>
          Protege.dev Contributors!
        </h1>

        <p className='mb-12 text-blue-700'>
          Here are Protege, we&apos;re only as strong as the community that
          surrounds us and that we aim to serve.
          <br />
          <br />
          Below is a list of amazing individuals from that community who have
          personally donated their time efforts to improving our platform.
          We&apos;re incredibly grateful that anyone would take time out of
          their day and lend us a helping hand and welcome any who want to aid
          in our mission.
          <br />
          <br />
          Want to join this list of awesomeness? Check our repo for any&nbsp;
          <a
            className='mb-3 text-blue-900 underline hover:text-teal-600'
            href='https://github.com/drewclem/protege/issues'
          >
            Active Issues
          </a>
          &nbsp;and send in a PR! It&apos;s that easy!
        </p>
      </div>
      <ContributorsList contributors={filteredContributors.regular} />

      <div className='mx-auto' style={{ maxWidth: 680 }}>
        <h2 className='mt-16 mb-3 text-xl text-blue-900'>Founders</h2>
        <ContributorsList
          contributors={filteredContributors.founders}
          isFounders
        />
      </div>
    </div>
  )
}

Contributors.propTypes = {
  contributors: PropTypes.arrayOf(
    PropTypes.shape({
      login: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      node_id: PropTypes.string.isRequired,
      avatar_url: PropTypes.string.isRequired,
      gravatar_id: PropTypes.string,
      url: PropTypes.string.isRequired,
      html_url: PropTypes.string.isRequired,
      followers_url: PropTypes.string.isRequired,
      following_url: PropTypes.string.isRequired,
      gists_url: PropTypes.string.isRequired,
      starred_url: PropTypes.string.isRequired,
      subscriptions_url: PropTypes.string.isRequired,
      organizations_url: PropTypes.string.isRequired,
      repos_url: PropTypes.string.isRequired,
      events_url: PropTypes.string.isRequired,
      received_events_url: PropTypes.string,
      type: PropTypes.string.isRequired,
      site_admin: PropTypes.bool.isRequired,
      contributions: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      company: PropTypes.string,
      blog: PropTypes.string,
      location: PropTypes.string,
      email: PropTypes.string,
      hireable: PropTypes.bool,
      bio: PropTypes.string,
      twitter_username: PropTypes.string,
      public_repos: PropTypes.number.isRequired,
      public_gists: PropTypes.number.isRequired,
      followers: PropTypes.number.isRequired,
      following: PropTypes.number.isRequired,
      created_at: PropTypes.string.isRequired,
      updated_at: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export async function getStaticProps() {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error(
      `Missing the environment variable GITHUB_TOKEN. If this is happening for local development, ensure you've generated a token and included it in your .env file, e.g. GITHUB_TOKEN="some-token". To generate a personal access token, follow the steps in the GitHub documentation, https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token.`
    )
  }

  return { props: { contributors: await getContributors() } }
}
