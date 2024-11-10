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
    const newBook = await createBook(bookData);
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  const handleUpdate = (id: string, bookData: IBook) => {
    updateBook(id, bookData);
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
