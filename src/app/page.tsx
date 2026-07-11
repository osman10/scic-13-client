import Banner from "@/components/Banner";
import Featured from "@/components/Featured";
import TravelStats from "@/components/TravelStats";


const page = () => {
  return (
    <div>
      <Banner />
      <TravelStats/>
      <Featured/>
    </div>
  );
};

export default page;