import { useEffect } from 'react'
import { db } from 'utils/db'
import { useTags } from 'store/tags_store'

// eslint-disable-next-line react/prop-types
const TagProvider = ({ children }) => {
  const setTags = useTags((s) => s.setTags)

  useEffect(() => {
    async function fetchTags() {
      const tagEntries = await db.collection('tags').get()

      tagEntries.docs.map((doc) => {
        const entry = doc.data()

        const tagObj = entry.technology.map((item) => {
          return {
            id: item,
            text: item,
          }
        })

        setTags(tagObj)
        return entry
      })
    }

    fetchTags()
  }, [])

  return <>{children}</>
}

export default TagProvider
