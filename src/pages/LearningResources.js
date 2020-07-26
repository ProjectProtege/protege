import React from 'react'
import { motion } from 'framer-motion'
import Layout from '../layouts/Layout'
import ResourceCard from '../components/ResourceCard'

const LearningResources = (url) => (
  <Layout>
    <div className='container m-auto max-w-screen-xl align-middle mt-32 sm:max-w-screen-lg'>
      <div class='relative px-12 text-center mx-auto my-10 sm:px-40 lg:px-32'>
        <h2 class='text-2xl leading tracking-tight font-extrabold text-blue-900 sm:leading-10 sm:text-3xl'>
          Learning Resources
        </h2>
        <p className='text-base mb-2 text-blue-700 sm:mt-4 sm:px-12 sm:text-base md:text-base'> We've pulled some of the best free, and paid, resources together to help support your journey.
        </p>
        <p className='text-base text-blue-700 sm:mt-4 sm:text-base md:text-base'> Got a resource you think we should add to the list?{' '}
          <a className='underline' href={'https://twitter.com/DevProtege'}>
            {' '}
            Reach out!
          </a>
        </p>
      </div>

      <div className='container justify-start my-4 px-8 border-b-1'>
        <h3 className='text-xl text-blue-900 sm:text-2xl md:text-3xl'>Free Resources</h3>
      </div>

      <div className='content-center flex grid-flow-col flex-wrap'>
        <ResourceCard
          title='FreeCodeCamp'
          resourceimg='freecodecamp.jpg'
          tag='free'
          description='A nonprofit community that helps you learn to code by building projects. Learn to code by completing coding challenges and building projects. Earn verified certifications along the way.'
          resourceurl='freecodecamp.org'
        />
        <ResourceCard
          title='The Beginner&#39;s Guide to React'
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
          resourceimg='levelup-fin.jpg'
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

        <div className='container justify-start my-4 px-8 border-b-1'>
          <h3 className='text-xl text-blue-900 sm:text-2xl md:text-3xl'>Paid Resources</h3>
        </div>

        <div className='content-center flex grid-flow-col flex-wrap'>
          <ResourceCard
            title='Egghead.io'
            resourceimg='egghead.jpg'
            tag='paid'
            description='Learn the best JavaScript tools and frameworks from industry pros. Egghead is a group of working web development professionals and open source contributors that provide concise, information dense video courses on the best tools in the industry.'
            resourceurl='egghead.io/?rc=84jyz'
          />
          <ResourceCard
            title='Wes Bos Courses'
            resourceimg='wesbos-youtube.jpg'
            tag='paid'
            description='I&#39;m a full Stack JavaScript developer from Canada. I create free + premium courses and do a twice-weekly podcast called Syntax. You can read more about me here, but stick around if you like CSS, JavaScript, mediocre jokes, learning new things or BBQ Tips'
            resourceurl='wesbos.com/courses'
          />
          <ResourceCard
            title='LevelUp Tutorials'
            resourceimg='levelup.jpg'
            tag='paid'
            description='Level Up Tutorials sets how to help fix a major problem in learning technologies. The lack of in-depth, basic tutorials that teach more than just what to type when. Level Up Tutorials are aimed to be accessible and easy to follow while maintaining high production values.'
            resourceurl='leveluptutorials.com'
          />

          <ResourceCard
            title='Team Treehouse'
            resourceimg='treehouse.jpg'
            tag='paid'
            description='Our mission is to diversify the tech industry through accessible education and apprenticeship, unlocking the door to opportunity and empowering people to achieve their dreams. We will do this by training and placing people from all backgrounds into apprenticeships. '
            resourceurl='teamtreehouse.com'
          />

          <ResourceCard
            title='Adam Learns'
            resourceimg='adam-learns.jpg'
            tag='paid'
            description='A premium library of learning material that is created in front of a live audience. Watch courses live on Twitch and influence the decision-making process, access videos, course notes and code repositories—all the material to get started quickly.'
            resourceurl='adamlearns.com'
          />

          <ResourceCard
            title='Udemy'
            resourceimg='udemy.jpg'
            tag='paid'
            description='Udemy is the leading global marketplace for teaching and learning, connecting millions of students to the skills they need to succeed. Udemy is helping individuals reach their goals and pursue their dreams.'
            resourceurl='udemy.com'
          />

          <ResourceCard
            title='Frontend Masters'
            resourceimg='frontendmasters.jpg'
            tag='paid'
            description='Advance your skills with in-depth, modern JavaScript and front-end engineering courses. Start with the Front End Bootcamp, or dive into popular frameworks such as: React, Vue, Angular, and more.'
            resourceurl='frontendmasters.com'
          />
        </div>
      </div>
    </div>
  </Layout>
)

export default LearningResources
