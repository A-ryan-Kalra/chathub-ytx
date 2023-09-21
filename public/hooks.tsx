import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "../firebaseConfig";
import { Employee } from "../Types";
import { useRouter } from "next/router";

export const fetchFiles = () => {
  //   const [post, setPost] = useState<Employee>([]);
  const router = useRouter();
  useEffect(() => {
    router.reload();
    // router.refresh();

    return onSnapshot(collection(database, "Users"), (snapshot) => {
      console.log(snapshot.docs);
      //   console.log(post[0]?.data());
    });
  }, [database]);

  //   console.log(post[0]?.data());
};
