"use client";

import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Loader from "@/components/Loader/Loader";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchNotes } from "@/lib/api";
import { Note } from "@/types/note";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import css from "./page.module.css";

type NotesClientProps = {
  initialPage?: number;
  initialSearch?: string;
  tag: string;
};

export default function NotesClient({
  initialPage = 1,
  initialSearch = "",
  tag,
}: NotesClientProps) {
  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState(initialSearch);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ["notes", page, search, tag],
    queryFn: () => fetchNotes(search, page, tag),
    placeholderData: keepPreviousData,
  });

  const updateSearchQuery = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 300);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const notes: Note[] = data?.notes ?? [];
  const isPagination = (data?.totalPages ?? 0) > 1;
  const totalPages = data?.totalPages ?? 0;

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message="Failed to load notes" />;
  if (notes.length === 0 ) return <div>Nothing here yet… no notes so far</div>

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={updateSearchQuery} />
        {isSuccess && isPagination && (
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        )}
        <button onClick={openModal} className={css.button}>
          Create note +
        </button>
      </header>

      <NoteList notes={notes} />

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}
