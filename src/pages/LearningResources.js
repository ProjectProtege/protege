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

    <div className='mb-12'>
      <motion.ul
        animate={{
          y: [-5, 0],
        }}
        transition={{
          delay: 0.1,
          duration: 0.25,
        }}
      >
      
      <div class="relative justify-between max-w-7xl mx-auto">
        <div class="text-center">
          <h2 class="text-3xl leading-9 tracking-tight font-extrabold text-blue-900 sm:text-4xl sm:leading-10">
            From the blog
          </h2>
          <p class="mt-3 max-w-md mx-auto text-xl leading-7 text-blue-700 sm:mt-4">
            We've pulled some of the best free, and paid, resources together to help support your journey. 
          </p>
          <p class="mt-3 max-w-md mx-auto text-xl leading-7 text-blue-700 sm:mt-4">
            Got a resource you think we should add to the list? @ us!
          </p>
        </div>
          <div className='flex flex-row flex-wrap justify-center'>
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
              tag='free'
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

            <ResourceCard
              title='James Quick Youtube'
              resourceimg='jamesquick.jpg'
              tag='free'
              description='Want to learn more about Web Development, Design, and Tools?  Then, youre in the right place! I LEARN the newest techniques in Web Development, Design, and Tools. I BUILD projects for myself and others.'
              resourceurl='youtube.com/channel/UC-T8W79DN6PBnzomelvqJYw'
            />

            <ResourceCard
              title='Level Up Financial Planning'
              resourceimg='level-up.jpg'
              tag='free'
              description='Fee only financial planner (fiduciary) virtually out of Fort Collins. Lucas can help you achieve confidence to take Your Financial Confidence to the Next Level.'
              resourceurl='levelupfinancialplanning.com/videos/'
            />

            <ResourceCard
              title='Codecademy (Freemium)'
              resourceimg='codecademy.jpg'
              tag='free'
              description='Committed to building the best learning experience inside and out, making Codecademy the best place for our team to learn, teach, and create the online learning experience of the future.'
              resourceurl='codecademy.com'
            />

            <ResourceCard
              title='Traversy Media'
              resourceimg='traversy.jpg'
              tag='free'
              description='Traversy Media features the best online web development and programming tutorials for all of the latest web technologies including Node.js, Angular 2, React.js, PHP, Rails, HTML, CSS and much more.'
              resourceurl='youtube.com/user/TechGuyWeb'
            />

            <ResourceCard
              title='Programming With Mosh'
              resourceimg='mosh.jpg'
              tag='free'
              description='I train professional software engineers that companies love to hire. Javascript, React, React Native, Node, Angular, Python, C Sharp'
              resourceurl='youtube.com/user/programmingwithmosh'
            />
          </div>
        </div>
      </motion.ul>
    </div>

    
  </Layout>
)

export default LearningResources
