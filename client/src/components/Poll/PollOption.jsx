import React from 'react'
import './pollOption.scss'
import LinearWithValueLabel from './LinearWithValuLabel'

export default function PollOption({totalVotes,setSelectedOption,pollOption,voteSubmitted}) {

    const percentage = totalVotes===0 ? 0 : (pollOption.votes/totalVotes)*100;
    const handleClick = () => {
        if(voteSubmitted) return;
        document.querySelectorAll('.pollOption').forEach((option)=>{
            option.style.border = "none"
        })
        document.getElementById(pollOption._id).style.border = "green 2px solid";
        setSelectedOption(pollOption)
    }

    return (
        <div id={pollOption._id} onClick={handleClick} className="pollOption">
            <h2>{pollOption.option}</h2>
            <LinearWithValueLabel value={percentage} />
            <p>{pollOption.votes}</p>
        </div>
    )
}
