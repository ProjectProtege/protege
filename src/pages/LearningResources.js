import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import ResourceCard from '../components/ResourceCard'

const freeResources = [
  {
    id: 1,
    title: 'FreeCodeCamp',
    resourceImage: 'freecodecamp.jpg',
    description:
      'A nonprofit community that helps you learn to code by building projects. Learn to code by completing coding challenges and building projects. Earn verified certifications along the way.',
    resourceUrl: 'freecodecamp.org',
  },
  {
    id: 2,
    title: "The Beginner's Guide to React",
    resourceImage: 'beg-guide-react.jpg',
    description:
      'This course is for React newbies and anyone looking to build a solid foundation. It’s designed to teach you everything you need to start building web applications in React right away.',
    resourceUrl: 'egghead.io/courses/the-beginner-s-guide-to-react',
  },
  {
    id: 3,
    title: 'Devtips',
    resourceImage: 'devtips.jpg',
    description:
      'DevTips is a weekly show for YOU who want to be inspired and learn about programming. Hosted by David and MPJ - two notorious bug generators and teachers.',
    resourceUrl: 'youtube.com/c/DevTipsForDesigners',
  },
  {
    id: 4,
    title: 'Quentin Watts Tutorials',
    resourceImage: 'quentin.jpg',
    description:
      'Learn how to code JavaScript, and PHP using popular frameworks like Vue.js and Laravel. Aimed at equipping you with the skills you need to develop your career.',
    resourceUrl: 'youtube.com/user/QuentinWatt',
  },
  {
    id: 5,
    title: 'Wes Bos Youtube',
    resourceImage: 'wesbos-youtube.jpg',
    description:
      'A full Stack JavaScript developer from Canada I create free + premium courses and do a twice-weekly podcast called Syntax. HTML, CSS, JavaScript and WordPress web development tutorials!',
    resourceUrl: 'youtube.com/user/wesbos',
  },
  {
    id: 6,
    title: 'LevelUp Tutorials Youtube',
    resourceImage: 'level-up.jpg',
    description:
      'Level Up Tutorials sets how to help fix a major problem in learning technologies. Videos created for Level Up Tutorials are aimed to be accessible and easy to follow while maintaining high production values.',
    resourceUrl: 'youtube.com/channel/UCyU5wkjgQYGRB0hIHMwm2Sg',
  },
  {
    id: 7,
    title: 'James Quick Youtube',
    resourceImage: 'jamesquick.jpg',
    description:
      'Want to learn more about Web Development, Design, and Tools?  Then, youre in the right place! I LEARN the newest techniques in Web Development, Design, and Tools. I BUILD projects for myself and others.',
    resourceUrl: 'youtube.com/channel/UC-T8W79DN6PBnzomelvqJYw',
  },
  {
    id: 8,
    title: 'Level Up Financial Planning',
    resourceImage: 'levelup-fin.jpg',
    description:
      'Fee only financial planner (fiduciary) virtually out of Fort Collins. Lucas can help you achieve confidence to take Your Financial Confidence to the Next Level.',
    resourceUrl: 'levelupfinancialplanning.com/videos/',
  },
  {
    id: 9,
    title: 'Codecademy (Freemium)',
    resourceImage: 'codecademy.jpg',
    description:
      'Committed to building the best learning experience inside and out, making Codecademy the best place for our team to learn, teach, and create the online learning experience of the future.',
    resourceUrl: 'codecademy.com',
  },
  {
    id: 10,
    title: 'Traversy Media',
    resourceImage: 'traversy.jpg',
    description:
      'Traversy Media features the best online web development and programming tutorials for all of the latest web technologies including Node.js, Angular 2, React.js, PHP, Rails, HTML, CSS and much more.',
    resourceUrl: 'youtube.com/user/TechGuyWeb',
  },
  {
    id: 11,
    title: 'Programming With Mosh',
    resourceImage: 'mosh.jpg',
    description:
      'I train professional software engineers that companies love to hire. Javascript, React, React Native, Node, Angular, Python, C Sharp',
    resourceUrl: 'youtube.com/user/programmingwithmosh',
  },
]

