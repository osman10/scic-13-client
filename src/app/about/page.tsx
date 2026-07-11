const page = () => {
  return (
    <div className="bg-[#EDECE3] text-gray-800 min-h-[80vh]">
      <div className="container mx-auto px-6 py-24">


        <h1 className="mt-4 text-5xl font-bold leading-tight md:text-6xl max-w-xl">
          Travel, at the pace of a conversation.
        </h1>

        <div className="mt-10 space-y-6 text-lg leading-8 text-gray-700 max-w-2xl">
          <p>
            Voyagio started in 2023 with a question: why does most travel feel
            like a checklist? We wanted to build a place where a Balinese rice
            farmer, a Kyoto tea master, and a Patagonian guide could reach
            travelers directly — without algorithms, upsells, or fine print.
          </p>

          <p>
            Today, 1,200 hosts across 42 countries publish on Voyagio. Every one
            has been interviewed by a regional editor. Every trip is protected.
            And every booking pays the host fairly.
          </p>

          <p>
            We're a small team of former travel writers, engineers, and yes —
            hosts. If you'd like to join us, we'd love to hear from you.
          </p>
        </div>

        <a
          href="/experiences"
          className="mt-12 inline-flex items-center gap-2 text-lg font-medium text-white transition hover:gap-3 bg-[var(--primary)] rounded-full px-4 py-2"
        >
          Explore experiences
          <span aria-hidden>→</span>
        </a>
      </div>
    </div>
  );
};

export default page;