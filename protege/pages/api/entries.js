import db from 'utils/db'

export default async (req, res) => {
  try {
    const entries = await db
      .collection('jobs')
      .orderBy('postedAt', 'desc')
      .get()
    const entriesData = entries.docs.map((entry) => ({
      // id: entry.id,
      ...entry.data(),
    }))

    res.status(200).json({ entriesData })
  } catch (err) {
    res.status(400).end()
  }
}
