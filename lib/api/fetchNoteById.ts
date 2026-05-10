import type { Note } from "@/types/note";
import { notehubAPI } from "./notehubAPI";

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await notehubAPI.get<Note>(`/notes/${id}`);
  return response.data;
};
