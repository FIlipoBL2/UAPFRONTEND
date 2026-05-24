import { For } from "solid-js";
import GameCard from "./GameCard";
import { devices, reviews } from "../data/mockData";

function SearchGrid(props){

    const deviceMap = devices.reduce((acc, device) => {
        acc[device.id] = device.name;
        return acc;
    },{});

    const scoreMap = reviews.reduce((acc, review) => {
        if(!acc[review.gameId]){
            acc[review.gameId] = {sum: 0, count: 0};
        }
        acc[review.gameId].sum += review.score;
        acc[review.gameId].count += 1;
        return acc;
    },{});

    const avg = (gameId) => {
        const data = scoreMap[gameId];
        return data ? Math.round(data.sum / data.count) : null;
    };

    const scoreColor = (score) => {
        if(score === null) return "#d9d9d9";
        if(score < 50) return "#BD0003";
        if(score < 70) return "#F5911D";
        return "#029F19";
    };

    const gridContainerStyle = {
        display: "grid",
        "grid-template-columns": "repeat(2, 1fr)",
        "grid-template-rows": "repeat(3, auto)",
        gap: "30px",
        "margin-bottom": "50px"
    };

    const itemWrapperStyle = {
        display: "flex",
        gap: "20px",
        "align-items": "center",
        "background-color": "#ffffff",
        padding: "15px",
        "border-radius": "20px",
    };

    const infoStyle = {
        display: "flex",
        "flex-direction": "column",
        gap: "10px"
    };

    return(
        <div style={gridContainerStyle}>
            <For each={props.games}>
                {(game) => (

                    <div style={itemWrapperStyle}>
                        <div style={{width : "280px"}}>
                            <GameCard game={game} />
                        </div>

                        <div style={infoStyle}>

                            <div style={{
                                "background-color": scoreColor(avg(game.id)),
                                color: "#fff",
                                padding: "4px 10px",
                                "border-radius": "4px",
                                "font-weight": "bold",
                                "font-size": "20px",
                                "width": "fit-content"

                            }}>
                                {avg(game.id) ? `${avg(game.id)}` : "No Reviews"}
                            </div>

                            <h2 style={{margin:0, "font-size": "20px", color: "#000000"}}>
                                {game.title}
                            </h2>

                            <p style={{margin:0, color:"#000000", "font-size": "14px"}}>
                                Supported On: {game.deviceIds.map(id => deviceMap[id]).join(", ")}
                                <br />
                                Release On: {game.releaseDate}
                                <br />
                                Developed by: {game.developer}
                                <br />
                                Published by: {game.publisher}
                            </p>
                        </div>  
                    </div>
                )}
            </For>
        </div>
    );

}

export default SearchGrid;