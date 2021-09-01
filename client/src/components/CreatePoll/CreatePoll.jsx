import React from "react";
import CustomInput from "./CustomInput";
import "./createPoll.scss";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

export default function CreatePoll() {
  const history = useHistory();
  const userId = useSelector(state => state.loginState.user.id)
  const token = useSelector(state => state.loginState.token);
  const isLoggedIn = useSelector(state => state.loginState.isLoggedIn)
  console.log(isLoggedIn)

  const [options, setOptions] = useState([
    { label: "Poll option", placeholder: "", id: 1, value: "" },
    { label: "Poll option", placeholder: "", id: 2, value: "" },
    { label: "Poll option", placeholder: "", id: 3, value: "" },
  ]);

  const [question, setQuestion] = useState();

  const handleClickAddOption = () => {
    setOptions([
      ...options,
      {
        label: "Poll option",
        placeholder: "Another option",
        id: options.length !== 0 ? options[options.length - 1].id + 1 : 1,
      },
    ]);
  };
  const handleCreate = () => {
    const pollOptions = options.map((opt) => {
      return opt.value;
    });
    const data = {
      authorId: userId,
      pollHeader: document.getElementById("question").value,
      options: pollOptions,
    };
    fetch("/api/poll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": "Bearer " + token
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        const pollId = data._id;
        history.push('/poll/' + pollId)

      })
      .catch((error) => {
        console.error("Error:", error);
      });

  };

  useEffect(() => {
    if (isLoggedIn === false) {
      sessionStorage.setItem('msg','You need to login first')
      history.push('/login')
    }
  }, [isLoggedIn])

  return (
    <div>
      <div className="bodyContainer">
        <h1>Create Poll</h1>
        <p id="info">Complete the below fields to complete your poll.</p>

        <CustomInput
          question={question}
          setQuestion={setQuestion}
          label="Poll Question"
          placeholder=""
          options={options}
          setOptions={setOptions}
        />

        {options.map((option) => (
          <CustomInput
            key={option.id}
            options={options}
            setOptions={setOptions}
            label={option.label}
            id={option.id}
            placeholder={option.placeholder}
          />
        ))}

        <button onClick={handleClickAddOption} id="addOption">
          Add Option
        </button>
        <button onClick={handleCreate} id="createPoll">
          Create poll
        </button>
      </div>

    </div>
  );
}
