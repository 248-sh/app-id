const AccessDenied = () => (
  <div className="min-h-screen px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
    <div className="max-w-max mx-auto">
      <main className="sm:flex">
        <p className="text-4xl font-extrabold text-red-600 sm:text-5xl">400</p>
        <div className="sm:ml-6">
          <div className="sm:border-l sm:border-gray-200 sm:pl-6">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
              nope
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

export default AccessDenied;
