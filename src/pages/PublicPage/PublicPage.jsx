import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { sharedTask } from "../../api/task";
import Style from "./PublicPage.module.css";
import sandbox from "../../assets/icon/codesandbox.png";
import CustomeCheckboxe from "../../componants/customCheckBox/CustomCheckboxe";
import Loading from "../../componants/Error/Loading/LoadingPage";

function PublicPage() {
  const [taskData, setTaskData] = useState([]);

  let { id: taskId } = useParams();
  useEffect(() => {
    getTask();
  }, []);

  const getTask = async () => {
    try {
      const data = await sharedTask(taskId);
      console.log(data);
      if (data) {
        setTaskData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const noOfChecked = () => {
    const checkedTodosCount = taskData?.todos?.filter(
      (todo) => todo.checked == true
    ).length;
    return checkedTodosCount || 0;
  };

  function formatDate(dateString) {
    if (!dateString) {
      return "";
    }
    const date = new Date(dateString);
    const options = { month: "short", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    // Function to get the day with proper suffix
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
    const day = date.getDate();
    const dayWithSuffix = getDayWithSuffix(day);

    return formattedDate.replace(String(day), dayWithSuffix);
  }

  return (
    <>
      <div className={Style.head}>
        <img src={sandbox} alt="sandbox" />
        <h1>Pro Manage</h1>
      </div>
      <div className={Style.PublicPage}>
        <div className={Style.dataContainer}>
          <div className="priority">
            <p className={`State${taskData?.priority}`}></p>
            <p className={Style.priorityTxt}>{taskData?.priority} PRIORITY</p>
          </div>
          <div className={Style.title}>{taskData?.title}</div>
          <div className={Style.checklist}>
            <p>
              Checklist ({noOfChecked()}/{taskData?.todos?.length || 0})
            </p>
            <div className={Style.parentScroll}>
              <div className={Style.scroll}>
                {taskData?.todos ? (
                  taskData?.todos?.map((todo, index) => (
                    <div key={index} className={Style.data}>
                      <div className={Style.todotext}>
                        <CustomeCheckboxe checked={todo.checked} />
                        <p>{todo.text}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <Loading height={'40vh'}  />
                )}
              </div>
            </div>
          </div>
          <div className={Style.date}>
            <p>Due Date</p>
            <div className={Style.dueDate} >{formatDate(taskData?.dueDate)}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PublicPage;
