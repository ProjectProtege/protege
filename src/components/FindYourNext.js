import React, { useState } from 'react'


const FindYourNext = () => {
    const nextWords = ["10x'er", "Opportunity", "Blue Chip", "Moment", "Prospect"]
    const [word, setWord] = useState(0)
    setTimeout( () => {
        setWord((word + 1 ) % nextWords.length)
    }, 2500);

    return (
        <div className='flex justify-center mt-8'>
            <div className='md:flex items-center'>
                <div className='flex-col text-gray-800 font-bold text-5xl'>Find your next </div>

                <div className="flex flex-col text-gray-800 text-center text-3xl  ml-2 font-mono" style={{borderBottom: '3px solid #54AF8E', width: 300}}>{nextWords[word]}</div>
            </div>
        </div>
    )
}
  
  export default FindYourNext