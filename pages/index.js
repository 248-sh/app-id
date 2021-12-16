import { getSession, signIn, signOut, useSession } from "next-auth/react";

const Authenticated = ({ session }) => (
  <div className="min-h-screen px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
    <div className="max-w-max mx-auto">
      <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-8 bg-white sm:p-10 sm:pb-6">
          <div className="flex items-center">
            <div>
              <img className="inline-block h-9 w-9 rounded-md" src={session.user.image} alt="" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                {session.user.name}
              </p>
              <a
                href={session.user.html_url}
                className="text-xs font-medium text-gray-500 group-hover:text-gray-700"
              >
                @{session.user.login}
              </a>
            </div>
          </div>

          <pre className="mt-5 text-lg text-gray-500">{JSON.stringify(session, null, 2)}</pre>
        </div>
        <div className="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-gray-50 space-y-6 sm:p-10 sm:pt-6">
          <div className="rounded-md shadow">
            <a
              href="/api/auth/signout/github"
              onClick={(e) => {
                e.preventDefault();

                signOut();
              }}
              className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900"
              aria-describedby="tier-standard"
            >
              sign out
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Unauthenticated = () => (
  <div className="min-h-screen px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
    <div className="max-w-max mx-auto">
      <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-8 bg-white sm:p-10 sm:pb-6">
          <div className="flex items-center">
            <div className="mt-4 flex items-baseline text-6xl font-extrabold">
              you're not signed in
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-gray-50 space-y-6 sm:p-10 sm:pt-6">
          <div className="rounded-md shadow">
            <a
              href="/api/auth/signin/github"
              onClick={(e) => {
                e.preventDefault();

                signIn("github");
              }}
              className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900"
              aria-describedby="tier-standard"
            >
              sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Profile = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  if (loading) {
    return <div>loading</div>;
  }

  if (session) {
    return <Authenticated session={session} />;
  }

  return <Unauthenticated />;
};

export const getServerSideProps = async (context) => ({
  props: {
    session: await getSession(context),
  },
});

export default Profile;
