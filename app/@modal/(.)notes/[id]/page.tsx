import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";
import NotePreview from "@/components/NotePreview/NotePreview";


type Props = {
  params: Promise<{ id: string }>;
};

const NotePreviewPage = async ({ params }: Props) => {
  const { id } = await params;
  const note = await fetchNoteById(id);
   
  return (
    <Modal>
        <NotePreview note={note}/>
    </Modal>
  );
};

export default NotePreviewPage;