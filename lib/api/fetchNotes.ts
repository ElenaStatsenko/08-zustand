import { notehubAPI, type NotesResponse } from "./notehubAPI";

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
