import { fetchNotes } from '@/lib/api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotesClient from './Notes.client';

export default async function NotesPage() {
  const initialPage = 1;
  const initialSearch = '';

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', initialPage, initialSearch],
    queryFn: () => fetchNotes(initialSearch, initialPage),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialPage={initialPage} initialSearch={initialSearch} />
    </HydrationBoundary>
  );
}