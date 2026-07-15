import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import ExperienceDetails from "@/components/ExperienceDetails";
import Login from "@/components/Login";



type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

type Experience = {
  _id: string;
  country: string;
  catagory: string;
  image: string;
  rating: number;
  title: string;
  subTitle: string;
  experience: string;
  price: number;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

 

const session = await auth.api.getSession({
  headers: await headers(),
});

 

  if(!session){
    return(
     <Login redirect={`/explore/${id}`}/>
    )
  }

  const token = await auth.api.getToken({
    headers: await headers(),
  });


  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/experience/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );


  if (!response.ok) {
    return (
      <div className="min-h-screen pt-40 bg-white text-black">
        Failed to fetch experience
      </div>
    );
  }

  const result = await response.json();

  const experience = result.data as Experience;

  return (
    <div className="min-h-screen bg-white text-black">
      <ExperienceDetails experience={experience} />
    </div>
  );
}