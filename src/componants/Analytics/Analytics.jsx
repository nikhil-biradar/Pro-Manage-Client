import React, { useState, useEffect } from "react";
import "./Analytics.css";
import { getTask } from "../../api/task";

function Analytics() {

  const [responseData, setresponseData] = useState([])

  const [task, setTask] = useState({
    backlog: 0,
    todo: 0,
    inProgress: 0,
    done: 0,
  });
  
  const [priority, setPriority] = useState({
    high: 0,
    moderate: 0,
    low: 0,
  });

  const [dueDateTasks, setDueDateTasks] = useState(0); // Number of due date tasks

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





  const userId = JSON.parse(localStorage.getItem("userId"));

  

  useEffect(() => {
    const getAllTask = async () => {
      try {
        const response = await getTask(userId);
        if (response && response.data) {
          const data = response.data;
          setresponseData(response.data)
          // Set task counts
          setTask({
            backlog: data[1]?.length || 0,
            todo: data[0]?.length || 0,
            inProgress: data[2]?.length || 0,
            done: data[3]?.length || 0,
          });

          // Set priority counts
          let highCount = 0;
          let moderateCount = 0;
          let lowCount = 0;
          for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {   
              const tasks = data[key];
              tasks.forEach(task => {
                if (task.priority === "HIGH") {
                  highCount++;
                } else if (task.priority === "MODERATE") {
                  moderateCount++;
                } else if (task.priority === "LOW") {
                  lowCount++;
                }
              });
            }
          }
          setPriority({
            high: highCount,
            moderate: moderateCount,
            low: lowCount,
          });
        } else {
          // If response is empty or data is missing, setting all counts to 0
          setTask({
            backlog: 0,
            todo: 0,
            inProgress: 0,
            done: 0,
          });
          setPriority({
            high: 0,
            moderate: 0,
            low: 0,
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    getAllTask();
    
  }, [userId]);


  useEffect(() => {
    const calculateDueDateTasks = () => {
      let count = 0;
      const dateCheck = formatDateCheck();
      for (let i = 0; i < 4; i++) {
        if (responseData[i]) {
          responseData[i].forEach(task => {
            if (task && task.dueDate && task.dueDate <= dateCheck) {
              count++;
            }
          });
        }
      }
      setDueDateTasks(count);
    };

    calculateDueDateTasks();
  }, [responseData]);



  return (
    <div className="analytics-container">
      <p>Analytics</p>
      <div className="cont">
        <div className="div1">
          <div className="row">
            <div style={{ display: "flex", gap: "20px" }}>
              <p className="dot"></p>
              <p className="anay-text">Backlog Tasks</p>
            </div>
            <div className="num">{task.backlog}</div>
          </div>
          <div className="row">
            <div style={{ display: "flex", gap: "20px" }}>
              <p className="dot"></p>
              <p className="anay-text">To-do Tasks</p>
            </div>
            <div className="num">{task.todo}</div>
          </div>
          <div className="row">
            <div style={{ display: "flex", gap: "20px" }}>
              <p className="dot"></p>
              <p className="anay-text">In-Progress Tasks</p>
            </div>
            <div className="num">{task.inProgress}</div>
          </div>
          <div className="row">
            <div style={{ display: "flex", gap: "20px" }}>
              <p className="dot"></p>
              <p className="anay-text">Completed Tasks</p>
            </div>
            <div className="num">{task.done}</div>
          </div>
        </div>
        <div className="div1">
          <div className="row">
            <div style={{ display: "flex", gap: "20px" }}>
              <p className="dot"></p>
              <p className="anay-text">Low Priority</p>
            </div>
            <div className="num">{priority.low}</div>
          </div>
          <div className="row">
            <div style={{ display: "flex", gap: "20px" }}>
              <p className="dot"></p>
              <p className="anay-text">Moderate Priority</p>
            </div>
            <div className="num">{priority.moderate}</div>
          </div>
          <div className="row">
            <div style={{ display: "flex", gap: "20px" }}>
              <p className="dot"></p>
              <p className="anay-text">High Priority</p>
            </div>
            <div className="num">{priority.high}</div>
          </div>
          <div className="row">
            <div style={{ display: "flex", gap: "20px" }}>
              <p className="dot"></p>
              <p className="anay-text">Due Date Tasks</p>
            </div>
            <div className="num">{dueDateTasks}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
