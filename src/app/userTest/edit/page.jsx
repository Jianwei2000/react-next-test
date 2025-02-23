"use client";
import { useEffect, useState } from "react";
import usersApi from "@/api/usersApi.js"; // 確保正確導入 API
import "./userEdit.scss";

export default function Edit() {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState("");
  
  useEffect(() => {
    // 透過 window.location 取得查詢參數
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");
    if (idParam) {
     getUserData(idParam); // 取得會員資料
    }
  }, []);

  // 取得會員資料
  const getUserData = async (userId) => {
    try {
      const response = await usersApi.getUser(userId);
      const userData = response.data.user; // 取得使用者資料
      setUser(userData);
      setUserId(userData.user_id);
      setName(userData.user_name);
      setEmail(userData.email);
      setMobile(userData.phone_number);
      setAddress(userData.address);
      setBirthday(userData.birthday);
    } catch (err) {
      console.error("請求失敗:", err.response?.data?.error || err.message);
    }
  };


  //編輯會員
  const editUser = async (e) => {
    e.preventDefault();
    const updateData = {
      user_name: name,
      email: email,
      phone_number: mobile,
      address: address || null, // 如果是空字串，改成 null
      birthday: birthday ? birthday.split("T")[0] : null, // 轉成 YYYY-MM-DD
    };
  
    console.log("發送的更新資料:", updateData);
  
    try {
      const response = await usersApi.updateUser(userId, updateData);
      console.log("更新成功:", response.data);
      alert("會員資料修改成功！");
      location.href = "/userTest/"
    } catch (err) {
      console.error("更新失敗:", err.response?.data?.error || err.message);
      alert("更新失敗，請稍後再試。");
    }
  };
  

  
  return (
    <>

      {user ? (
            <div className="card">
            <form onSubmit={editUser}>
                <input type="hidden" value={userId}/>
                <div className="mb">
                    <label htmlFor="name">姓名</label>
                    <input type="text" id="name" value={name || ""} onChange={(e) => setName(e.target.value)}
                        />
                </div>
                <div className="mb">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email || ""} onChange={(e) => setEmail(e.target.value)}
                        />
                </div>
                <div className="mb">
                    <label htmlFor="mobile">連絡電話</label>
                    <input type="text" id="mobile" value={mobile || ""} onChange={(e) => setMobile(e.target.value)}
                        />
                </div>
                <div className="mb">
                    <label htmlFor="address">送貨地址</label>
                    <input type="text" id="address" value={address || ""} onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className="mb">
                    <label htmlFor="birthday">生日</label>
                    <input type="date" id="birthday" value={birthday || null}  onChange={(e) => setBirthday(e.target.value)}
                    />
                </div>
                <div className="mb">
                    <button type="submit">修改</button>
                </div>
            </form>
            </div>
      ) : (
        <p>載入會員資料中...</p>
      )}
    </>
  );
}
