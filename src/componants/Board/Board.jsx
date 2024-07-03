import React, { useState,useEffect } from "react";
import Style from "./Board.module.css";
import BoardCart from "./BoardCart";
import AddCardPopup from "../AddCardPopup/AddCardPopup";
import { getTask } from "../../api/task";

function Board() {

  const [addbtn, setAddbtn] = useState(false);
  const [todo, setTodo] = useState([]);
  const [backlog, setBacklog] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);
  const [task, settask] = useState([])


  const initialName = JSON.parse(localStorage.getItem('name')).split(' ')[0]
  const FinalName = initialName.split('')[0].toUpperCase() + initialName.slice(1)


  const [initial, setinitial] = useState()
  const [share, setshare] = useState(false)
  const [selectedTime, setSelectedTime] = useState(""); // i am not giving anything because had to show all the task when youser logged in

  const userId = JSON.parse(localStorage.getItem("userId"));

  const [fetchTasks, setFetchTasks] = useState(true);

  useEffect(() => {
    if (fetchTasks) {
      getAllTask();
      setFetchTasks(false);
    }
  }, [fetchTasks]);

  const getAllTask = async () => {
    const response = await getTask(userId);
    settask(response?.data)
    setTodo(response?.data[0]);
    setBacklog(response?.data[1]);
    setInProgress(response?.data[2]);
    setDone(response?.data[3]);
  };


  setTimeout(() => {
    setshare(false)
  }, 5000);

  const formatDate = (date) => {
    const options = { month: "short", year: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );

    // Adding the 'th', 'st', 'nd', 'rd' suffix to the day
    const day = date.getDate();
    const suffix =
      day === 1 || day === 21 || day === 31
        ? "st"
        : day === 2 || day === 22
          ? "nd"
          : day === 3 || day === 23
            ? "rd"
            : "th";
    return `${day}${suffix} ${formattedDate}`;
  };
  let today = new Date();

  const handleSortByTime = (e) => {
    setSelectedTime(e.target.value);
    const filteredTasks = filterAndSortTasks(todo);
  };

  const filterAndSortTasks = (tasks) => {
    if (!tasks) {
      return [];
    }
    const today = new Date();

    let filteredTasks = tasks.filter((task) => {
      switch (selectedTime) {
        case "Today":
          return isSameDate(new Date(task.dateOfCreation), today);
        case "week":
          return isSameWeek(new Date(task.dateOfCreation), today);
        case "month":
          return isSameMonth(new Date(task.dateOfCreation), today);
        default:
          return true;
      }
    });

    // sorting based on date of creation which have been created during the schema
    filteredTasks.sort((a, b) => {
      // Converting the date of creation in same format to compaire
      const dateA = new Date(a.dateOfCreation);
      const dateB = new Date(b.dateOfCreation);

      // Compare date of creation
      return dateA - dateB;
    });

    return filteredTasks;
  };

  const isSameDate = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const isSameWeek = (date1, date2) => {
    const diff = Math.abs(date1 - date2);
    const millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
    return Math.floor(diff / millisecondsPerWeek) === 0;
  };

  const isSameMonth = (date1, date2) => {
    return (
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );

  };
 
  return (
    <>
      {addbtn && <AddCardPopup setAddbtn={setAddbtn} setFetchTasks={setFetchTasks} />}
      {share && <div className={Style.sharePop}>Link Copied</div>}
      <div className={Style.Board}>
        <div className={Style.userDate}>
          <p className={Style.user}>Welcome!&nbsp;{initial}</p>
          {" "}
          <p className={Style.date}>{formatDate(today)}</p>
        </div>
        <div className={Style.userSelect}>
          <p className={Style.title}>Board</p>
          <div className={Style.select}>
            <select
              name="time"
              id="sortByTime"
              onChange={handleSortByTime}
              value={selectedTime}
            >
              <option value="Today">Today</option>
              <option value="week">
                This Week
              </option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
        <div className={Style.scrollbar}>
          <div className={Style.cart}>
            
            <BoardCart
              name="Backlog"
              setAddbtn={setAddbtn}
              data={filterAndSortTasks(backlog)}
              setshare={setshare}
              setFetchTasks={setFetchTasks}
            />
            <BoardCart
              name="To do"
              setAddbtn={setAddbtn}
              addbtn={addbtn}
              data={filterAndSortTasks(todo)}
              setshare={setshare}
              setFetchTasks={setFetchTasks}

            />
            <BoardCart
              name="In Progress"
              setAddbtn={setAddbtn}
              data={filterAndSortTasks(inProgress)}
              setshare={setshare}
              setFetchTasks={setFetchTasks}
            />
            <BoardCart 
              name="Done" 
              setAddbtn={setAddbtn}
              data={filterAndSortTasks(done)} 
              setFetchTasks={setFetchTasks} 
              setshare={setshare} 
              />
          </div>
        </div>
      </div>
    </>
  );
}

export default Board;
