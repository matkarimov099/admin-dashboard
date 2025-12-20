const Unauthorized = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 font-bold text-6xl text-gray-900">401</h1>
        <h2 className="mb-4 font-semibold text-2xl text-gray-700">Unauthorized</h2>
        <p className="mb-8 text-gray-600">You need to be authenticated to access this page.</p>
        <button
          type="button"
          className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
