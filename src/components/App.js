import React, { Suspense, lazy } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import { AuthProvider } from '../firebase/auth'
import PrivateRoute from '../constants/PrivateRoute'

import * as ROUTES from '../constants/routes'
import LoadingSpinner from './LoadingSpinner'
import Layout from '../layouts/Layout'

const Home = lazy(() => import('../pages/Home'))
const LearningResources = lazy(() => import('../pages/LearningResources'))
const JobBoard = lazy(() => import('../pages/JobBoard'))
const GetInTouch = lazy(() => import('../pages/GetInTouch'))
const IndividualJobPage = lazy(() => import('../pages/IndividualJob'))
const Contributors = lazy(() => import('../pages/Contributors'))
const PostAJob = lazy(() => import('../pages/PostAJob'))
const Thanks = lazy(() => import('../pages/Thanks'))
const NotFound = lazy(() => import('../pages/NotFound'))
const Admin = lazy(() => import('../pages/Admin'))
const SignIn = lazy(() => import('../pages/SignIn'))

const App = () => (
  <AuthProvider>
    <Router>
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <Switch>
            <Route exact path={ROUTES.HOME} component={Home} />
            <Route path={`/job-board/:id`} component={IndividualJobPage} />
            <Route path={ROUTES.JOB_BOARD} component={JobBoard} />
            <Route path={ROUTES.GET_IN_TOUCH} component={GetInTouch} />
            <Route path={ROUTES.LEARNING} component={LearningResources} />
            <Route path={ROUTES.POST_A_JOB} component={PostAJob} />
            <Route path={ROUTES.CONTRIBUTORS} component={Contributors} />
            <Route path={ROUTES.THANKS} component={Thanks} />
            <Route path={ROUTES.SIGN_IN} component={SignIn} />
            <Route path={ROUTES.NOT_FOUND} component={NotFound} />
            <PrivateRoute path={ROUTES.ADMIN} component={Admin} />
            <Redirect to={ROUTES.NOT_FOUND} />
          </Switch>
        </Suspense>
      </Layout>
    </Router>
  </AuthProvider>
)

export default App
