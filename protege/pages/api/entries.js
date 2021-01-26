import { db } from 'utils/db'

export default async (req, res) => {
  try {
    const entries = await db
      .collection('jobs')
      .orderBy('postedAt', 'desc')
      .get()

    const entriesData = entries.docs.map((documentSnapshot) => {
      const entry = documentSnapshot.data()
      const doc = documentSnapshot

      return {
        id: doc.id,
        jobTitle: entry.jobtitle,
        roleFocus: entry.roleFocus,
        status: entry.status,
        companyHQ: entry.companyHQ,
        companyName: entry.companyName,
        postedAt: entry.postedAt.toDate(),
        companyLogo: entry.companyLogo,
      }
    })

    res.status(200).json({ entriesData })
  } catch (err) {
    res.status(400).end()
  }
}
