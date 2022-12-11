import { Button } from "ui";
import { firestore } from "../../utils/firebase";

import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { collection, query } from "firebase/firestore";

export default function Homepage() {
  const ref = query(collection(firestore, "todo-lists"));

  const data = useFirestoreQueryData(["todo-lists"], ref);

  console.log("todo", data.data);

  return (
    <div>
      <h1>Hola mundo</h1>
      <Button />
    </div>
  );
}
