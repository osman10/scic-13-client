// components/JournalSection.tsx

import Link from "next/link";

type Article = {
  category: string;
  title: string;
  readTime: string;
};

const articles: Article[] = [
  {
    category: "CULTURAL",
    title: "The art of slow travel in Kyoto",
    readTime: "6 min read",
  },
  {
    category: "BEHIND THE SCENES",
    title: "How we vet hosts in Patagonia",
    readTime: "4 min read",
  },
  {
    category: "PRACTICAL",
    title: "A packing list for Ha Long Bay",
    readTime: "3 min read",
  },
];

export default function JournalSection() {
  return (
    <section className="bg-[#faf5eb] py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10 flex items-start justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#d77d52]">
              Journal
            </p>

            <h2 className="text-5xl font-serif font-bold text-[#0d2742]">
              Stories from the road
            </h2>
          </div>

          <Link
            href="/journal"
            className="mt-8 text-sm font-medium text-[#0d2742] transition hover:opacity-70"
          >
            Read all →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.title}
              href="/journal"
              className="group rounded-2xl border border-[#e6dccf] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#d77d52]">
                {article.category}
              </p>

              <h3 className="mb-8 font-serif text-3xl font-semibold leading-snug text-[#0d2742] transition group-hover:text-[#1b4669]">
                {article.title}
              </h3>

              <p className="text-sm text-slate-500">{article.readTime}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}