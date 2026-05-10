import type { Note, ValuesFormProps } from "@/types/note";
import { notehubAPI } from "./notehubAPI";

export const createNote = async (note: ValuesFormProps): Promise<Note> => {
  const response = await notehubAPI.post<Note>("/notes", note);
  return response.data;
};
