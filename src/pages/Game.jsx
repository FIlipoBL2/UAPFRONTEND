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
        <div class="mainContainer">
            
            <div class="gameImageContainer">
                <img src={selectedGames?.image} alt="Game Image" />
            </div>
            
            <div class="gameInfoContainer">
                
                <h1>
                    {selectedGames?.title}
                </h1>
                
                <p class="platform">
                    {deviceNames}
                </p>
            
                <div class="releaseDateContainer">
                    <h2>Release Date</h2>
                    <h2>{selectedGames?.releaseDate}</h2>
                </div>
            
                <div class="scoreContainer">
                    <h2>Average Score</h2>
                    <div class="scoreBox" style={{ "background-color": getScoreColor(avg)}}>
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

        <div class="reviewsContainer">
            <div class="reviewHeader">
                Search Reviews
            </div>

            <div class="review">
                <div class="scoreBox">
                    <p>9.0</p>
                </div>
                <h3>Reviewer Name</h3>
                <p>Review text goes here. This is a sample review to demonstrate the layout of the reviews section.</p>
                <button class="readMoreBtn">Read More</button>
            </div>

            <div class="pagination">
                <button>prev</button>
                <button>1</button>
                <button>2</button>
                <button>3</button>
                <button>4</button>
                <button>next</button>
            </div>
        </div>

        </div>
        </>
    );
}

export default Game;