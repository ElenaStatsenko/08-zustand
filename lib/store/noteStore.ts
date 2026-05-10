import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ValuesFormProps } from "@/types/note";

const initialDraft: ValuesFormProps = {
  title: "",
  content: "",
  tag: "Todo",
};

type NoteStore = {
  draft: ValuesFormProps;
  setDraft: (note: ValuesFormProps) => void;
  clearDraft: () => void;
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set({ draft: note }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "note-draft",
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);
