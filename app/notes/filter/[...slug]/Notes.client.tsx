"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";
import Link from "next/link";
import Pagination from "@/components/Pagination/Pagination";
import { fetchNotes } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import NoteList from "@/components/NoteList/NoteList";
import css from "./Notes.client.module.css";

interface TagProps {
  filter?: string | undefined;
}

export default function NotesPage({ filter }: TagProps) {
  const [page, setPage] = useState(1);
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

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          onSearch={(value) => {
            setPage(1);
            debouncedSetSearch(value);
          }}
        />

        {isSuccess && data.totalPages > 1 && (
          <Pagination
            pageCount={data?.totalPages ?? 0}
            page={page}
            setPage={setPage}
          />
        )}

        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {data?.notes && <NoteList notes={data?.notes} />}
    </div>
  );
}
