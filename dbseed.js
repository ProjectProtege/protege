const admin = require('firebase-admin')
const faker = require('faker')

const projectId = 'protege-dev-env'
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080'
admin.initializeApp({ projectId })

const db = admin.firestore()

function getSeedData() {
  try {
    ;[...Array(10).keys()].map(() =>
      db.collection('jobs').add({
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
        jobtitle: faker.name.jobTitle(),
        paid: faker.random.boolean(),
        positionType: faker.random.arrayElement([
          'Full Time',
          'Part Time',
          'Contract',
        ]),
        postedAt: {
          nanoseconds: 201000000,
          seconds: 1599738319,
        },
        roleFocus: faker.random.arrayElement([
          'Front-end',
          'Back-end',
          'Full-stack',
        ]),
        status: faker.random.arrayElement(['viewed', 'sent']),
        // dateApplied: faker.date.recent(),
      })
    )
    // eslint-disable-next-line no-console
    console.log('database seed was successful')
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error, 'database seed failed')
  }
}

getSeedData()
