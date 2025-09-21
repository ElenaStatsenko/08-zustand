import { fetchNoteById } from "@/lib/api";

import NoteDetails from "./NoteDetails.client";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

type Props = {
  params: Promise<{ id: string }>;
};

const PageNotePreview = async ({ params }: Props) => {
  const queryClient = new QueryClient();
  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });
  

  return (
     <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetails/>
      </HydrationBoundary>
    
  );
};

export default PageNotePreview;