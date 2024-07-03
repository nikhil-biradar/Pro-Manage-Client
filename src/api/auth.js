import axios from "axios";
import toast from 'react-hot-toast';
const backendURL=import.meta.env.VITE_REACT_APP_AUTH_BACKEND_URL

export const register = async ({ name, email, password },navigate) => {
  try {
    const url = `${backendURL}/register`;
    const responce = await axios.post(url, { name, email, password });
    if (responce.data.success) {
      localStorage.setItem("token",JSON.stringify(responce.data.token));
      localStorage.setItem('name', JSON.stringify(responce.data.name))
      localStorage.setItem('userId',JSON.stringify(responce.data.userId))
      toast.success('Registered Successfully')
      navigate('/board')
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.errorMessage);
  }
};
export const login = async ({ email, password },navigate) => {
    try {
      const url = `${backendURL}/login`;
      const responce = await axios.post(url, { email, password });
      if (responce) {
        localStorage.setItem("token",JSON.stringify(responce.data.token));
        localStorage.setItem('name', JSON.stringify(responce.data.name))
        localStorage.setItem('userId',JSON.stringify(responce.data.userId))
        toast.success('Login Successfully')
        navigate('/board')
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.errorMessage);
    }
  };

export const updatePassword = async({userId ,name, oldPassword, newPassword })=>{
    try {
      const token = JSON.parse(localStorage.getItem("token"));
        const url = `${backendURL}/update/${userId}`;
        axios.defaults.headers.common["Authorization"] = token;
        const responce = await axios.patch(url, {name, oldPassword, newPassword});
        if (responce) {
          toast.success(responce?.data.message)
          localStorage.setItem('name', JSON.stringify(responce.data.name))
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.errorMessage);
      }
}

// protected route

export const verifyToken = async({token})=>{
  try {
    
    const url = `${backendURL}/validatetoken`;
    axios.defaults.headers.common["Authorization"] = token;
    const responce = await axios.get(url);
    return responce;
  } catch (error) {
    console.log(error)
    toast.error(error.response.data.errorMessage);
  }
}
