import Cookies from 'universal-cookie'
// import GlobalTexts from 'components/i18n/GlobalTexts'
import AccountTexts from 'components/i18n/AccountTexts'
import FormTexts from 'components/i18n/FormTexts'
import DashboardTexts from 'components/i18n/DashboardTexts'

const getText = (type, text) => {
  const cookies = new Cookies()

  let locale = cookies.get(AccountTexts['en-us'].LOCALE)

  if (locale === undefined) {
    locale = 'en-us'
  }

  const defaultText = 'No text found'

  if (type !== 'ACCOUNT' && type !== 'FORMS' && type !== 'DASHBOARD') {
    return defaultText
  }

  let localeText = ''

  if (type === 'ACCOUNT') {
    localeText = AccountTexts[locale][text]
  } else if (type === 'FORMS') {
    localeText = FormTexts[locale][text]
  } else if (type === 'DASHBOARD') {
    localeText = DashboardTexts[locale][text]
  }

  if (localeText === undefined) {
    return defaultText
  }

  return localeText
}

export default getText
