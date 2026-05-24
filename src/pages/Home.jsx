import GreetingCard from "../components/GreetingCard";
import NewReleases from "../components/NewReleases";
import LatestReviews from "../components/LatestReviews";

function Home() {
  return (
    <div style={{ "font-family": "Arial, sans-serif", "background-color": "#f0f0f0", "min-height": "100vh" }}>
      <style>{`body { margin: 0; padding: 0; }`}</style>
      
      <main class="home-page" style={{ padding: "40px" }}>
        <GreetingCard />
        <NewReleases />
        <LatestReviews />
      </main>
    </div>
  );
}

export default Home;
