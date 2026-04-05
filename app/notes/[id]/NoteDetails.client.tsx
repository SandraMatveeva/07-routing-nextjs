"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "./page.module.css";
import { useParams } from 'next/navigation';
import { fetchNoteById } from "@/lib/api";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";



export default function NoteDetailsClient() {
  const params = useParams();
  const id = params.id as string;

    const { data, isLoading, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

    if (isLoading) return <Loader />;
    if (error) return <ErrorMessage message='Something went wrong.' />;




  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
        <h2>{data?.title}</h2>
        </div>
        <p className={css.tag}>{data?.tag}</p>
        <p className={css.content}>{data?.content}</p>
        <p className={css.date}>{data?.createdAt}</p>
      </div>
    </div>
  );
}
