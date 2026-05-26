import { games,devices,reviews } from "../data/mockData";
import { useParams } from "@solidjs/router";
import "../styles/game.css";
import { createSignal } from "solid-js";
import ReviewModal from "../components/ReviewModal";
import { IsModalOpen, setIsModalOpen, review } from "./userStore";

const Game = () => {
    const params = useParams();
    const selectedGames = games.find(game => game.id === Number(params.id));
    const [slider, setSlider] = createSignal(50);

    const getScoreColor = (score) => {
        if (score < 60) return "#ff4d4d"; // Red
        if (score < 75) return "#ffcc00"; // Yellow
        return "#00ce67ff"; // Green
    };

    const computeAvg = () =>{
        let totalScore = 0;
        let reviewCount = 0;
        review().forEach((val)=>{
            if(val.gameId === selectedGames.id){
                totalScore += Number(val.score);
                reviewCount++;
            }
        })
        return reviewCount == 0 ? 0 : Math.round(totalScore / reviewCount)
    }

    const deviceNames = selectedGames.deviceIds.map((deviceID) => {
        const device = devices.find(device => device.id === deviceID);
        return device ? device.name : "Unknown Device";
    }).join(" / ");

    const[currentPage, setCurrentPage] = createSignal(1);
    const numPerPage = 3;
    const totalPages = Math.ceil(reviews.length / numPerPage);

    const currReviews = () => {
        const startIndex = (currentPage() - 1) * numPerPage;
        return reviews.slice(startIndex, startIndex + numPerPage);
    };

    const nextPage = () => {
        if (currentPage() < totalPages) {
            setCurrentPage(currentPage() + 1);
        }
    };
    
    const prevPage = () => {
        if (currentPage() > 1) {
            setCurrentPage(currentPage() - 1);
        }
    };

    //harus dijadikan arrow function untuk menjadi reactive
    const avg = () => computeAvg();
    return (
        <div class="background">
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
                        <div class="scoreBox" style={{ "background-color": getScoreColor(avg())}}>
                            <p>{avg}</p>
                        </div>
                    </div>
                </div>

                <div class="addReviewContainer">
                    <h2>My Score</h2>
                    <div class="slider">
                        <input type="range" min="0" max="100" value={slider()} class="sliderInput" onInput={(e) => setSlider(e.target.value)}></input>
                        <div class="sliderValue">{Number(slider())}</div>
                    </div>
                    <div class="reviewBtnContainer">
                        <button onClick={() => setIsModalOpen(prev => !prev)}>Add my Review</button>
                    </div>
                    <Show when={IsModalOpen()}>
                        <ReviewModal game={selectedGames} setScore={setSlider} score={slider()}/>
                    </Show>
                </div>

                <div class="reviewsContainer">
                    <div class="reviewHeader">
                        Search Reviews
                    </div>

                    <For each={currReviews()}>
                        {(review) => (
                            <div class="review">
                                <div class="scoreBox" style={{ "background-color": getScoreColor(review.score)}}>
                                    <p>{review.score}</p>
                                </div>

                                <h3>{review.userId}</h3>
                                <p>{review.text}</p>
                                {/* <button class="readMoreBtn">Read More</button> */}
                            </div>
                        )}
                    </For>

                    <div class="pagination">
                        <button onClick={prevPage} disabled={currentPage() === 1}>Previous</button>

                        <For each={Array.from({ length: totalPages }, (_, i) => i + 1)}>
                            {(page) => (
                                <button onClick={() => setCurrentPage(page)}>{page}</button>
                            )}
                        </For>

                        <button onClick={nextPage} disabled={currentPage() === totalPages}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Game;