"use client";

import Navbar from "@/components/navbar/Navbar";
import usersApi from "@/api/usersApi.js";
import "./userAdd.scss"
import Link from "next/link";
import { useState } from "react";


export default function add() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [birthday, setBirthday] = useState(null);
    const [address, setAddress] = useState('');




    const addUser = async (e) => {
        e.preventDefault();

        const newUser = {
            name,
            email,
            password,
            mobile,
            birthday: birthday || null,
            address: address || "" 
        };

        try {
            await usersApi.addUser(newUser);
            alert('會員新增成功');
            location.href = "/userTest";

        } catch (err) {
            setError('新增會員失敗');
            console.log(err.message);
            
        } 
    }

    return (
        <>
            <Navbar />
            <div className="container">

                <div className="add">
                    <h1>新增會員資料</h1>

                    <Link href="/userTest" className="btn">
                        返回
                    </Link>
                </div>

                <div className="card">
                    <form onSubmit={addUser}>
                        <div className="mb">
                            <label htmlFor="name">姓名</label>
                            <input type="text" id="name" onChange={(e) => setName(e.target.value)}
                                required />
                        </div>
                        <div className="mb">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" onChange={(e) => setEmail(e.target.value)}
                                required />
                        </div>
                        <div className="mb">
                            <label htmlFor="password">密碼</label>
                            <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}
                                required />
                        </div>
                        <div className="mb">
                            <label htmlFor="mobile">連絡電話</label>
                            <input type="text" id="mobile" onChange={(e) => setMobile(e.target.value)}
                                required />
                        </div>
                        <div className="mb">
                            <label htmlFor="address">送貨地址</label>
                            <input type="text" id="address" onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className="mb">
                            <label htmlFor="birthday">生日</label>
                            <input type="date" id="birthday"  onChange={(e) => setBirthday(e.target.value)}
                            />
                        </div>
                        <div className="mb">
                            <button type="submit">新增</button>
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}