import Cookies from 'universal-cookie'

// import new translation files here
import GlobalTexts from 'components/i18n/GlobalTexts'

const getText = (type, text) => {
  const cookies = new Cookies()

  let locale = cookies.get(GlobalTexts['en-us'].LOCALE)

  if (locale === undefined) {
    locale = 'en-us'
  }

  const defaultText = 'No text found'

  // when creating new translation files add new && type ... if (type !== 'GLOBAL' && type !== 'NEWFILE')
  if (type !== 'GLOBAL') {
    return defaultText
  }

  let localeText = ''

  // when creating new translation files add an else if
  // if (type === 'GLOBAL') {
  //   localeText = GlobalTexts[locale][text]
  // } else if (type === 'NEWFILE') {
  //   localeText = NewFileTexts[locale][text]
  // }

  if (type === 'GLOBAL') {
    localeText = GlobalTexts[locale][text]
  }

  if (localeText === undefined) {
    return defaultText
  }

  return localeText
}

export default getText
