import Link from "next/link";

const posts = [
  {
    id: 1,
    category: "Cultural",
    title: "The art of slow travel in Kyoto",
    description:
      "Why we build every Kyoto itinerary around one meal, one tea, and one walk — never three.",
    readTime: "6 min read",
    slug: "slow-travel-kyoto",
  },
  {
    id: 2,
    category: "Behind the scenes",
    title: "How we vet hosts in Patagonia",
    description:
      "Meet Camila, our regional editor for the south cone, and the checklist she carries.",
    readTime: "4 min read",
    slug: "vet-hosts-patagonia",
  },
  {
    id: 3,
    category: "Practical",
    title: "A packing list for Ha Long Bay",
    description:
      "Ten things we never leave Hanoi without — and one we regretted bringing.",
    readTime: "3 min read",
    slug: "packing-list-ha-long-bay",
  },
  {
    id: 4,
    category: "Behind the scenes",
    title: "The economics of a fair booking",
    description:
      "Where every dollar of a Voyagio booking goes. In plain numbers.",
    readTime: "8 min read",
    slug: "economics-of-a-fair-booking",
  },
];

const JournalSection = () => {
  return (
    <section className="bg-[#F6F2E8] py-24">
      <div className="container mx-auto px-6">


        <h2 className="mb-14 mt-15 text-5xl font-bold text-[#12232D]">
          Stories from the road
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={""}
              className="group rounded-2xl border border-[#DDDCCF] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-orange-500">
                {post.category}
              </p>

              <h3 className="mb-4 text-3xl font-bold leading-snug text-[#12232D] transition-colors group-hover:text-orange-500">
                {post.title}
              </h3>

              <p className="mb-8 text-lg leading-8 text-gray-600">
                {post.description}
              </p>

              <span className="text-sm text-gray-500">{post.readTime}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JournalSection;