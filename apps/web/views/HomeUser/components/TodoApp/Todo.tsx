import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { query, collection } from "firebase/firestore";
import { firestore } from "utils/firebase";

const TodoApp: React.FC = () => {
  // @ts-ignore
  const ref = query(collection(firestore, "todo-lists"));
  // @ts-ignore
  // Provide the query to the hook
  const { isLoading, data } = useFirestoreQueryData(["todo-lists"], ref);
  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data) {
    return (
      <>
        {data.map((todo, i) => {
          return <div key={`todo-item-${i}`}>{todo.task}</div>;
        })}
      </>
    );
  }

  return null;
};

export default TodoApp;
