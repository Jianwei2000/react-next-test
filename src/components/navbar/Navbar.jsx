
import "./Navbar.scss";

export default function Navbar() {

    return (
        <>
            <div className="navbar">
                <h1><a href="/">主頁</a></h1>
                <ul>
                    <li><a href="/userTest">會員</a></li>
                    <li><a href="">電商</a></li>
                    <li><a href="">訂位</a></li>
                    <li><a href="">文章</a></li>
                    <li><a href="">品牌</a></li>
                </ul>
            </div>
        </>
    )
}