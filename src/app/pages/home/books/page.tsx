'use client'
import CrudList from "@/app/components/CrudList"
import { createBook, deleteBook, getBooks, updateBook } from "@/app/services/bookActive"
import IBook from "@/app/types/bookSchema";
import { useEffect, useState } from "react";


const Page = () => {
  const [books, setBooks] = useState<IBook[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try{
      const data = await getBooks();
      setBooks(data || []);
    } catch (error) {
      console.error("Failed to fetch books:", error);
      setBooks([]); 
    }
    };
    fetchBooks();
  }, []);

  const handleCreate = async(bookData: IBook) => {
    await createBook(bookData);
    const updatedBooks = await getBooks();
    setBooks(updatedBooks);
  };

  const handleUpdate = async(id: string, bookData: IBook) => {
    await updateBook(id, bookData);
    const updatedBooks = await getBooks();
    setBooks(updatedBooks);
  };

  const handleDelete = (id: string) => {
    deleteBook(id);
    setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
  };

  return (
    <div>
      <CrudList
        items={books}
        onAdd={handleCreate}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        fields={['title', 'author', 'rating']}
        itemType="Book"
      />
    </div>
  )
}

export default Page
