import { games,reviews,devices } from "../data/mockData";
import { useParams } from "@solidjs/router";
import "../styles/game.css";

const Game = () => {
    const params = useParams();
    const selectedGames = games.find(game => game.id === Number(params.id));
    
    const getScoreColor = (score) => {
        if (score < 60) return "#ff4d4d"; // Red
        if (score < 75) return "#ffcc00"; // Yellow
        return "#00ce67ff"; // Green
    };

    const computeAvg = () =>{
        let totalScore = 0;
        let reviewCount = 0;
        reviews.forEach((val)=>{
            if(val.gameId === selectedGames.id){
                totalScore += val.score;
                reviewCount++;
            }
        })
        return Math.round(totalScore / reviewCount)
    }

    const deviceNames = selectedGames.deviceIds.map((deviceID) => {
        const device = devices.find(device => device.id === deviceID);
        return device ? device.name : "Unknown Device";
    }).join(" / ");

    const avg = computeAvg();
    return (
        <>
        <div style={{ display: "grid", "grid-template-columns": "1fr 1fr", "grid-template-rows": "1fr 1fr", "grid-template-areas": '"banner gameInfo" "reviews addReview"', margin: "0", padding: "20px", width: "100%", "box-sizing": "border-box" }}>
            
            <div style={{ "grid-area": "banner", display: "flex", "justify-content": "center", "align-items": "center", width: "100%", height: "100%", "background-color": "gray" }}>
                <img src={selectedGames?.image} alt="Game Image" />
            </div>
            
            <div style={{ "grid-area": "gameInfo", display: "grid", "grid-template-columns": "1fr 1fr", "grid-template-rows": "1fr 1fr 1fr", "grid-template-areas": '"title title" "platform platform" "releaseDate score"', "justify-content": "left", "align-items": "center", width: "100%", height: "100%", padding: "16px" }}>
                
                <h1 style={{ "grid-area": "title", "margin-bottom": "0" }}>
                    {selectedGames?.title}
                </h1>
                
                <p style={{ "grid-area": "platform", "margin-top": "0" }}>
                    {deviceNames}
                </p>
            
                <div style={{ "grid-area": "releaseDate", "padding-right": "16px" }}>
                    <h2>Release Date</h2>
                    <h2>{selectedGames?.releaseDate}</h2>
                </div>
            
                <div style={{ "grid-area": "score", display: "flex", "flex-direction": "column", "align-items": "center", "padding-left": "16px" }}>
                    <h2>Average Score</h2>
                    <div style={{ "background-color": getScoreColor(avg), "border-radius": "12px", height: "40px", width: "40px", display: "flex", "justify-content": "center", "align-items": "center", "font-size": "24px", "font-weight": "bold" }}>
                        <p>{avg}</p>
                    </div>
                </div>
                
            </div>
        </div>
        <div class="addReviewContainer">
        <h2>My Score</h2>
        <div class="slider">
            <input type="range" min="0" max="100" value="50" class="sliderInput"></input>
            <div class="sliderValue">50</div>
        </div>
        <div class="reviewBtnContainer">
            <button>Add my Review</button>
        </div>
        </div>
        </>
    );
}

export default Game;