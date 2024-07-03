import React, { useState,useEffect } from "react";
import Style from "./DataCard.module.css";
import DownArrow from "../../assets/icon/DownArrow.svg";
import UpArrow from "../../assets/icon/UpArrow.svg";
import CustomeCheckboxe from "../customCheckBox/CustomCheckboxe";
import { moveToBlog,deleteTask } from "../../api/task";
import AddCardPopup from '../AddCardPopup/AddCardPopup'





function DataCard({ cardData,setshare,setFetchTasks,Collapseall }) {
  const [showTask, setshowTask] = useState(false);
  const [showOptions, setshowOptions] = useState(false);
  const [data, setdata] = useState(cardData);
  const [backForDue, setBackForDue] = useState(false)
  const [deletePopup, setdeletePopup] = useState(false)
  const [colorDone, setcolorDone] = useState('')
  const [edit, setEdit] = useState(false)

  useEffect(()=>{
   data?.blog ==='3'?setcolorDone('#63C05B'):setcolorDone('#DBDBDB');
   setdata(data)
  },[data])

  useEffect(()=>{
    setshowTask(Collapseall)
  },[Collapseall])


  const handleClick = async(e)=>{
    try {
      const taskId = data?._id;
      const blog = e;
      const response = await moveToBlog({taskId,blog})
      setFetchTasks(true)
    } catch (error) {
      console.log(error)
    }
  }


  const noOfChecked = () => {
    const checkedTodosCount = data?.todos?.filter(
      (todo) => todo.checked == true
    ).length;
    return checkedTodosCount;
  };

  const handleCheckboxChange = (index) => {
    setdata((prevData) => ({
      ...prevData,
      todos: prevData.todos.map((todo, i) =>
        i === index ? { ...todo, checked: !todo.checked } : todo
      ),
    }));
  };

  function formatDate(dateString) {
    if (!dateString) {
      return "";
    }
    const date = new Date(dateString);
    const options = { month: "short", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    // Function to get the day with proper suffix (e.g., "10th")
    const getDayWithSuffix = (day) => {
      if (day >= 11 && day <= 13) {
        return `${day}th`;
      }
      switch (day % 10) {
        case 1:
          return `${day}st`;
        case 2:
          return `${day}nd`;
        case 3:
          return `${day}rd`;
        default:
          return `${day}th`;
      }
    };

    // Extract day from the formatted date
    const day = date.getDate();
    const dayWithSuffix = getDayWithSuffix(day);

    // Combine month abbreviation and day with suffix
    return formattedDate.replace(String(day), dayWithSuffix);
  }

  const formatDateCheck=()=>{
      // Create a Date object from the input date string
      const date = new Date();
      
      // Extract year, month, and day from the Date object
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const day = String(date.getDate()).padStart(2, '0');
      
      // Return the formatted date string
      return `${month}/${day}/${year}`;
  
  }

  const handleEdit=()=>{
    setEdit(true)
    setshowOptions(false)
  }
  
    const handleShare = () => {
      const url = `${window.location.origin}/${data?._id}`;
      navigator.clipboard.writeText(url)
        .then(() => setshare(true))
        .catch(err => setshare(false)) 
    setshowOptions(false)
  }


  const handleDelete =()=>{
    const taskId = data?._id;
    deleteTask({taskId})
    setFetchTasks(true)
    setshowOptions(false)
    setdeletePopup(false)
  }

  useEffect(() => {
    const todaysDate = formatDateCheck();
    if (data?.dueDate <= todaysDate) {
      setBackForDue(true);
    }
    if(data?.dueDate==''){
      setBackForDue(false)
    }
  }, [data]);

  return (
    <>
    {edit && <AddCardPopup data={cardData} setEdit={setEdit} edit={edit}  /> }
        {deletePopup ? (
        <div className={Style.PopBack}>
          <div className={Style.logoutPopup}>
            <div>Are you sure you want to Delete?</div>
            <div className={Style.logoutBtns}>
              <button className={Style.yesLog} onClick={handleDelete}>Yes, Delete</button>
              <button className={Style.cancel} onClick={() => setdeletePopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    {data &&
      <div className={Style.CardContainer}>
        {showOptions && (
          <div className={Style.optionCart}>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleShare}>Share</button>
            <button style={{ color: "red" }} onClick={()=>setdeletePopup(true)}>Delete</button>
          </div>
        )}
        <div className={Style.div1}>
          <div className="priority">
            <p className={`State${cardData?.priority}`}></p>
            <p className={Style.priorityTxt}  >{cardData?.priority} PRIORITY</p>
          </div>
          <div
            className={Style.options}
            onClick={() => setshowOptions(!showOptions)}
          >
            ...
          </div>
        </div>
        <div className={Style.div2}>
          <p>{cardData?.title}</p>
        </div>
        <div className={Style.div3}>
          <p>
            Checklist &#10088;{noOfChecked()}/{cardData?.todos?.length}&#10089;
          </p>
          <button onClick={() => setshowTask(!showTask)}>
            {showTask ? (
              <img src={UpArrow} alt="^" />
            ) : (
              <img src={DownArrow} alt="V" />
            )}
          </button>
        </div>
        {showTask &&
          data?.todos?.map((todo, index) => (
            <div key={index} className={Style.data}>
              <div className={Style.todotext}>
                <CustomeCheckboxe
                  onChange={() => handleCheckboxChange(index)} // Call a function that handles checkbox change
                  checked={todo.checked} // Pass the checked state
                />
                <p>{todo.text}</p>
              </div>
            </div>
          ))}
        <div className={Style.div4}>
          <div className={Style.date} style={{backgroundColor:backForDue && data?.blog !=='3'?'#CF3636':colorDone,color:backForDue?'white':'#5A5A5A'}}>{formatDate(cardData?.dueDate)}</div>
          <div className={Style.Cardbtns}>
            <button onClick={()=>handleClick('1')}>BACKLOG</button>
            <button onClick={()=>handleClick('2')}>PROGRESS</button>
            <button onClick={()=>handleClick('3')}>DONE</button>
          </div>
        </div>
      </div>}
    </>
  );
}

export default DataCard;
