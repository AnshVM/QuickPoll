import React from "react";
import "./customInput.scss";
import DeleteIcon from "@material-ui/icons/Delete";

export default function CustomInput({
  setQuestion,
  question,
  id,
  options,
  setOptions,
  label,
  placeholder,
}) {

  const handleDelete = () => {
    if (!id) return;
    setOptions((options) => {
      return options.filter((option) => option.id !== id);
    });
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.id === "question") {
      setQuestion(e.target.value);
    }else{
      const newState = [...options];
      newState.forEach((opt)=>{
        if(opt.id===id) opt.value=e.target.value
      })
      setOptions(newState)
    }
  };

  if (id) {
    return (
      <div id={id} className="inputContainer">
        <p>{label}</p>
        <textarea
          onChange={handleChange}
          id={id}
          placeholder={placeholder}
          value={options.find(opt=>opt.id===id).value}
        ></textarea>
        <DeleteIcon onClick={handleDelete} />
      </div>
    );
  } else {
    return (
      <div className="inputContainer">
        <p>{label}</p>
        <textarea
          value={question}
          id="question"
          onChange={handleChange}
          placeholder={placeholder}
        ></textarea>
      </div>
    );
  }
}
