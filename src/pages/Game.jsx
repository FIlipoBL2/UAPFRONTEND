import { games } from "../data/mockData";
import { useParams } from "@solidjs/router";

const Game = () => {
    const params = useParams();
    const selectedGames = games.find(game => game.id === Number(params.id));

    return (
        <div style={{ display: "grid", "grid-template-columns": "1fr 1fr", "grid-template-rows": "1fr 1fr", "grid-template-areas": '"banner gameInfo" "reviews addReview"', margin: "0", padding: "20px", width: "100%", "box-sizing": "border-box" }}>
            
            <div style={{ "grid-area": "banner", display: "flex", "justify-content": "center", "align-items": "center", width: "100%", height: "100%", "background-color": "gray" }}>
                <img src={selectedGames?.image} alt="Game Image" />
            </div>
            
            <div style={{ "grid-area": "gameInfo", display: "grid", "grid-template-columns": "1fr 1fr", "grid-template-rows": "1fr 1fr 1fr", "grid-template-areas": '"title title" "platform platform" "releaseDate score"', "justify-content": "left", "align-items": "center", width: "100%", height: "100%", padding: "16px" }}>
                
                <h1 style={{ "grid-area": "title", "margin-bottom": "0" }}>
                    {selectedGames?.title}
                </h1>
                
                <p style={{ "grid-area": "platform", "margin-top": "0" }}>
                    Console / Console / Console
                </p>
            
                <div style={{ "grid-area": "releaseDate", "padding-right": "16px" }}>
                    <h2>Release Date</h2>
                    <h2>{selectedGames?.releaseDate}</h2>
                </div>
            
                <div style={{ "grid-area": "score", display: "flex", "flex-direction": "column", "align-items": "center", "padding-left": "16px" }}>
                    <h2>Average Score</h2>
                    <div style={{ "background-color": "yellow", "border-radius": "12px", height: "40px", width: "40px", display: "flex", "justify-content": "center", "align-items": "center", "font-size": "24px", "font-weight": "bold" }}>
                        <p>67</p>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default Game;