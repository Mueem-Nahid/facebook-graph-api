import { Inter } from "next/font/google";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addPost } from "@/services/post";
import { signIn, signOut, useSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [post, setPost] = useState({
    message: "",
    link: "",
    scheduledPublishTime: "0",
  });
  const { data: session } = useSession();

  console.log(session);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addPost(post);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="w-full max-w-xs">
        <div className="flex items-center justify-between my-2">
          {!session?.user ? (
            <button
              onClick={() => signIn()}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Connect with Facebook
            </button>
          ) : (
            <button
              onClick={() => signOut()}
              className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign out from {session?.user?.name}
            </button>
          )}
        </div>

        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="post"
            >
              Post:
            </label>
            <textarea
              onChange={(e) => setPost({ ...post, message: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="post"
              type="text"
              placeholder="Share your post..."
            />
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="link"
            >
              Link:
            </label>
            <input
              onChange={(e) => setPost({ ...post, link: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="link"
              type="text"
              placeholder="Share post link"
            />
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="schedule"
            >
              Schedule:
            </label>
            <select
              onChange={(e) =>
                setPost({ ...post, scheduledPublishTime: e.target.value })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="schedule"
            >
              <option value="0">Instant post</option>
              <option value="15">Post after 15 minutes</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={(e) => handleSubmit(e)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Post
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
      <div className="mt-5">
        <a href="https://www.facebook.com/profile.php?id=61557021800663">
          Page link: https://www.facebook.com/profile.php?id=61557021800663
        </a>
      </div>
    </main>
  );
}
