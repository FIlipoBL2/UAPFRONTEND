import GreetingCard from "../components/GreetingCard";
import NewReleases from "../components/NewReleases";
import LatestReviews from "../components/LatestReviews";

function Home() {
  return (
    <div>
      <main>
        <GreetingCard />
        <NewReleases />
        <LatestReviews />
      </main>
    </div>
  );
}

export default Home;
