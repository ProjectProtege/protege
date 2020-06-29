import React from 'react'
import { motion } from 'framer-motion'
import Layout from '../layouts/Layout'

const LearningResources = () => (
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
    >
      <h1 className='text-2xl font-semibold text-blue-500 mb-6'>
        Learning Resources
      </h1>

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
          <li className='underline mb-3 text-blue-300 hover:text-teal-600'>
            <a href='https://www.freecodecamp.org/' target='_blank'>
              FreeCodeCamp
            </a>
          </li>

          <li className='underline mb-3 text-blue-300 hover:text-teal-600'>
            <a
              href='https://egghead.io/courses/the-beginner-s-guide-to-react'
              target='_blank'
            >
              The Beginner's Guide to React
            </a>
          </li>

          <li className='underline mb-3 text-blue-300 hover:text-teal-600'>
            <a
              href='https://www.youtube.com/channel/UCyIe-61Y8C4_o-zZCtO4ETQ'
              target='_blank'
            >
              Devtips
            </a>
          </li>

          <li className='underline mb-3 text-blue-300 hover:text-teal-600'>
            <a href='https://www.youtube.com/user/QuentinWatt' target='_blank'>
              Quentin Watt Tutorials
            </a>
          </li>

          <li className='underline mb-3 text-blue-300 hover:text-teal-600'>
            <a href='https://www.youtube.com/user/wesbos' target='_blank'>
              Wes Bos Youtube
            </a>
          </li>

          <li className='underline mb-3 text-blue-300 hover:text-teal-600'>
            <a
              href='https://www.youtube.com/channel/UCyU5wkjgQYGRB0hIHMwm2Sg'
              target='_blank'
            >
              LevelUp Tutorials Youtube
            </a>
          </li>

          <li className='underline mb-3 text-blue-300 hover:text-teal-600'>
            <a
              href='https://www.youtube.com/channel/UC-T8W79DN6PBnzomelvqJYw'
              target='_blank'
            >
              James Quick Youtube
            </a>
          </li>

          <li className='underline mb-3 text-blue-300 hover:text-teal-600'>
            <a
              href='https://www.levelupfinancialplanning.com/videos/'
              target='_blank'
            >
              Level Up Financial Planning
            </a>
          </li>

          <li className='underline mb-3 text-blue-300 hover:text-teal-600'>
            <a href='https://www.codecademy.com/' target='_blank'>
              Codecademy (Freemium)
            </a>
          </li>

          <li className='underline mb-3 text-blue-300 hover:text-teal-600'>
            <a href='https://www.youtube.com/user/TechGuyWeb' target='_blank'>
              Traversy Media
            </a>
          </li>

          <li className='underline mb-3 text-blue-300 hover:text-teal-600'>
            <a
              href='https://www.youtube.com/user/programmingwithmosh'
              target='_blank'
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
          <li className='underline mb-3 text-blue-300 hover:text-teal-600'>
            <a href='https://egghead.io/?rc=84jyz' target='_blank'>
              Egghead.io
            </a>
          </li>

          <li className='underline mb-3 text-blue-300 hover:text-teal-600'>
            <a href='https://wesbos.com/courses/' target='_blank'>
              Wes Bos Courses
            </a>
          </li>

          <li className='underline mb-3 text-blue-300 hover:text-teal-600'>
            <a href='https://www.leveluptutorials.com/' target='_blank'>
              LevelUpTutorials
            </a>
          </li>

          <li className='underline mb-3 text-blue-300 hover:text-teal-600'>
            <a href='https://teamtreehouse.com/' target='_blank'>
              Team Treehouse
            </a>
          </li>

          <li className='underline mb-3 text-blue-300 hover:text-teal-600'>
            <a href='https://adamlearns.com/' target='_blank'>
              Adam Learns
            </a>
          </li>

          <li className='underline mb-3 text-blue-300 hover:text-teal-600'>
            <a href='https://udemy.com/' target='_blank'>
              Udemy
            </a>
          </li>

          <li className='underline mb-3 text-blue-300 hover:text-teal-600'>
            <a href='https://frontendmasters.com/' target='_blank'>
              Frontend Masters
            </a>
          </li>
        </motion.ul>
      </div>
    </motion.div>
  </Layout>
)

export default LearningResources
