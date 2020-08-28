import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import Layout from '../layouts/Layout'
import ResourceCard from '../components/ResourceCard'

const LearningResources = (url) => (
  <Layout>
    <motion.div
      className='container m-auto max-w-screen-xl align-middle mt-32 sm:max-w-screen-lg'
      initial={{
        opacity: 0,
        y: -10,
      }}
      animate={{
        opacity: [0, 1],
        y: [-10, 0],
      }}
      transition={{
        duration: 0.3,
        ease: 'easeIn',
      }}
    >
      <div class='relative px-12 text-center mx-auto my-10 sm:px-40 lg:px-32'>
        <h2 class='text-2xl leading tracking-tight font-extrabold text-blue-900 sm:leading-10 sm:text-3xl'>
          Learning Resources
        </h2>
        <p className='text-base mb-2 text-blue-700 sm:mt-4 sm:px-12 sm:text-base md:text-base'>
          {' '}
          We've pulled some of the best free, and paid, resources together to
          help support your journey.
        </p>
        <p className='text-base text-blue-700 sm:mt-4 sm:text-base md:text-base'>
          {' '}
          Got a resource you think we should add to the list?{' '}
          <Link
            to={ROUTES.GET_IN_TOUCH}
            className='underline mb-3 text-blue-900 hover:text-teal-600'
          >
            Reach out!
          </Link>
        </p>
      </div>

      <div className='container mx-auto text-center md:text-left my-4 px-8'>
        <h3 className='text-2xl font-bold text-blue-900 md:text-3xl'>
          Free Resources
        </h3>
      </div>

      <div className='content-center flex grid-flow-col flex-wrap justify-center'>
        <ResourceCard
          title='FreeCodeCamp'
          resourceImage='freecodecamp.jpg'
          tag='free'
          description='A nonprofit community that helps you learn to code by building projects. Learn to code by completing coding challenges and building projects. Earn verified certifications along the way.'
          resourceUrl='freecodecamp.org'
        />

        <ResourceCard
          title='The Beginner&#39;s Guide to React'
          resourceImage='beg-guide-react.jpg'
          tag='free'
          description='This course is for React newbies and anyone looking to build a solid foundation. It’s designed to teach you everything you need to start building web applications in React right away.'
          resourceUrl='egghead.io/courses/the-beginner-s-guide-to-react'
        />

        <ResourceCard
          title='Devtips'
          resourceImage='devtips.jpg'
          tag='free'
          description='DevTips is a weekly show for YOU who want to be inspired and learn about programming. Hosted by David and MPJ - two notorious bug generators and teachers.'
          resourceUrl='youtube.com/c/DevTipsForDesigners'
        />

        <ResourceCard
          title='Quentin Watt'
          resourceImage='quentin.jpg'
          tag='free'
          description='Learn how to code JavaScript, and PHP using popular frameworks like Vue.js and Laravel. Aimed at equipping you with the skills you need to develop your career. '
          resourceUrl='youtube.com/user/QuentinWatt'
        />

        <ResourceCard
          title='Wes Bos Youtube'
          resourceImage='wesbos-youtube.jpg'
          tag='free'
          description='A full Stack JavaScript developer from Canada I create free + premium courses and do a twice-weekly podcast called Syntax. HTML, CSS, JavaScript and WordPress web development tutorials! '
          resourceUrl='youtube.com/user/wesbos'
        />

        <ResourceCard
          title='LevelUp Tutorials Youtube'
          resourceImage='level-up.jpg'
          tag='free'
          description='Level Up Tutorials sets how to help fix a major problem in learning technologies. Videos created for Level Up Tutorials are aimed to be accessible and easy to follow while maintaining high production values.'
          resourceUrl='youtube.com/channel/UCyU5wkjgQYGRB0hIHMwm2Sg'
        />

        <ResourceCard
          title='James Quick Youtube'
          resourceImage='jamesquick.jpg'
          tag='free'
          description='Want to learn more about Web Development, Design, and Tools?  Then, youre in the right place! I LEARN the newest techniques in Web Development, Design, and Tools. I BUILD projects for myself and others.'
          resourceUrl='youtube.com/channel/UC-T8W79DN6PBnzomelvqJYw'
        />

        <ResourceCard
          title='Level Up Financial Planning'
          resourceImage='levelup-fin.jpg'
          tag='free'
          description='Fee only financial planner (fiduciary) virtually out of Fort Collins. Lucas can help you achieve confidence to take Your Financial Confidence to the Next Level.'
          resourceUrl='levelupfinancialplanning.com/videos/'
        />

        <ResourceCard
          title='Codecademy (Freemium)'
          resourceImage='codecademy.jpg'
          tag='free'
          description='Committed to building the best learning experience inside and out, making Codecademy the best place for our team to learn, teach, and create the online learning experience of the future.'
          resourceUrl='codecademy.com'
        />

        <ResourceCard
          title='Traversy Media'
          resourceImage='traversy.jpg'
          tag='free'
          description='Traversy Media features the best online web development and programming tutorials for all of the latest web technologies including Node.js, Angular 2, React.js, PHP, Rails, HTML, CSS and much more.'
          resourceUrl='youtube.com/user/TechGuyWeb'
        />

        <ResourceCard
          title='Programming With Mosh'
          resourceImage='mosh.jpg'
          tag='free'
          description='I train professional software engineers that companies love to hire. Javascript, React, React Native, Node, Angular, Python, C Sharp'
          resourceUrl='youtube.com/user/programmingwithmosh'
        />

        <div className='container mx-auto text-center md:text-left my-4 px-8'>
          <h3 className='text-2xl font-bold text-blue-900 md:text-3xl'>
            Paid Resources
          </h3>
        </div>

        <div className='content-center flex grid-flow-col flex-wrap justify-center'>
          <ResourceCard
            title='Egghead.io'
            resourceImage='egghead.jpg'
            tag='paid'
            description='Learn the best JavaScript tools and frameworks from industry pros. Egghead is a group of working web development professionals and open source contributors that provide concise, information dense video courses on the best tools in the industry.'
            resourceUrl='egghead.io/?rc=84jyz'
          />
          <ResourceCard
            title='Wes Bos Courses'
            resourceImage='wesbos.jpg'
            tag='paid'
            description='I&#39;m a full Stack JavaScript developer from Canada. I create free + premium courses and do a twice-weekly podcast called Syntax. You can read more about me here, but stick around if you like CSS, JavaScript, mediocre jokes, learning new things or BBQ Tips'
            resourceUrl='wesbos.com/courses'
          />
          <ResourceCard
            title='LevelUp Tutorials'
            resourceImage='levelup.jpg'
            tag='paid'
            description='Level Up Tutorials sets how to help fix a major problem in learning technologies. The lack of in-depth, basic tutorials that teach more than just what to type when. Level Up Tutorials are aimed to be accessible and easy to follow while maintaining high production values.'
            resourceUrl='leveluptutorials.com'
          />

          <ResourceCard
            title='Team Treehouse'
            resourceImage='treehouse.jpg'
            tag='paid'
            description='Our mission is to diversify the tech industry through accessible education and apprenticeship, unlocking the door to opportunity and empowering people to achieve their dreams. We will do this by training and placing people from all backgrounds into apprenticeships. '
            resourceUrl='teamtreehouse.com'
          />

          <ResourceCard
            title='Adam Learns'
            resourceImage='adam-learns.jpg'
            tag='paid'
            description='A premium library of learning material that is created in front of a live audience. Watch courses live on Twitch and influence the decision-making process, access videos, course notes and code repositories—all the material to get started quickly.'
            resourceUrl='adamlearns.com'
          />

          <ResourceCard
            title='Udemy'
            resourceImage='udemy.jpg'
            tag='paid'
            description='Udemy is the leading global marketplace for teaching and learning, connecting millions of students to the skills they need to succeed. Udemy is helping individuals reach their goals and pursue their dreams.'
            resourceUrl='udemy.com'
          />

          <ResourceCard
            title='Frontend Masters'
            resourceImage='frontendmasters.jpg'
            tag='paid'
            description='Advance your skills with in-depth, modern JavaScript and front-end engineering courses. Start with the Front End Bootcamp, or dive into popular frameworks such as: React, Vue, Angular, and more.'
            resourceUrl='frontendmasters.com'
          />
        </div>
      </div>
    </motion.div>
  </Layout>
)

export default LearningResources
