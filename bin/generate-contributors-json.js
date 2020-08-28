#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const util = require('util')
const { writeFile } = fs.promises
const mkdir = util.promisify(fs.mkdir)
const dataFolder = path.resolve(__dirname, '../src/data')

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
 */
async function generateContributorsJson() {
  console.log('🟡 Waiting for GitHub API to respond...')

  try {
    const response = await fetch(
      'https://api.github.com/repos/drewclem/protege/contributors'
    )
    const rawContributors = await response.json()

    console.log(
      '✅ Received the list of contributors for the repository https://github.com/drewclem/protege.'
    )

    const individualContributorResponses = await Promise.all(
      rawContributors.map(({ url }) => fetch(url))
    )

    const individualContributorInfos = await Promise.all(
      individualContributorResponses.map((response) => response.json())
    )

    console.log('✅ Received additional information for contributors')

    const contributors = rawContributors.map((contributor, index) => {
      const fullContributorProfileInfo = {
        ...contributor,
        ...individualContributorInfos[index],
      }

      return fullContributorProfileInfo
    })

    await mkdir(dataFolder, { recursive: true })
    await writeFile(
      path.resolve(dataFolder, 'contributors.json'),
      JSON.stringify(contributors.concat(OGContributors))
    )
    console.log('✅ Created contributors.json file')
  } catch (error) {
    console.error(
      '🔴 There was an issue creating the contributors.json file.',
      error
    )

    process.exit(1) // See https://node.readthedocs.io/en/latest/api/process
  }
}

generateContributorsJson()
