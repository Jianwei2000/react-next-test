"use client";
import { useEffect, useState } from "react";
import usersApi from "@/api/usersApi.js"; // 確保正確導入 API

export default function Edit() {
  const [user, setUser] = useState(null);

  // 取得會員資料
  const getUserData = async (userId) => {
    try {
      const response = await usersApi.getUser(userId);
      console.log("請求成功:", response.data);
      setUser(response.data); // 儲存會員資料
    } catch (err) {
      console.error("請求失敗:", err.response?.data?.error || err.message);
    }
  };

  useEffect(() => {
    // 透過 window.location 取得查詢參數
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");
    if (idParam) {
      getUserData(idParam); // 取得會員資料
    }
  }, []);

  return (
    <>

      {user ? (
        <div>
          <p>ID:{user.user.user_id}</p>
          <p>姓名: {user.user.user_name}</p>
          <p>信箱: {user.user.email}</p>
          <p>手機: {user.user.phone_number}</p>
          <p>生日: {user.user.birthday}</p>
          <p>地址: {user.user.address}</p>
        </div>
      ) : (
        <p>載入會員資料中...</p>
      )}
    </>
  );
}
