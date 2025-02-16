
import "./Navbar.scss";

export default function Navbar() {

    return (
        <>
            <div className="navbar">
                <h1><a href="/">主頁</a></h1>
                <ul>
                    <li><a href="/userTest">會員資料</a></li>
                    <li><a href="">電商資料</a></li>
                </ul>
            </div>
        </>
    )
}