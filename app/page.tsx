import Image from "next/image";

export default function Home() {
  return (
    <div className="flex space-x-8 items-center">
      <div className="flex flex-col space-y-4 items-center justify-center min-h-screen bg-zinc-900">
        <div className="p-8 rounded-lg shadow-lg max-w-sm w-full text-center bg-zinc-800">
          sup
        </div>
        <div className="p-8 rounded-lg shadow-lg max-w-sm w-full text-center bg-zinc-800">
          sup?
        </div>
        <div className="p-8 rounded-lg shadow-lg max-w-sm w-full text-center bg-zinc-800">
          sup.
        </div>
      </div>
      <div className="p-8 rounded-lg shadow-lg max-w-sm w-full text-center bg-zinc-800">
        about
      </div>
    </div>
  );
}
