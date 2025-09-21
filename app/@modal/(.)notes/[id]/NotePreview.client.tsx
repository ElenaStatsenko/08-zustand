"use client"
import Modal from "@/components/Modal/Modal";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from 'next/navigation';
import { fetchNoteById } from "@/lib/api";
import css from './NotePreview.client.module.css'


const NotePreview = () => {
	const { id } = useParams<{ id: string }>();
  const router = useRouter();

    const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading...</p>;

  if (error || !note) return <p>Some error..</p>;

  const formattedDate = note.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : `Created at: ${note.createdAt}`;

  return (
    <Modal onClose={() => router.back()}>
        <div className={css.container}>
            <div className={css.item}>
      <h1 className={css.header}>{note.title}</h1>
      <p className={css.content }>{note.content}</p>
      <p className={css.tag }>{note.tag}</p>
      <p className={css.date }>{formattedDate}</p>
      </div>
      </div>
    </Modal>
  );
};

export default NotePreview;