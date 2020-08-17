#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
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

async function generateContributorsJson() {
  console.log('waiting for GitHub API to respond...')

  const response = await fetch(
    'https://api.github.com/repos/drewclem/protege/contributors'
  )
  const rawContributors = await response.json()

  console.log(
    'Received the list of contributors for the https://github.com/drewclem/protege repository'
  )

  const individualContributorInfos = await Promise.all(
    rawContributors.map((url) => url)
  )

  console.log('Received additional information for contributors')

  const contributors = rawContributors.map((contributor, index) => {
    return { ...contributor, ...individualContributorInfos[index] }
  })

  fs.mkdirSync(dataFolder, { recursive: true })

  fs.writeFile(
    path.resolve(dataFolder, 'contributors.json'),
    JSON.stringify(contributors.concat(OGContributors)),
    (error) => {
      if (error) {
        throw error
      }

      console.log('contributors.json file has been generated')
    }
  )
}

generateContributorsJson()
