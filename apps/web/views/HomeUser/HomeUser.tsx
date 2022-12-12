import { addDoc, collection, Timestamp } from "firebase/firestore";
import { GetServerSideProps } from "next";

import { firestore } from "../../utils/firebase";
import Background from "./components/Background";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { HomeUserProps } from "./types";

const Homepage: React.FC<HomeUserProps> = ({ listId }) => {
  return (
    <main className="w-full h-screen bg-slate-900 pt-20">
      <Background className="h-1/3 w-full absolute top-0 left-0 right-0 z-0" />
      <section className="px-4 sm:px-0 max-w-md m-auto z-10 relative">
        <h1 className="text-5xl text-white mb-8">TODO</h1>
        <TodoInput className="mb-6" listId={listId} />
        <TodoList listId={listId} />
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
      const listRef = await addDoc(collection(firestore, "listas"), {
        createdAt: Timestamp.now(),
      });
      // We need to initialize an empty todo collections in order to suscribe real time changes
      await addDoc(collection(listRef, "todos"), { order: 0 });
      return listRef.id;
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
