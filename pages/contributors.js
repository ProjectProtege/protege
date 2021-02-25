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
 * Renders a list of contributors to the Protegé project.
 *
 * @param {object} props
 * @param {object} props.contributors A list of contributors to the Protegé repository.
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
          Protegé.dev Contributors!
        </h1>

        <p className='mb-12 text-blue-700'>
          Here at Protegé, we&apos;re only as strong as the community that
          surrounds us and that we aim to serve.
          <br />
          <br />
          Below is a list of amazing individuals from that community who have
          personally donated their time and efforts to improving our platform.
          We&apos;re incredibly grateful that anyone would take time out of
          their day to lend us a helping hand and we welcome anyone who wants to
          aid in our mission.
          <br />
          <br />
          Want to join this list of awesomeness? Check our repo for&nbsp;
          <a
            className='mb-3 text-blue-900 underline hover:text-teal-600'
            href='https://github.com/drewclem/protege/issues'
          >
            active issues
          </a>
          &nbsp;and&nbsp;
          <a
            className='mb-3 text-blue-900 underline hover:text-teal-600'
            href='https://github.com/drewclem/protege#submitting-a-pr'
          >
            submit a pull request!
          </a>{' '}
          It&apos;s that easy!
        </p>
      </div>

      <ContributorsList contributors={filteredContributors.regular} />

      <h2 className='mt-16 mb-3 text-xl text-blue-900'>Founders</h2>
      <ContributorsList
        contributors={filteredContributors.founders}
        isFounders
      />
    </div>
  )
}

Contributors.propTypes = {
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
}

export async function getStaticProps() {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error(
      `Missing the environment variable GITHUB_TOKEN. If this is happening for local development, ensure you've generated a token and included it in your .env file, e.g. GITHUB_TOKEN="some-token". To generate a personal access token, follow the steps in the GitHub documentation, https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token . For the scope of the token being created, select public_repo only from within the repo scope.`
    )
  }

  return { props: { contributors: await getContributors() } }
}
