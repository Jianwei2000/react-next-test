// ✅ 讓 Next.js 知道這是 Client Component
"use client";
import "./Home.scss";


export default function Home() {
  return (
    <>

      <div className="intro">

        <h1>前端: React + Next</h1>
        <h1>後端: Node + express</h1>
        <h1>資料庫: MySQL</h1>
      </div>
    </>
  );
}
