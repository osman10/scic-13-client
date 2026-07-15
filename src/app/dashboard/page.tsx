
import Login from "@/components/Login";
import PieChartWithCustomizedLabel from "@/components/PieChartWithCustomizedLabel";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export interface Experience {
    _id: string;
    country: string;
    catagory: string;
    image: string;
    rating: number;
    title: string;
    subTitle: string;
    experience: string;
    price: number;
}

interface ExperienceResponse {
    data: Experience[];
}

const Page = async () => {

    const session = await auth.api.getSession({
      headers: await headers(),
    });
    
      if(!session){
        return(
         <Login redirect={`/dashboard`}/>
        )
      }
    
      const token = await auth.api.getToken({
        headers: await headers(),
      });
    


    const res = await fetch(`${process.env.SERVER_URL}/experience`, {
        cache: "no-store", // Always fetch fresh data
    });

    if (!res.ok) {
        throw new Error("Failed to fetch experiences");
    }

    const experiences: ExperienceResponse = await res.json();

    return (
        <div className="min-h-screen bg-[#faf5eb] p-6">
            <div className="container mx-auto pt-40">
                <div className="mb-12 text-center">
                    <span className="inline-block rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold tracking-wide text-emerald-700 uppercase">
                        Travel Insights
                    </span>

                    <h1 className="mt-4 text-4xl font-extrabold text-gray-900 md:text-5xl">
                        Explore Experiences by Category
                    </h1>

                    <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">
                        Discover how our travel experiences are distributed across adventure,
                        culture, food, wellness, wildlife, and city breaks. This chart provides
                        a quick overview of the variety of journeys available.
                    </p>
                </div>

                <PieChartWithCustomizedLabel data={experiences.data} />
            </div>
        </div>
    );
};

export default Page;