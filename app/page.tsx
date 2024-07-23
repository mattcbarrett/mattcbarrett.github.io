import Link from "next/link";

export default function Home() {
  return (
    <>
    <div className="flex min-h-12 justify-center items-center bg-zinc-900">
      <div className="w-4/5 space-x-4 space-y-4 text-center">
        <Link href={"/home"}>Home</Link>
        <Link href={"/projects"}>Projects</Link>
        <Link href={"/blog"}>Blog</Link>
      </div>
    </div>
    <div className="flex space-x-8 items-center justify-center bg-zinc-900">
      <div className="w-4/5 mx-auto">
        <div className="flex space-x-8 justify-center">
          <div className="flex flex-col w-3/5 space-y-4 items-center justify-start min-h-screen">
            <div className="p-8 space-y-4 rounded-lg shadow-lg w-full bg-zinc-800">
              <div className="flex justify-between"> 
                <div className="text-xl">
                  Title
                </div>
                <div className="text-sm">
                  7/12/2024
                </div>
              </div>
              <div className="text-justify p-x-4">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
              </div>
              <div className="text-right text-sm">
                -Matt
              </div>
            </div>
            <div className="p-8 space-y-4 rounded-lg shadow-lg w-full bg-zinc-800">
              <div className="flex justify-between">
                <div className="text-xl">
                  Title
                </div>
                <div className="text-sm">
                  7/12/2024
                </div>
              </div>
              <div className="text-justify p-x-4">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </div>
              <div className="text-right text-sm">
                -Matt
              </div>
            </div>
            <div className="p-8 space-y-4 rounded-lg shadow-lg w-full bg-zinc-800">
              <div className="flex justify-between">
                <div className="text-xl">
                  Title
                </div>
                <div className="text-sm">
                  7/12/2024
                </div>
              </div>
              <div className="text-justify p-x-4">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </div>
              <div className="text-right text-sm">
                -Matt
              </div>
            </div>
          </div>
          <div className="flex flex-col w-1/5 items-center justify-start">
            <div className="p-8 rounded-lg shadow-lg w-full text-left bg-zinc-800">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
