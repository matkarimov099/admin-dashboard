const BadRequest = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 font-bold text-6xl text-gray-900">400</h1>
        <h2 className="mb-4 font-semibold text-2xl text-gray-700">Bad Request</h2>
        <p className="mb-8 text-gray-600">The server could not understand your request.</p>
        <button
          type="button"
          className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default BadRequest;
