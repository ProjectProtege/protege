import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from '../pages/Home'
import JobBoard from '../pages/JobBoard'
import LearningResources from '../pages/LearningResources'
import GetInTouch from '../pages/GetInTouch'
import IndividualJobPage from '../pages/IndividualJob'
import Contributors from '../pages/Contributors'
import PostAJob from '../pages/PostAJob'
import Thanks from '../pages/Thanks'

import * as ROUTES from '../constants/routes'

const App = () => (
  <Router>
    <Switch>
      <Route exact path={ROUTES.HOME} component={Home} />
      <Route path={`/job-board/:id`} component={IndividualJobPage} />
      <Route path={ROUTES.JOB_BOARD} component={JobBoard} />
      <Route path={ROUTES.GET_IN_TOUCH} component={GetInTouch} />
      <Route path={ROUTES.POST_A_JOB} component={PostAJob} />
      <Route path={ROUTES.LEARNING} component={LearningResources} />
      <Route path={ROUTES.CONTRIBUTORS} component={Contributors} />
      <Route path={ROUTES.THANKS} component={Thanks} />
    </Switch>
  </Router>
)

export default App
