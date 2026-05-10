import type { Note } from "@/types/note";
import { notehubAPI } from "./notehubAPI";

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await notehubAPI.delete<Note>(`/notes/${noteId}`);
  return response.data;
};
