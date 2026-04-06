"use client"

import { useRouter } from "next/navigation";
import css from "./NotePreview.module.css";
import { Note } from "@/types/note";


const NotePreview = ({note}: {note: Note}) => {
  const router = useRouter();

  const back = () => router.back();
  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note?.title}</h2>
        </div>
        <p className={css.tag}>{note?.tag}</p>
        <p className={css.content}>{note?.content}</p>
        <p className={css.date}>{note?.createdAt}</p>
      </div>
      <button className={css.backBtn} onClick={back}>Close</button>
    </div>
  );
};

export default NotePreview;