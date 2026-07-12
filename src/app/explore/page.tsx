import ClientPaginatedItems from "@/components/ClientPaginatedItems";

const page = async () => {

  const res = await fetch(`${process.env.SERVER_URL}/experience`,
    { cache: "no-store" }
  )
  const experienc = await res.json();
  const data = experienc.data;


  return (
    <div className="bg-[#EDECE3] text-gray-800 min-h-[80vh]">
      <div className="container mx-auto px-6 py-24">

        <ClientPaginatedItems items={data} itemsPerPage={6} />

      </div>
    </div>
  );
};

export default page;