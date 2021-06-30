import faker from 'faker'

module.exports = {
  candidate: {
    name: 'Candidate Name',
    email: faker.internet.email(),
    password: 'Password1!',
  },
  company: {
    name: 'Company Name',
    email: faker.internet.email(),
    password: 'Password1!',
  },
}
