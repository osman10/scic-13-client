import Banner from "@/components/Banner";
import Featured from "@/components/Featured";
import JournalSection from "@/components/JournalSection";
import QuestionsSection from "@/components/QuestionsSection";
import Testimonials from "@/components/Testimonials";
import TravelStats from "@/components/TravelStats";


const page = () => {
  return (
    <div>
      <Banner />
      <TravelStats/>
      <Featured/>
      <QuestionsSection/>
      <Testimonials/>
      <JournalSection/>
    </div>
  );
};

export default page;