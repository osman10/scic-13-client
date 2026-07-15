import Login from "@/components/Login";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import Link from "next/link";

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return <Login redirect="/my-listing" />;
  }

  const email = session.user.email;
  const token = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/experience/email/${encodeURIComponent(email)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
      cache: "no-store",
    }
  );

  let experiences: any[] = [];

  if (res.ok) {
    const result = await res.json();
    experiences = result.data || [];
  }

  return (
    <div className="min-h-screen bg-amber-50 p-6">
      <div className="container mx-auto mt-20 max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">
            My Experience Listings
          </h1>
          <Link
            href="/host"
            className="rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700 transition-colors"
          >
            + Add Experience
          </Link>
        </div>

        {experiences.length === 0 ? (
          <div className="rounded-lg bg-white p-8 text-center shadow">
            <p className="text-gray-500">
              You haven't added any experience yet.
            </p>
          </div>
        ) : (
          <ul className="space-y-6">
            {experiences.map((experience) => (
              <li
                key={experience._id.toString()}
                className="overflow-hidden rounded-xl border bg-white shadow"
              >
                <img
                  src={experience.image}
                  alt={experience.title}
                  className="h-64 w-full object-cover"
                />
                <div className="p-6">
                  <div className="space-y-3">
                    <h2 className="text-2xl font-semibold text-gray-800">
                      {experience.title}
                    </h2>
                    <p className="text-lg text-gray-600">
                      {experience.subTitle}
                    </p>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-700">
                      <span className="rounded-full bg-amber-100 px-3 py-1">
                        {experience.country}
                      </span>
                      <span className="rounded-full bg-blue-100 px-3 py-1">
                        {experience.catagory}
                      </span>
                      <span className="rounded-full bg-yellow-100 px-3 py-1">
                        ⭐ {experience.rating}
                      </span>
                    </div>
                    <p className="pt-2 text-gray-700">
                      {experience.experience}
                    </p>
                    <p className="text-xl font-bold text-green-700">
                      ${experience.price}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Page;