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
const { v4 } = require('uuid');
const { example } = require('yargs');
const { auth } = require('firebase-admin');

// The argument --jobs=n can be passed in.
// If it is not passed in the default seed size is 10.
const { jobs = 10 } = yargs(hideBin(process.argv)).argv
const { PROJECT_ID: projectId } = process.env

admin.initializeApp({ projectId })

const db = admin.firestore()

async function seedCandidate() {
  const candidateUid = v4()
  admin
    .auth()
    .createUser({
      uid: candidateUid,
      email: 'candidate@protege.dev',
      password: 'Password1!',
      displayName: "Test Candidate",
      // claims: {
      //   'role': 'candidate'
      // }
      // photoURL: 'candidate'
    })
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log('Successfully created new candidate:', userRecord.uid);
      console.log(userRecord);

      const candidate = {
        accountType: 'candidate',
        displayName: 'Test Candidate',
        email: 'candidate@protege.dev',
        slug: 'test-candidate',
        userUid: userRecord.uid
      }
      db.collection('candidates').doc(userRecord.uid).set(candidate)

      // eslint-disable-next-line no-console
      console.log('candidate seed was successful')
    })
    .catch((error) => {
      console.log('Error creating new candidate:', error);
    });
}

async function seedCompany() {
  const companyUid = v4()
  admin
    .auth()
    .createUser({
      uid: companyUid,
      email: 'company@protege.dev',
      password: 'Password1!',
      displayName: "Test Company",
      // photoURL: 'company'
    })
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log('Successfully created new company:', userRecord.uid);

      const company = {
        accountType: 'company',
        displayName: 'Test Company',
        email: 'company@protege.dev',
        slug: 'test-company',
        userUid: userRecord.uid
      }
      db.collection('companies').doc(userRecord.uid).set(company)

      // eslint-disable-next-line no-console
      console.log('company seed was successful')
    })
    .catch((error) => {
      console.log('Error creating new company:', error);
    });
}

async function seedJobs() {
  try {
    for (let i = 0; i < jobs; i++) {
      const job = {
        approved: true,
        companyDescription: faker.lorem.paragraph(),
        companyEmail: faker.internet.email(),
        companyHQ: faker.address.state(),
        avatar: faker.random.arrayElement([
          'https://static.files-simplefileupload.com/0anc64bvd4tpqyd9v82gb3v8f3rv/Group 58.png',
          'https://static.files-simplefileupload.com/6mqplngm56hq0785c7hxpd5acw7d/FC_SoftwareIcons_Klaviyo.png',
          'https://static.files-simplefileupload.com/ko5z2ty8btrf5ndrng8z6uwodat1/piedpiper.png',
          'https://static.files-simplefileupload.com/p6o6g21p80tasou4yajr7dh1wo8z/FC_SoftwareIcons_ShipStation.png',
        ]),
        companyName: faker.company.companyName(),
        companyWebsite: faker.internet.url(),
        howToApply: faker.internet.url(),
        jobDescription: faker.lorem.paragraph(),
        jobtitle: faker.name.jobTitle(),
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
    console.log('jobs seed was successful')
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error, 'jobs seed failed')
  }
}

// seedCandidate()
// seedCompany()
seedJobs()
