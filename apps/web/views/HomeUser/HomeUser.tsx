import { addDoc, collection, Timestamp } from "firebase/firestore";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { BookmarkIcon, MoonIcon, SunIcon } from "@heroicons/react/24/solid";

import { firestore } from "../../utils/firebase";
import Background from "./components/Background";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { HomeUserProps } from "./types";
import clsx from "clsx";
import { ShareIcon } from "@heroicons/react/20/solid";

const Homepage: React.FC<HomeUserProps> = ({ listId }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleShare = async () => {
    const url = `${window.location.pathname}/${listId}`;

    const shareData = {
      title: "Todo list",
      text: "Watch my todo list and help me get it done!",
      url,
    };

    try {
      await window.navigator.share(shareData);
    } catch (error) {
      navigator.clipboard.writeText(url);
      alert("Copiado al portapapeles");
      console.error("Error");
    }
  };

  return (
    <div className={darkMode ? "dark" : undefined}>
      <main className="w-full pb-12 min-h-screen bg-gray-300 dark:bg-slate-900 dark:text-white text-slate-900 pt-20">
        <Background className="h-64 w-full absolute top-0 left-0 right-0 z-0" />
        <section className="px-4 sm:px-0 max-w-md m-auto z-10 relative ">
          <div className="flex justify-between items-center mb-8  ">
            <h1 className="text-5xl text-white">TODO</h1>
            <div className="items-center grid grid-flow-col gap-4">
              <button
                onClick={handleShare}
                className={clsx(
                  "hover:text-opacity-100 text-opacity-80 text-white"
                )}
              >
                <ShareIcon className="h-8 w-8" />
              </button>
              <button
                onClick={toggleDarkMode}
                className={clsx(
                  "hover:text-opacity-100 text-opacity-80 text-white",
                  {
                    hidden: darkMode,
                  }
                )}
              >
                <MoonIcon className="h-8 w-8" />
              </button>
              <button
                onClick={toggleDarkMode}
                className={clsx(
                  "hover:text-opacity-100 text-opacity-80 text-white",
                  {
                    hidden: !darkMode,
                  }
                )}
              >
                <SunIcon className="h-8 w-8" />
              </button>
            </div>
          </div>
          <TodoInput className="mb-6" listId={listId} />
          <TodoList listId={listId} />
        </section>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<HomeUserProps> = async ({
  query,
}) => {
  // If there is a query list_id use that list
  const queryId = query.list_id;

  const getListId = async () => {
    if (queryId) return queryId.toString();
    try {
      // The todos lists reference
      const docRef = await addDoc(collection(firestore, "listas"), {
        createdAt: Timestamp.now(),
        todos: [],
      });
      return docRef.id;
    } catch (error) {
      console.error(error);
    }
  };

  let listId = await getListId();

  return {
    props: {
      listId: listId || "",
    },
  };
};

export default Homepage;
