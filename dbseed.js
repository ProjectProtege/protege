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
          '1599738319201launchpad.png',
          '1595692178414logo192.png',
          '1587489344050logo (1).jpg',
          '1587153223253walrus.png',
        ]),
        companyName: faker.company.companyName(),
        companyWebsite: faker.internet.url(),
        howToApply: faker.internet.url(),
        jobDescription: faker.lorem.paragraph(),
        jobtitle: faker.name.jobTitle(),
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
        status: faker.random.arrayElement(['inactiver', 'active', 'filled']),
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
