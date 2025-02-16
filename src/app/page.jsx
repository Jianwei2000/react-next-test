// ✅ 讓 Next.js 知道這是 Client Component
"use client";
import Navbar from "@/components/navbar/Navbar";
import "./Home.scss";


export default function Home() {
  return (
    <>
      <Navbar />
      <div className="intro">

        <h1>前端: React + Next</h1>
        <h1>後端: Node + express</h1>
        <h1>資料庫: MySQL</h1>
      </div>
    </>
  );
}
