import { For, ErrorBoundary } from "solid-js";
import { userStore } from "../pages/userStore";
import ReviewCard from "./ReviewCard";

function LatestReviews() {
  return (
    <ErrorBoundary fallback={<p style={{ color: "#ff4d4f", padding: "20px", "background-color": "#202531", "border-radius": "10px" }}>Could not load latest reviews.</p>}>
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
          <For each={userStore.latestReviews}>
            {(review) => <ReviewCard review={review} />}
          </For>
          <For each={userStore.latestReviews}>
            {(review) => <ReviewCard review={review} />}
          </For>
        </div>
      </div>
      </section>
    </ErrorBoundary>
  );
}

export default LatestReviews;
