import React from 'react'
import Layout from '../layouts/Layout'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from '../pages/Home'
import ProjectBoard from '../pages/project-board'
import Contribute from '../pages/contribute'
import Contact from '../pages/contact'
import IndividualJobPage from '../pages/individual-job'

import * as ROUTES from '../constants/routes'

const App = () => (

<Router>
  <Layout >
    <Route exact path={ROUTES.HOME} component={Home} />
    <Route path={ROUTES.PROJECT_BOARD} component={ProjectBoard} />
    <Route path={ROUTES.CONTACT} component={Contact} />
    <Route path={ROUTES.CONTRIBUTE} component={Contribute} />
    <Route path={ROUTES.INDIVIDUAL_JOB} component={IndividualJobPage} />
  </Layout>
</Router>

)

export default App