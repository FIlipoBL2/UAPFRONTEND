import { A } from "@solidjs/router"

function GameCard(props) {
  const { game } = props;

  return (
    // Menggunakan id sebagai path params agar di Game.jsx dapat diproses
    <A href={`/details/${props.game.id}`} style={{ "text-decoration": "none", color: "inherit" }}>
      <div class="game-card" style={{ "background-color": "#d9d9d9", padding: "10px", "border-radius": "15px", width: "280px", height: "100%", "box-sizing": "border-box" }}>
        <img
          src={game.image}
          alt={game.title}
          style={{ width: "100%", "aspect-ratio": "6/9", "object-fit": "cover", "border-radius": "10px", display: "block" }}
        />
      </div>
    </A>
  );
}

export default GameCard;