const paidResources = [
  {
    id: 1,
    title: 'Egghead.io',
    resourceImage: 'egghead.jpg',
    description:
      'Learn the best JavaScript tools and frameworks from industry pros. Egghead is a group of working web development professionals and open source contributors that provide concise, information dense video courses on the best tools in the industry.',
    resourceUrl: 'egghead.io/?rc=84jyz',
  },
  {
    id: 2,
    title: 'Wes Bos Courses',
    resourceImage: 'wesbos.jpg',
    description:
      "I'm a full Stack JavaScript developer from Canada. I create free + premium courses and do a twice-weekly podcast called Syntax. You can read more about me here, but stick around if you like CSS, JavaScript, mediocre jokes, learning new things or BBQ Tips",
    resourceUrl: 'wesbos.com/courses',
  },
  {
    id: 3,
    title: 'LevelUp Tutorials',
    resourceImage: 'levelup.jpg',
    description:
      'Level Up Tutorials sets how to help fix a major problem in learning technologies. The lack of in-depth, basic tutorials that teach more than just what to type when. Level Up Tutorials are aimed to be accessible and easy to follow while maintaining high production values.',
    resourceUrl: 'leveluptutorials.com',
  },
  {
    id: 4,
    title: 'Team Treehouse',
    resourceImage: 'treehouse.jpg',
    description:
      'Our mission is to diversify the tech industry through accessible education and apprenticeship, unlocking the door to opportunity and empowering people to achieve their dreams. We will do this by training and placing people from all backgrounds into apprenticeships.',
    resourceUrl: 'teamtreehouse.com',
  },
  {
    id: 5,
    title: 'Adam Learns',
    resourceImage: 'adam-learns.jpg',
    description:
      'A premium library of learning material that is created in front of a live audience. Watch courses live on Twitch and influence the decision-making process, access videos, course notes and code repositories—all the material to get started quickly.',
    resourceUrl: 'adamlearns.com',
  },
  {
    id: 6,
    title: 'Udemy',
    resourceImage: 'udemy.jpg',
    description:
      'Udemy is the leading global marketplace for teaching and learning, connecting millions of students to the skills they need to succeed. Udemy is helping individuals reach their goals and pursue their dreams.',
    resourceUrl: 'udemy.com',
  },
  {
    id: 7,
    title: 'Frontend Masters',
    resourceImage: 'frontendmasters.jpg',
    description:
      'Advance your skills with in-depth, modern JavaScript and front-end engineering courses. Start with the Front End Bootcamp, or dive into popular frameworks such as: React, Vue, Angular, and more.',
    resourceUrl: 'frontendmasters.com',
  },
]

const LearningResources = () => (
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
    <div className='relative px-12 text-center mx-auto my-10 sm:px-40 lg:px-32'>
      <h2 className='text-2xl leading tracking-tight font-extrabold text-blue-900 sm:leading-10 sm:text-3xl'>
        Learning Resources
      </h2>
      <p className='text-base mb-2 text-blue-700 sm:mt-4 sm:px-12 sm:text-base md:text-base'>
        {' '}
        We&apos;ve pulled some of the best free, and paid, resources together to
        help support your journey.
      </p>
      <p className='text-base text-blue-700 sm:mt-4 sm:text-base md:text-base'>
        {' '}
        Got a resource you think we should add to the list?&nbsp;
        <Link
          to={ROUTES.GET_IN_TOUCH}
          className='underline mb-3 text-blue-900 hover:text-teal-600'
        >
          Reach out!
        </Link>
      </p>
    </div>

    <div className='container mx-auto text-center md:text-left my-4 px-8'>
      <div>
        <h3 className='text-2xl font-bold text-blue-900 md:text-3xl mb-6'>
          Free Resources
        </h3>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 '>
          {freeResources.map((resource) => (
            <ResourceCard resource={resource} key={resource.id} />
          ))}
        </div>
      </div>

      <div className='mt-20'>
        <h3 className='text-2xl font-bold text-blue-900 md:text-3xl mb-6'>
          Paid Resources
        </h3>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {paidResources.map((resource) => (
          <ResourceCard resource={resource} key={resource.id} />
        ))}
      </div>
    </div>
  </motion.div>
)

export default LearningResources
