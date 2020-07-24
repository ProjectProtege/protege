import React from 'react'
import { motion } from 'framer-motion'
import Layout from '../layouts/Layout'
import ResourceCard from '../components/ResourceCard'

const LearningResources = (url) => (
  <Layout>
    <motion.div
      className='container mx-auto pt-32 px-2 md:px-0 text-center'
      style={{ maxWidth: 680 }}
      animate={{
        opacity: [0, 1],
        y: [-10, 0],
      }}
      transition={{
        duration: 0.25,
        ease: 'easeIn',
      }}
    />

    <div className='relative max-w-lg mx-auto lg:max-w-7xl xl:max-w-6xl'>
      <h1 className='text-2xl font-semibold text-blue-900 mb-6'>
        Learning Resources
      </h1>
      <div className='flex flex-row flex-wrap'>
        <ResourceCard
          title='FreeCodeCamp'
          resourceimg='freecodecamp.jpg'
          tag='free'
          description='A nonprofit community that helps you learn to code by building projects. Learn to code by completing coding challenges and building projects. Earn verified certifications along the way.'
          resourceurl='freecodecamp.org'
        />
        {/* TODO: KH - Add back in apostrophe to Beginner's */}
        <ResourceCard
          title='The Beginners Guide to React'
          resourceimg='beg-guide-react.jpg'
          tag='pay'
          description='This course is for React newbies and anyone looking to build a solid foundation. It’s designed to teach you everything you need to start building web applications in React right away.'
          resourceurl='egghead.io/courses/the-beginner-s-guide-to-react'
        />

        <ResourceCard
          title='Devtips'
          resourceimg='devtips.jpg'
          tag='free'
          description='DevTips is a weekly show for YOU who want to be inspired and learn about programming. Hosted by David and MPJ - two notorious bug generators and teachers.'
          resourceurl='youtube.com/c/DevTipsForDesigners'
        />

        <ResourceCard
          title='Quentin Watt'
          resourceimg='quentin.jpg'
          tag='free'
          description='Learn how to code JavaScript, and PHP using popular frameworks like Vue.js and Laravel. Aimed at equipping you with the skills you need to develop your career. '
          resourceurl='youtube.com/user/QuentinWatt'
        />

        <ResourceCard
          title='Wes Bos Youtube'
          resourceimg='wesbos.jpg'
          tag='free'
          description='A full Stack JavaScript developer from Canada I create free + premium courses and do a twice-weekly podcast called Syntax. HTML, CSS, JavaScript and WordPress web development tutorials! '
          resourceurl='youtube.com/user/wesbos'
        />

        <ResourceCard
          title='LevelUp Tutorials Youtube'
          resourceimg='level-up.jpg'
          tag='free'
          description='Level Up Tutorials sets how to help fix a major problem in learning technologies. Videos created for Level Up Tutorials are aimed to be accessible and easy to follow while maintaining high production values.'
          resourceurl='youtube.com/channel/UCyU5wkjgQYGRB0hIHMwm2Sg'
        />

      </div>
    </div>

    <div className='mb-12'>
      <h2 className='text-lg mb-3 text-teal-600 font-semibold'>Free</h2>
      <motion.ul
        animate={{
          y: [-5, 0],
        }}
        transition={{
          delay: 0.1,
          duration: 0.25,
        }}
      >
     
      {/* TODO: KH - Finish migrating the below resources */}

        <li className='underline mb-3 text-blue-700 hover:text-teal-600'>
          <a
            href='https://www.youtube.com/channel/UC-T8W79DN6PBnzomelvqJYw'
            target='_blank'
            rel='noopener noreferrer'
          >
            James Quick Youtube
          </a>
        </li>

        <li className='underline mb-3 text-blue-700 hover:text-teal-600'>
          <a
            href='https://www.levelupfinancialplanning.com/videos/'
            target='_blank'
            rel='noopener noreferrer'
          >
            Level Up Financial Planning
          </a>
        </li>

        <li className='underline mb-3 text-blue-700 hover:text-teal-600'>
          <a
            href='https://www.codecademy.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            Codecademy (Freemium)
          </a>
        </li>

        <li className='underline mb-3 text-blue-700 hover:text-teal-600'>
          <a
            href='https://www.youtube.com/user/TechGuyWeb'
            target='_blank'
            rel='noopener noreferrer'
          >
            Traversy Media
          </a>
        </li>

        <li className='underline mb-3 text-blue-700 hover:text-teal-600'>
          <a
            href='https://www.youtube.com/user/programmingwithmosh'
            target='_blank'
            rel='noopener noreferrer'
          >
            Programming With Mosh
          </a>
        </li>
      </motion.ul>
    </div>

    <div>
      <h2 className='text-lg mb-3 text-teal-600 font-semibold'>Paid</h2>
      <motion.ul
        animate={{
          y: [-5, 0],
        }}
        transition={{
          delay: 0.2,
          duration: 0.25,
        }}
      >
        <li className='underline mb-3 text-blue-700 hover:text-teal-600'>
          <a
            href='https://egghead.io/?rc=84jyz'
            target='_blank'
            rel='noopener noreferrer'
          >
            Egghead.io
          </a>
        </li>

        <li className='underline mb-3 text-blue-700 hover:text-teal-600'>
          <a
            href='https://wesbos.com/courses/'
            target='_blank'
            rel='noopener noreferrer'
          >
            Wes Bos Courses
          </a>
        </li>

        <li className='underline mb-3 text-blue-700 hover:text-teal-600'>
          <a
            href='https://www.leveluptutorials.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            LevelUpTutorials
          </a>
        </li>

        <li className='underline mb-3 text-blue-700 hover:text-teal-600'>
          <a
            href='https://teamtreehouse.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            Team Treehouse
          </a>
        </li>

        <li className='underline mb-3 text-blue-700 hover:text-teal-600'>
          <a
            href='https://adamlearns.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            Adam Learns
          </a>
        </li>

        <li className='underline mb-3 text-blue-700 hover:text-teal-600'>
          <a
            href='https://udemy.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            Udemy
          </a>
        </li>

        <li className='underline mb-3 text-blue-700 hover:text-teal-600'>
          <a
            href='https://frontendmasters.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            Frontend Masters
          </a>
        </li>
      </motion.ul>
    </div>
    <motion.div />
  </Layout>
)

export default LearningResources
