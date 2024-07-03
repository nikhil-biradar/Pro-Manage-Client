import axios from "axios";
import toast from "react-hot-toast";


const backendURL=import.meta.env.VITE_REACT_APP_TASK_BACKEND_URL


export const postTask = async ({ userId, title, priority, todos, dueDate }) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const url = `${backendURL}/posttask/${userId}`;
    axios.defaults.headers.common["Authorization"] = token;
    const responce = await axios.post(url, { title, priority, todos, dueDate });
    if (responce) {
      toast.success("Task Added Successfully");
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.errorMessage);
  }
};


  export const getTask = async (userId) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const url = `${backendURL}/gettask/${userId}`;
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.get(url);
      if (response) {

        return response;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.errorMessage);
    }
  };
  
export const moveToBlog=async({taskId,blog})=>{
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const url = `${backendURL}/movetoblog/${taskId}`;
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.patch(url,{blog})
    return response
  } catch (error) {
    console.log(error)
    toast.error(error.response.data.errorMessage);
  }
}

export const deleteTask = async({taskId})=>{
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const url = `${backendURL}/deletetask/${taskId}`;
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.delete(url,{taskId})
    if(response)
    {
      toast.success('Task Deleted Successfully')
    }
  } catch (error) {
    console.log(error)
    toast.error(error.response.data.errorMessage);
  }
}


export const editTask = async({taskId,userId,title,priority,todos,dueDate})=>{
try {
  const token = JSON.parse(localStorage.getItem("token"));
  const url = `${backendURL}/edittask/${taskId}`;
  axios.defaults.headers.common["Authorization"] = token;
  const response = await axios.patch(url,{userId,title,priority,todos,dueDate})
  if(response)
  {
    toast.success('Task Edited Successfully')
  }
} catch (error) {
  console.log(error)
  toast.error(error.response.data.errorMessage);
}
}

export const sharedTask = async (taskId) => {
  try {
    const url = `${backendURL}/sharetask/${taskId}`;
    const response = await axios.get(url);
    if (response) {
      return response.data.responce;
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.errorMessage);
  }
};