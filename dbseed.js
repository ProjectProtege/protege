/* eslint-env node */

// Seeding data is only for non-production environments.
if (process.env.NODE_ENV === 'production') {
  throw new Error(
    'Data is not allowed to be seeded in a production environment.'
  )
}

const path = require('path')

// Load the local development configuration file.
require('dotenv').config({ path: path.join(__dirname, '.env.local') })

const admin = require('firebase-admin')
const faker = require('faker')
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

// The argument --seedSize=n can be passed in.
// If it is not passed in the default seed size is 10.
const { seedSize = 10 } = yargs(hideBin(process.argv)).argv
const { PROJECT_ID: projectId } = process.env

admin.initializeApp({ projectId })

const db = admin.firestore()

async function seedData() {
  try {
    for (let i = 0; i < seedSize; i++) {
      const job = {
        approved: true,
        companyDescription: faker.lorem.paragraph(),
        companyEmail: faker.internet.email(),
        companyHQ: faker.address.state(),
        companyLogo: faker.random.arrayElement([
          'https://static.files-simplefileupload.com/0anc64bvd4tpqyd9v82gb3v8f3rv/Group 58.png',
          'https://static.files-simplefileupload.com/6mqplngm56hq0785c7hxpd5acw7d/FC_SoftwareIcons_Klaviyo.png',
          'https://static.files-simplefileupload.com/ko5z2ty8btrf5ndrng8z6uwodat1/piedpiper.png',
          'https://static.files-simplefileupload.com/p6o6g21p80tasou4yajr7dh1wo8z/FC_SoftwareIcons_ShipStation.png',
        ]),
        companyName: faker.company.companyName(),
        companyWebsite: faker.internet.url(),
        howToApply: faker.internet.url(),
        jobDescription: faker.lorem.paragraph(),
        jobtitle: faker.name.jobtitle(),
        paid: true,
        positionType: faker.random.arrayElement([
          'Full Time',
          'Part Time',
          'Contract',
        ]),
        postedAt: admin.firestore.FieldValue.serverTimestamp(),
        roleFocus: faker.random.arrayElement([
          'Front-end',
          'Back-end',
          'Full-stack',
        ]),
        status: faker.random.arrayElement(['viewed', 'sent']),
        // dateApplied: faker.date.recent(),
      }

      await db.collection('jobs').add(job)
    }

    // eslint-disable-next-line no-console
    console.log('database seed was successful')
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error, 'database seed failed')
  }
}

seedData()
