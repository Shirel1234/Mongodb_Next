import connect from "@/app/lib/db/mongodb";
import Book from "@/app/lib/models/Book";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    req: NextRequest,
    { params }: { params: { bookId: string } }
  ) {
    await connect();
    const { bookId } = params;
    try {
      const deletedBook = await Book.findByIdAndDelete(bookId);
      if (!deletedBook) {
        return NextResponse.json({ error: "Book not found" }, { status: 404 });
      }
      return NextResponse.json(
        { message: "Book deleted successfully" },
        { status: 201 }
      );
    } catch (error) {
      return NextResponse.json("Error in deleting book" + error);
    }
  }
  
  export async function PUT(request: NextRequest, { params }: { params: { bookId: string } }
  ) {
    await connect();
    const { bookId } = params;
    const { title, author, rating } =  await request.json();
    try {
      const updateBook = await Book.findByIdAndUpdate(bookId,
          { title, author, rating }, 
          { new: true, runValidators: true } 
      );
      if (!updateBook) {
        return NextResponse.json({ error: "Book not found" }, { status: 404 });
      }
      return NextResponse.json(
        { message: "Book updated successfully" , book: updateBook},
        { status: 201 }
      );
    } catch (error) {
      return NextResponse.json("Error in updating book" + error);
    }
  }