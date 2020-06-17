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
            <a href='https://www.freecodecamp.org/'>FreeCodeCamp</a>
          </li>

          <li className='underline mb-3 text-blue-300 hover:text-teal-600'>
            <a href='https://egghead.io/courses/the-beginner-s-guide-to-react'>
              The Beginner's Guide to React
            </a>
          </li>

          <li className='underline mb-3 text-blue-300 hover:text-teal-600'>
            <a href='https://www.youtube.com/channel/UCyIe-61Y8C4_o-zZCtO4ETQ'>
              Devtips
            </a>
          </li>

          <li className='underline mb-3 text-blue-300 hover:text-teal-600'>
            <a href='https://www.youtube.com/user/QuentinWatt'>
              Quentin Watt Tutorials
            </a>
          </li>

          <li className='underline mb-3 text-blue-300 hover:text-teal-600'>
            <a href='https://www.youtube.com/user/wesbos'>Wes Bos Youtube</a>
          </li>

          <li className='underline mb-3 text-blue-300 hover:text-teal-600'>
            <a href='https://www.youtube.com/channel/UCyU5wkjgQYGRB0hIHMwm2Sg'>
              LevelUp Tutorials Youtube
            </a>
          </li>

          <li className='underline mb-3 text-blue-300 hover:text-teal-600'>
            <a href='https://www.youtube.com/channel/UC-T8W79DN6PBnzomelvqJYw'>
              James Quick Youtube
            </a>
          </li>

          <li className='underline mb-3 text-blue-300 hover:text-teal-600'>
            <a href='https://www.levelupfinancialplanning.com/videos/'>
              Level Up Financial Planning
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
            <a href='https://egghead.io/?rc=84jyz'>Egghead.io</a>
          </li>

          <li className='underline mb-3 text-blue-300 hover:text-teal-600'>
            <a href='https://wesbos.com/courses/'>Wes Bos Courses</a>
          </li>

          <li className='underline mb-3 text-blue-300 hover:text-teal-600'>
            <a href='https://www.leveluptutorials.com/'>LevelUpTutorials</a>
          </li>

          <li className='underline mb-3 text-blue-300 hover:text-teal-600'>
            <a href='https://teamtreehouse.com/'>Team Treehouse</a>
          </li>

          <li className='underline mb-3 text-blue-300 hover:text-teal-600'>
            <a href='https://adamlearns.com/'>Adam Learns</a>
          </li>
        </motion.ul>
      </div>
    </motion.div>
  </Layout>
)

export default LearningResources
