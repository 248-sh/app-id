import { useRouter } from "next/router";

const code = (errorCode) => {
  switch (errorCode) {
    case "AccessDenied":
      return 400;
    case "SessionRequired":
      return 400;
    default:
      return 500;
  }
};
const message = (errorCode) => {
  switch (errorCode) {
    case "AccessDenied":
    case "SessionRequired":
      return "nope";
    default:
      return "something went wrong";
  }
};

const ErrorHandler = () => {
  const router = useRouter();
  const { error: errorCode } = router.query;

  console.log("ErrorHandler errorCode", errorCode);

  return (
    <div className="min-h-screen px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="max-w-max mx-auto">
        <main className="sm:flex">
          <p className="text-4xl font-extrabold text-red-600 sm:text-5xl">{code(errorCode)}</p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                {message(errorCode)}
              </h1>
            </div>
            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              <a
                href={process.env.NEXTAUTH_URL}
                className="text-base font-medium text-red-600 hover:text-red-500"
              >
                <span aria-hidden="true">&larr; </span>go back
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ErrorHandler;
