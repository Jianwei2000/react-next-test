"use client"; // ✅ 讓 Next.js 知道這是 Client Component
import Navbar from "@/components/navbar/Navbar.jsx";
import usersApi from "@/api/usersApi.js";
import "./userTest.scss";
import { useEffect, useState } from "react";
import Link from "next/link";


export default function userTest() {
    // 狀態管理：儲存會員資料、分頁資料
    const [users, setUsers] = useState([]);   // 會員資料
    const [keyword, setKeyword] = useState(""); // 搜尋關鍵字
    const [page, setPage] = useState(1);       // 當前頁
    const [totalPages, setTotalPages] = useState(0); // 總頁數
    const [totalRecords, setTotalRecords] = useState(0); // 總資料筆數

    // 取得會員資料，並處理搜尋與分頁
    const getUsers = async () => {
        try {
            const response = await usersApi.getAllUsers(keyword, page);
            setUsers(response.data.users); // 更新會員資料
            setTotalPages(response.data.totalPages); // 更新總頁數
            setTotalRecords(response.data.totalRecords); // 更新總資料筆數
        } catch (err) {
            console.error("錯誤訊息:", err);
        }
    };

    // 當關鍵字或頁碼改變時重新取得資料
    useEffect(() => {
        getUsers();
    }, [keyword, page]);

    // 搜尋處理
    const handleSearch = (event) => {
        setKeyword(event.target.value);
        setPage(1); // 每次搜尋時，頁碼重置為1
    };

    // 分頁處理
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="add">
                    <h1>會員資料讀取</h1>
                    <Link href="userTest/add" className="btn">
                        新增會員
                    </Link>
                </div>
                <div className="operate">
                    <input
                        type="text"
                        placeholder="搜尋會員..."
                        value={keyword}
                        onChange={handleSearch}
                    />
                    {/* 分頁控制 */}
                    <div className="pagination">
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 1}
                        >
                            上一頁
                        </button>
                        <span>第 {page} 頁 / 共 {totalPages} 頁</span>
                        <button
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page === totalPages}
                        >
                            下一頁
                        </button>
                    </div>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>姓名</th>
                            <th>信箱</th>
                            <th>手機</th>
                            <th>生日</th>
                            <th>地址</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.user_id}>
                                <td>{user.user_id}</td>
                                <td>{user.user_name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone_number}</td>
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
