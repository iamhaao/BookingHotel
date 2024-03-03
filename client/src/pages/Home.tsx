import { useQuery } from "react-query";
import Layout from "../layouts/Layout";
import { fetchHotels } from "../api";
import LastestDestinationCard from "../components/LastestDestinationCard";

function Home() {
  const { data: hotels } = useQuery("fetchHotels", fetchHotels);

  const topRowsHotels = hotels?.slice(0, 2) || [];
  const bottomRowHotels = hotels?.slice(2) || [];
  return (
    <Layout>
      <div className="space-y-3">
        <h2 className="text-3xl font-bold">Lastest Destinations</h2>
        <p>Most recent desiation added by our Hosts</p>
        <div className="grid gap-4">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            {topRowsHotels.map((hotel) => (
              <LastestDestinationCard hotel={hotel} />
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {bottomRowHotels.map((hotel) => (
            <LastestDestinationCard hotel={hotel} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Home;
