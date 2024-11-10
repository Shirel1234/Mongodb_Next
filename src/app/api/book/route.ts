import connect from "@/app/lib/db/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Book from "@/app/lib/models/Book";

export async function GET() {
    await connect();
    try {
      const books = await Book.find({});
      return NextResponse.json({ books: books }, { status: 201 });
    } catch (error) {
      return NextResponse.json("Error in get books" + error);
    }
  }

export async function POST(request: NextRequest){
    try{
        await connect();
        const {title, author, rating} = await request.json();
        const existingBook = await Book.findOne({ title, author, rating});

        if (existingBook) {
            return NextResponse.json(
              { message: "This book already exists" },
              { status: 409 }
            );
          }

        const newBook = new Book({title, author, rating});
        await newBook.save();

        return NextResponse.json({message:'Book created successfully', book: newBook},
            {status: 201}
        );
    }catch(error){
        return NextResponse.json("Error in creating book" +error);
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
  ) {
    await connect();
    const { id } = params;
    try {
      const deletedBook = await Book.findByIdAndDelete(id);
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
  
  export async function PUT(request: NextRequest, { params }: { params: { id: string } }
  ) {
    await connect();
    const { id } = params;
    const { title, author, rating } =  await request.json();
    try {
      const updateBook = await Book.findByIdAndUpdate(id,
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
