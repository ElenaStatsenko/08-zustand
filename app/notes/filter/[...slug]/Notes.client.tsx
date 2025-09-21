"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";
import Pagination from "@/components/Pagination/Pagination";
import { fetchNotes } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import NoteList from "@/components/NoteList/NoteList";
import css from "./Notes.client.module.css";
import ModalForm from "@/components/ModalForm/ModalForm";
import NoteForm from "@/components/NoteForm/NoteForm";

interface TagProps {
  filter?: string | undefined;
}

export default function NotesPage({ filter }: TagProps) {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const debouncedSetSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
  }, 500);

  const { data, isSuccess } = useQuery({
    queryKey: ["notes", page, search, filter],
    queryFn: () => fetchNotes(page, search, filter),
    refetchOnMount: false,
    placeholderData: keepPreviousData,
  });
  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          onSearch={(value) => {
            setPage(1); // ✅ скидати сторінку одразу при зміні пошуку
            debouncedSetSearch(value); // ✅ і оновити search з debounce
          }}
        />

        {isSuccess && data.totalPages > 1 && (
          <Pagination
            pageCount={data?.totalPages ?? 0}
            page={page}
            setPage={setPage}
          />
        )}

        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      {data?.notes && <NoteList notes={data?.notes} />}
      {isModalOpen && (
        <ModalForm onClose={closeModal}>
          <NoteForm onCancel={closeModal} />
        </ModalForm>
      )}
    </div>
  );
}
