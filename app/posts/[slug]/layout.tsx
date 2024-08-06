import Sidebar from "@/app/components/Sidebar"

export default function PostLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here


  return (
    <div className="flex space-x-8 items-center justify-center bg-zinc-900">
      <div className="w-4/5 mx-auto">
        <div className="flex space-x-8 justify-center">
          <div className="flex flex-col w-3/5 space-y-4 items-center justify-start min-h-screen">
            <div className="p-8 space-y-4 rounded-lg shadow-lg w-full bg-zinc-800">
              <div className="text-justify p-x-4 space-y-4">
                {children}
              </div>
            </div>
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  )
}