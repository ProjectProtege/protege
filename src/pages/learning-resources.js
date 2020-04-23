import React from 'react'

const LearningResources = () => (
  <div
    className='container mx-auto pt-32 px-2 md:px-0 text-center'
    style={{ maxWidth: 680 }}
  >
    <h1 className='text-2xl font-semibold text-teal-600 mb-6'>
      Learning Resources
    </h1>

    <div className='mb-12'>
      <h2 className='text-lg mb-3 text-teal-600 font-semibold'>Free</h2>
      <ul>
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
      </ul>
    </div>

    <div>
      <h2 className='text-lg mb-3 text-teal-600 font-semibold'>Paid</h2>
      <ul>
        <li className='underline mb-3 text-blue-300 hover:text-teal-600'>
          <a href='https://egghead.io/'>Egghead.io</a>
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
      </ul>
    </div>
  </div>
)

export default LearningResources
