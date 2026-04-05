import axios from "axios";
import type { Note } from "../types/note";

interface ResponseResult {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(search: string, page: number, tag: string = ''): Promise<ResponseResult> {
  let url = `https://notehub-public.goit.study/api/notes?search=${search}&page=${page}&perPage=12`

  if (tag) {
    url = `https://notehub-public.goit.study/api/notes?search=${search}&page=${page}&tag=${tag}&perPage=12`
  }

  const result = await axios.get<ResponseResult>(
    url,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    },
  );

  return result.data;
}

type CreateNoteData = {
  title: string;
  content: string;
  tag: string;
};

export async function createNote(data: CreateNoteData): Promise<Note> {
  const response = await axios.post<Note>(
    `https://notehub-public.goit.study/api/notes`,
    data,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
        
      },
      
    },
  );

  return response.data;
  
}



export async function deleteNote(id: string): Promise<Note> {
  const response = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    },
  );

  return response.data
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await axios.get<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    },
  );

  return response.data
}