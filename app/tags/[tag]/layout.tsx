import Sidebar from "@/app/components/Sidebar"

export default function PostLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here


  return (
    <div className="flex space-x-8 items-center justify-center">
      <div className="lg:w-4/5 md:w-full mx-auto">
        <div className="flex flex-col lg:flex-row lg:space-x-8 justify-center">
          <div className="flex flex-col w-full lg:w-3/5 justify-start space-y-4">
            {children}
          </div>
          <div className="flex flex-col w-full space-y-4 lg:w-1/5">
            <Sidebar />
          </div>        
        </div>
      </div>
    </div>
  )
}