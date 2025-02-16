import axios from "axios";

const API_URL = "http://127.0.0.1:3050/users";

const usersApi = {
    // 取得所有使用者
    getAllUsers: () => {
        return axios.get(API_URL);
    },
    // 取得單一使用者
    getUser: (id) => {
        return axios.get(`${API_URL}/${id}`);
    },
    // 新增使用者
    addUser: (user) => {
        return axios.post(API_URL, user);
    },
    // 刪除使用者
    deleteUser: (id) => {
        return axios.delete(`${API_URL}/${id}`);
    },
    // 編輯使用者
    updateUser: (id, user) => {
        return axios.put(`${API_URL}/${id}`, user);
    },
};

export default usersApi;