import { For } from "solid-js";
import { latestReviews } from "../data/mockData";
import ReviewCard from "./ReviewCard";

function LatestReviews() {
  return (
    <section>
      <h3 style={{ "font-size": "24px", "margin-bottom": "30px" }}>LATEST REVIEW</h3>
      <style>
        {`
        .marquee-wrapper {
          overflow:hidden;
        }
        .marquee-content {
          display: inline-flex;
          gap: 30px;
          /* The animation moves the content left by exactly half its width */
          animation: scroll-marquee 30s linear infinite;
        }
        .marquee-wrapper:hover .marquee-content {
          animation-play-state: paused;
        }
        @keyframes scroll-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 15px)); }
        }
      `}
      </style>

      <div class="marquee-wrapper">
        <div class="marquee-content">
          <For each={latestReviews}>
            {(review) => <ReviewCard review={review} />}
          </For>
          <For each={latestReviews}>
            {(review) => <ReviewCard review={review} />}
          </For>
        </div>
      </div>
    </section>
  );
}

export default LatestReviews;
