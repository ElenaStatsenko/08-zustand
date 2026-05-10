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
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = slug[0];
  const filterLabel = category === "All" ? "All notes" : `${category} notes`;

  const title = `${filterLabel} | NoteHub`;
  const description =
    category === "All"
      ? "Browse all notes in NoteHub — a simple and efficient app for managing notes and organizing your tasks."
      : `Browse notes filtered by category "${category}" in NoteHub — a simple and efficient app for managing notes and organizing your tasks.`;

  const url = `https://notehub.vercel.app/notes/filter/${category}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub",
        },
      ],
      type: "website",
    },
  };
}


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
