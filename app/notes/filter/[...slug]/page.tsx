import { fetchNotes } from '@/lib/api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotesClient from './Notes.client'

const tags = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function NotesPage({ params }: Props) {
  const initialPage = 1;
  const initialSearch = '';
  const { slug } = await params;

  const queryClient = new QueryClient();

   let tag: string = slug[0]; // todo

  // if (tags.includes(tag)) {
  //   tag = tag
  // } else {
  //   tag = ''
  // }

  if (!tags.includes(tag)) {
    tag = ''
  }

  await queryClient.prefetchQuery({
    queryKey: ['notes', initialPage, initialSearch, tag],
    queryFn: () => fetchNotes(initialSearch, initialPage, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialPage={initialPage} initialSearch={initialSearch} tag={tag} />
    </HydrationBoundary>
  );
}