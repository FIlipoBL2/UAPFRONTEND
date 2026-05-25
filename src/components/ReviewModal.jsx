import "../styles/reviewModal.css"
import { setIsModalOpen, currentUser, setReview } from "../pages/userStore";
import { createSignal } from "solid-js";

const ReviewModal = (props) => {

    const [reviewText, setReviewText] = createSignal("")

    function handleSubmit(){
        
        setReview(prev => {
            const maxId = prev.length > 0 ? Math.max(...prev.map(u => u.id)) : 1
            const newId = maxId + 1
            const newReview = {
                id : newId,
                gameId : props.game.id,
                userId : currentUser()?.id,
                score : props.score,
                text : reviewText()
            }
            return [...prev, newReview]
        })
        setIsModalOpen(false)
        
    }
    return (
        <>
        <div class="modal-overlay">
        <div class="pop-up">
            <button class="close-btn" onClick={() => setIsModalOpen(prev => !prev)}>X</button>
            <h1 class="modal-title">Write Your Review</h1>
            <div class="container">
                <div class="game-info">
                    <div class="child-1">
                        <p class="label">Your Score</p>
                        <div class="score-display">
                            <span class="score-number">{props.score}</span>
                            <div class="arrows">
                                <span onClick={() => props.setScore(prev=> Number(prev)+1)}>↑</span> {/* Panah atas */}
                                <span onClick={() => props.setScore(prev=> Number(prev)-1)}>↓</span> {/* Panah bawah */}
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1>{props.game.title}</h1>
                        <p><strong>Release On:</strong> {props.game.releaseDate}</p>
                        <p><strong>Developer:</strong> {props.game.developer}</p>
                        <p><strong>Publisher:</strong> {props.game.publisher}</p>
                    </div>
                </div>
                <div class="input-review">
                    <p class="label">Type Your Review</p>
                    <textarea placeholder="" value={reviewText()} onInput={(e) => setReviewText(e.target.value)}></textarea>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
        </div>
        </>
    );
}

export default ReviewModal