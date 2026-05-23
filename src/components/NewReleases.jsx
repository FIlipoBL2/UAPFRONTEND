import { For } from "solid-js";
import { newReleases } from "../data/mockData";
import GameCard from "./GameCard";

function NewReleases() {
  let gameRowRef;

  const scrollLeft = () => {
    if (gameRowRef) gameRowRef.scrollBy({ left: -750, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (gameRowRef) gameRowRef.scrollBy({ left: 750, behavior: "smooth" });
  };

  return (
    <section style={{ "margin-bottom": "60px" }}>
      <div style={{ display: "flex", "justify-content": "space-between", "align-items": "baseline", "margin-bottom": "20px" }}>
        <h3 style={{ margin: 0, "font-size": "24px" }}>NEW RELEASES</h3>
        <a href="#" style={{ color: "#00ff00", "text-decoration": "none" }}>See All</a>
      </div>

      <figure style={{ display: "flex", "align-items": "center", gap: "15px", margin: 0 }}>
        <button onClick={scrollLeft} style={{ padding: "10px 15px", cursor: "pointer", "background-color": "#2f384d", color: "white", border: "none", "border-radius": "8px" }}>{"<"}</button>

        <div ref={gameRowRef} class="game-row" style={{ display: "flex", gap: "20px", overflow: "hidden", flex: 1, "padding-bottom": "10px" }}>
          <For each={newReleases}>
            {(game) => <GameCard game={game} />}
          </For>
        </div>

        <button onClick={scrollRight} style={{ padding: "10px 15px", cursor: "pointer", "background-color": "#2f384d", color: "white", border: "none", "border-radius": "8px" }}>{">"}</button>
      </figure>
    </section>
  );
}

export default NewReleases;
