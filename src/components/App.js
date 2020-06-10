import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from '../pages/Home'
import JobBoard from '../pages/JobBoard'
import LearningResources from '../pages/learning-resources'
import GetInTouch from '../pages/get-in-touch'
import IndividualJobPage from '../pages/individual-job'
import PostAJob from '../pages/post-a-job'
import Thanks from '../pages/thanks'

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
      <Route path={ROUTES.THANKS} component={Thanks} />
    </Switch>
  </Router>
)

export default App
