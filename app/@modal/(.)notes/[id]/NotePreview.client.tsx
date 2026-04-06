"use client";

import { useParams, useRouter } from "next/navigation";
import css from "./NotePreview.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Modal from "@/components/Modal/Modal";

const NotePreview = () => {
  const router = useRouter();

  const params = useParams();
  const id = params.id as string;

  const { data, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message="Something went wrong." />;

  const back = () => router.back();
  return (
    <Modal onClose={back}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{data?.title}</h2>
          </div>
          <p className={css.tag}>{data?.tag}</p>
          <p className={css.content}>{data?.content}</p>
          <p className={css.date}>{data?.createdAt}</p>
        </div>
        <button className={css.backBtn} onClick={back}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default NotePreview;
