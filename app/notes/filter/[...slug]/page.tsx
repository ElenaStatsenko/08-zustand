import { fetchNotes } from "@/lib/api";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import NoteClient from "./Notes.client";
import { Metadata } from "next"

type Props = {
  params: Promise<{ slug: string[] }>; // params як проміс
  searchParams: Promise <{ page?: string; search?: string }>;
};

export default async function NotesPage({ params, searchParams }: Props) {
  const queryClient = new QueryClient();

  const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;
  const category = resolvedParams.slug[0];
  const filter = category === "All" ? undefined : category;

  const page = Number(resolvedSearchParams.page) || 1;
  const search = resolvedSearchParams.search ?? "";

  await queryClient.prefetchQuery({
    queryKey: ["notes", page, search, filter],
    queryFn: () => fetchNotes(page, search, filter),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteClient filter={filter} />
    </HydrationBoundary>
  );
}
