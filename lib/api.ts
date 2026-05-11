import axios from "axios";
import type { Note, ValuesFormProps } from "@/types/note";

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const notehubAPI = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${myKey}`,
  },
});

export const fetchNotes = async (
  page: number = 1,
  search: string = "",
  filter?: string | undefined
): Promise<NotesResponse> => {
  const { data } = await notehubAPI.get<NotesResponse>("/notes", {
    params: {
      page,
      perPage: 12,
      search: search || undefined,
      tag: filter || undefined,
    },
  });

  return data;
};

export const createNote = async (note: ValuesFormProps): Promise<Note> => {
  const response = await notehubAPI.post<Note>("/notes", note);
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await notehubAPI.delete<Note>(`/notes/${noteId}`);
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await notehubAPI.get<Note>(`/notes/${id}`);
  return response.data;
};
