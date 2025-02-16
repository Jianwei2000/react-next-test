"use client"; // ✅ 讓 Next.js 知道這是 Client Component
import Navbar from "@/components/navbar/Navbar.jsx";
import usersApi from "@/api/usersApi.js";
import "./userTest.scss";
import { useEffect, useState } from "react";


export default function userTest() {
    const [users, setUsers] = useState([]); // ⬅️ 存放 API 取得的會員資料

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await usersApi.getAllUsers();
                setUsers(response.data.users);
            }
            catch (err) {
                console.error("錯誤訊息:", err);
            }
        };
        getUsers();

    }, [])


    return (
        <>
            <Navbar />
            <div className="container">
                <h1>會員資料讀取</h1>
                <div className="operate">

                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>姓名</th>
                            <th>電郵</th>
                            <th>手機</th>
                            <th>生日</th>
                            <th>地址</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.ab_id}>
                                <td>{user.ab_id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.mobile}</td>
                                <td>{user.birthday}</td>
                                <td>{user.address}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
