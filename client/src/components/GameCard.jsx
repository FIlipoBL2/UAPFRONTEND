import { A } from "@solidjs/router";

function GameCard(props) {
  return (
    // Menggunakan id sebagai path params agar di Game.jsx dapat diproses
    <A href={`/details/${props.game.id}`} style={{ "display": "block", "flex-shrink": 0, "width": "100%", "max-width": "300px" }}>
      <div class="game-card" style={{ "background-color": "#d9d9d9", "padding": "10px", "border-radius": "15px" }}>
        <img
          src={props.game.image}
          alt={props.game.title}
          style={{ width: "100%", "aspect-ratio": "6/9", "border-radius": "10px", "display": "block", "object-fit": "cover" }}
        />
      </div>
    </A>
  );
}

export default GameCard;
