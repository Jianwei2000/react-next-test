"use client"; // ✅ 讓 Next.js 知道這是 Client Component
import Navbar from "@/components/navbar/Navbar.jsx";
import "./userTest.scss";


export default function userTest() {

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
                            <th >#</th>
                            <th >First</th>
                            <th >Last</th>
                            <th >Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th >1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th >2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th >3</th>
                            <td >Larry the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
