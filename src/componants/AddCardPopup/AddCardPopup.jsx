import React, { useState, useEffect, useRef } from "react";
import Style from "./AddCardPopup.module.css";
import del from "../../assets/icon/Delete.svg";
import CustomCheckboxe from "../customCheckBox/CustomCheckboxe";
import { postTask,editTask } from "../../api/task";

function AddCardPopup({ setAddbtn,data,setEdit,edit,setFetchTasks }) {
  const [priority, setpriority] = useState(data?.priority  || "");
  const [title, setTitle] = useState(data?.title || '');
  const [datebtn, setdatebtn] = useState(false);
  const [dueDate, setdueDate] = useState(data?.dueDate || '' );
  const [backgroundColor1, setBackgroundColor1] = useState("white");
  const [backgroundColor2, setBackgroundColor2] = useState("white");
  const [backgroundColor3, setBackgroundColor3] = useState("white");

  const handleCalender = (event) => {
    const inputDate = event.target.value;
    // Formatind the date in this format mm/dd/yyyy
    const formatDate = inputDate.split("-");
    const formattedDate = `${formatDate[1]}/${formatDate[2]}/${formatDate[0]}`;
    setdatebtn(false);
    setdueDate(formattedDate);
  };

  const [todos, setTodos] = useState(data?.todos || [] );

  const handleDelete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const handleTextChange = (index, text) => {
    const updatedTodos = [...todos];
    updatedTodos[index].text = text;
    setTodos(updatedTodos);
  };

  const handleCheckChange = (index, checked) => {
    const updatedTodos = [...todos];
    updatedTodos[index].checked = checked;
    setTodos(updatedTodos);
  };

  const addTodo = () => {
    setTodos([...todos, { text: " " , checked:false }]);
  };

  const userId = JSON.parse(localStorage.getItem('userId'))

  const handleSubmit = async()=>{
    
    if(edit){
      const taskId=data?._id;
      await editTask({taskId,userId,title,priority,todos,dueDate})
      setEdit(false)
      setFetchTasks(true)
    }
    else{
     await postTask({userId,title,priority,todos,dueDate});
      setAddbtn(false)
      setFetchTasks(true)
    }
    
    
  }
  return (
    <div className={Style.popupBackground}>
      <div className={Style.popup}>
        <div className={Style.TittlePriority}>
          <label htmlFor="cardTitle">
            <p className={Style.title}>
              Tittle<span>*</span>
            </p>
            <input
              className={Style.Input}
              type="text"
              id="cardTittle"
              placeholder="Enter Task Title"
              value={title}
              name="title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <div className={Style.priorityContainer}>
            <p className={Style.selPriority}>
              Select&nbsp;Priority<span>*</span>
            </p>
            <div className={Style.priorityContainerbtn}>
              <button
                style={{ background: backgroundColor1 }}
                onClick={() => {
                  setpriority("HIGH");
                  setBackgroundColor1("#EEECEC");
                  setBackgroundColor2("white");
                  setBackgroundColor3("white");
                }}
              >
                <p className={Style.StateRed}></p>
                <p className={Style.btntxt}>HIGH PRIORITY</p>
              </button>
              <button
                style={{ background: backgroundColor2 }}
                onClick={() => {
                  setpriority("MODERATE");
                  setBackgroundColor1("white");
                  setBackgroundColor2("#EEECEC");
                  setBackgroundColor3("white");
                }}
              >
                <p className={Style.StateBlue}></p>
                <p className={Style.btntxt}>MODERATE PRIORITY</p>
              </button>
              <button
                style={{ background: backgroundColor3 }}
                onClick={() => {
                  setpriority("LOW");
                  setBackgroundColor1("white");
                  setBackgroundColor2("white");
                  setBackgroundColor3("#EEECEC");
                }}
              >
                <p className={Style.StateGreen}></p>
                <p className={Style.btntxt}>LOW PRIORITY</p>
              </button>
            </div>
          </div>
        </div>
        <div className={Style.checkList}>
          <p>
            CheckList &#10088; {0}/{todos.length} &#10089; <span>*</span>
          </p>
          <div className={Style.parentScrollDiv}>
            <div className={Style.ScrollAddNew}>
              {todos.map((todo, index) => (
                <div key={index} style={{ height: "60px" }}>
                  <button
                    className={Style.deletebtn}
                    onClick={() => handleDelete(index)}
                  >
                    <img src={del} alt="delete" />
                  </button>
                  <div className={Style.checkbox}>
                    <CustomCheckboxe
                      checked={todo.checked}
                      onChange={(checked) => handleCheckChange(index, checked)}
                    />
                  </div>
                  <input
                    className={Style.TodoInput}
                    type="text"
                    value={todo.text}
                    onChange={(e) => handleTextChange(index, e.target.value)}
                    required
                  />
                </div>
              ))}
            </div>
          </div>
          <button className={Style.addNewBtn} onClick={addTodo}>
            <span className={Style.plus}>+</span> Add New
          </button>
        </div>
        <div className={Style.btnsCalender}>
          <input
            type={datebtn ? "date" : "text"}
            value={dueDate}
            onChange={handleCalender}
            className={Style.calender}
            placeholder="Select Due Date"
            onClick={() => setdatebtn(true)}
          />
          <div className={Style.popupBtns}>
            <button
              className={Style.cancelBtn}
              onClick={(e) => 
                { 
                  e.stopPropagation()
                  edit? setEdit(false):setAddbtn(false);}}
            >
              Cancel
            </button>
            <button className={Style.saveBtn} onClick={(e)=>{
              e.stopPropagation()
              handleSubmit()}}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCardPopup;
