import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import * as ROUTES from '../constants/routes'




const FindYourNext = () => {
    const nextWords = ["10x'er", "opportunity", "superstar", "time to shine"]
    const [word, setWord] = useState(0)
    setTimeout( () => {
        setWord((word + 1 ) % nextWords.length)
    }, 2500);

    return (
        <div class='flex justify-center mt-8'>
            <div class='flex items-center'>
                <div class='flex-col text-gray-800 font-bold text-4xl'>Find your next</div>
                <div class="flex flex-col text-gray-800 text-center text-2xl  ml-2 font-mono w-64" style={{borderBottom: '3px solid #54AF8E'}}>{nextWords[word]}</div>
            </div>
        </div>
    )
}
  
  export default FindYourNext