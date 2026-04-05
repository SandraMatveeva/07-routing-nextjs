import { fetchNotes } from '@/lib/api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotesClient from './Notes.client'

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function NotesPage({ params }: Props) {
  const initialPage = 1;
  const initialSearch = '';
  const { slug } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', initialPage, initialSearch],
    queryFn: () => fetchNotes(initialSearch, initialPage),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialPage={initialPage} initialSearch={initialSearch} slug={slug} />
    </HydrationBoundary>
  );
}