import axios from "../../utils/axios";

// export const getBlog = async (id) => {
//   const response = await axios.get(`/blogs/${id}`);
//   return response.data;
// };

export const addUserAsync = async (user) => {
  try {
    const response = await axios.post(`/api/user/signup`, user);
    // save the user to local storage
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  } catch (err) {
    console.log(err.response.data.error);
  }
};

export const loginUserAsync = async (email, password) => {
  try {
    console.log(email, password);
    const response = await axios.post(`/api/user/login`, { email, password });

    localStorage.setItem("user", JSON.stringify(response.data));

    return response.data;
  } catch (err) {
    console.log(err.response.statusText);
  }
};

export const getUsersAsync = async () => {
  const response = await axios.get(`api/user/all`);
  return response.data;
};
