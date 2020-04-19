import React from 'react'
import Layout from '../layouts/Layout'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from '../pages/Home'
import JobBoard from '../pages/JobBoard'
import LearningResources from '../pages/learning-resources'
import Contact from '../pages/contact'
import IndividualJobPage from '../pages/individual-job'
import PostAJob from '../pages/post-a-job'

import * as ROUTES from '../constants/routes'

const App = () => (

<Router>
  <Layout >
    <Route exact path={ROUTES.HOME} component={Home} />
    <Route path={ROUTES.JOB_BOARD} component={JobBoard} />
    <Route path={ROUTES.CONTACT} component={Contact} />
    <Route path={ROUTES.POST_A_JOB} component={PostAJob} />

    <Route path={ROUTES.LEARNING} component={LearningResources} />
    <Route path={ROUTES.INDIVIDUAL_JOB} component={IndividualJobPage} />
  </Layout>
</Router>

)

export default App