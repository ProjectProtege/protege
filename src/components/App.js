import React from 'react'
import Layout from '../layouts/Layout'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from '../pages/Home'
import JobBoard from '../pages/JobBoard'
import LearningResources from '../pages/learning-resources'
import Contact from '../pages/contact'
import IndividualJobPage from '../pages/individual-job'
import BlankPage from '../pages/Blank'

import * as ROUTES from '../constants/routes'

const App = () => (

<Router>
  <Layout >
    <Route exact path={ROUTES.HOME} component={Home} />
    <Route path={ROUTES.JOB_BOARD} component={JobBoard} />
    <Route path={ROUTES.CONTACT} component={Contact} />
    <Route path={ROUTES.LEARNING} component={LearningResources} />
    <Route path={ROUTES.INDIVIDUAL_JOB} component={IndividualJobPage} />
    <Route path={ROUTES.BLANK} component={BlankPage} />
  </Layout>
</Router>

)

export default App