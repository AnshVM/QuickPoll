import React from "react";
import Navbar from "../navbar/Navbar";
import { useState, useEffect, } from "react";
import { useParams } from "react-router-dom";
import PollOption from "./PollOption";
import './poll.scss'
import { useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import { useHistory } from 'react-router-dom'

function PollContent({ selectedOption, setSelectedOption, pollData, voteSubmitted }) {

  return (
    <div className="pollContent">
      <h1>{pollData.pollHeader ? pollData.pollHeader : ""}</h1>
      {pollData.pollOptions ? pollData.pollOptions.map((pollOption) => (
        <PollOption
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          key={pollOption._id}
          pollOption={pollOption}
          totalVotes={pollData.totalVotes}
          voteSubmitted={voteSubmitted}
        />
      )) : ""}
    </div>
  );
}

export default function Poll({ socket }) {

  let { id } = useParams();

  const [open, setOpen] = useState(false);
  const [pollData, setPollData] = useState({ pollHeader: "", pollOptions: [] });
  const [selectedOption, setSelectedOption] = useState();
  const [voteSubmitted, setVoteSubmitted] = useState("") //"" or optionId
  const [error, setError] = useState("")
  console.log(sessionStorage.getItem)
  let history = useHistory();
  const user = useSelector((state) => state.loginState.user);
  const isLoggedIn = useSelector((state) => state.loginState.isLoggedIn)
  console.log(isLoggedIn)

  socket.on('POLL_UPDATE', (data) => {
    setPollData(data);
  })

  const handleCopyLink = () => {
    const link = window.location.href;
    navigator.clipboard.writeText(link);
    setOpen(true);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };


  const handleVote = () => {
    if (!selectedOption) {
      return setError("Please select an option.")
    }
    else {

      setError("");

      const data = {
        optionId: selectedOption._id,
        updatedOptionVotes: selectedOption.votes + 1,
        updatedTotalVotes: pollData.totalVotes + 1,
        userId: user.id,
      }

      fetch('/api/poll/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          setPollData(data.poll);
          socket.emit('POLL_UPDATE', data.poll);
        })

    }
  }

  const checkUserIsAdmin = (data) => {
    return data.authorId === user.id
  }

  const checkVoteSubmitted = (data) => {
    let ans = false;
    data.userVotedPolls.forEach((userVotedPoll) => {
      if (userVotedPoll.pollId === id) {
        ans = true;
      }
    })
    setVoteSubmitted(ans)
    return ans;
  }

  useEffect(() => {
    fetch('/api/poll/' + id)
      .then(res => {
        if(res.status===401){
          sessionStorage.setItem('pollId',id)
          history.push('/login')
        }
        else{
          return res.json()
        }
      })
      .then(data => {
        setPollData(data);
        console.log(data)
      })
  }, [])

  useEffect(() => {
    console.log(user)
    if (user.id) {
      fetch('/api/user/' + user.id)
        .then(res => res.json())
        .then((data) => {
          console.log(checkVoteSubmitted(data))
        })
    }
  }, [user, pollData])


  return (
    <div>
      <Navbar />
      <div className="mainBody">
        <PollContent
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          pollId={id}
          pollData={pollData}
          voteSubmitted={voteSubmitted}
        />
        <div className="sideBody">
          <p>{voteSubmitted && "Your vote has been submitted"}</p>
          <p>{error}</p>
          {(!checkUserIsAdmin(pollData) && !voteSubmitted) && <button onClick={handleVote} className="vote">Submit vote</button>}
          <p>Share the poll using a link</p>
          <button className="copy" onClick={handleCopyLink}>Copy Link</button>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            message="Link copied"
          />
        </div>
      </div>
    </div>
  );
}
