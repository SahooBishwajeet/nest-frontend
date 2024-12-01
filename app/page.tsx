"use client";

import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/course");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to Nest</h1>
      <p className="text-lg text-gray-600 mb-6">Your gateway to learning and progress tracking.</p>
      <button
        onClick={handleNavigate}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
      >
        Go to Course
      </button>
    </div>
  );
};

export default HomePage;
