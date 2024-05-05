"use client";
import { Footer } from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import { postState, sessionState } from "../../atoms/modalAtoms";
import { atom, useRecoilState } from "recoil";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Employee } from "../../Types";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { auth, database } from "../../firebaseConfig";

export default function Home() {
  const [session, setSession] = useRecoilState<object>(sessionState || []);
  const [post, setPost] = useRecoilState<Employee>(postState || []);

  // console.log(session);

  useEffect(() => {
    let token: object = JSON.parse(sessionStorage.getItem("token") || "{}");
    // let serPost: object = JSON.parse(sessionStorage.getItem("post") || "{}");

    // console.log(token);
    setSession(token);
  }, []);

  const router = useRouter();
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     console.log(user);
  //   });
  // }, []);
  // console.log(Object.keys(session).length);
  useEffect(
    () =>
      onSnapshot(
        query(collection(database, "Users"), orderBy("timestamp", "desc")),
        (snapshot) => {
          let events: any = [];
          snapshot.forEach((doc) => {
            events.push({ ...doc.data() });
            // console.log(doc.data());
          });
          setPost(events);
          // console.log(post[0]?.data());
          sessionStorage.setItem("post", JSON.stringify(events));
        }
      ),
    [database]
  );

  // console.log(post);
  return (
    <main className=" max-h-screen overflow-y-auto">
      <div className=" max-h-screen overflow-y-auto">
        <Nav />
        <Hero />
        <Footer />
      </div>
    </main>
  );
}
