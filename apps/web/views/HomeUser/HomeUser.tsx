import { addDoc, collection, Timestamp } from "firebase/firestore";
import { GetServerSideProps } from "next";

import { firestore } from "../../utils/firebase";
import Background from "./components/Background";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { HomeUserProps } from "./types";

import Header from "./components/Header";
import { useAppContext } from "./hooks/useAppContext";
import TodoFooter from "./components/TodoFooter";
import { AppContextProvider } from "./context/AppContext";

const Homepage: React.FC<HomeUserProps> = ({ listId }) => {
  return (
    <main className="w-full pb-12 min-h-screen bg-gray-300 dark:bg-slate-900 dark:text-white text-slate-900 pt-20">
      <Background className="h-64 w-full absolute top-0 left-0 right-0 z-0" />
      <section className="px-4 sm:px-0 max-w-md m-auto z-10 relative ">
        <AppContextProvider listId={listId}>
          <Header />
          <TodoInput className="mb-6" />
          <TodoList />
          <TodoFooter />
        </AppContextProvider>
      </section>
    </main>
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
