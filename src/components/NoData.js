// import css 
import "../assets/css/noData.css"

// import image 
import noData from "../assets/images/no data.png"

export default function NoData() {
    return (
        <div className="noData">
            <img src={noData} alt="no data found" className="noDataImg" />
            <h1>No literature data found</h1>
        </div>
    )
}