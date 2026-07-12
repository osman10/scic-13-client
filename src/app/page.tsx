import Banner from "@/components/Banner";
import Featured from "@/components/Featured";
import QuestionsSection from "@/components/QuestionsSection";
import TravelStats from "@/components/TravelStats";


const page = () => {
  return (
    <div>
      <Banner />
      <TravelStats/>
      <Featured/>
      <QuestionsSection/>
    </div>
  );
};

export default page;