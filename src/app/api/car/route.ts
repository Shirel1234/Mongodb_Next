import connect from "@/app/lib/db/mongodb";
import Car from "@/app/lib/models/Car";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await connect();
  try {
    const cars = await Car.find({});
    return NextResponse.json({ cars: cars }, { status: 201 });
  } catch (error) {
    return NextResponse.json("Error in get cars" + error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await connect();
    const { make, model, year } = await request.json();
    const existingCar = await Car.findOne({ make, model, year });

    if (existingCar) {
      return NextResponse.json(
        { message: "This car already exists" },
        { status: 409 }
      );
    }
    const newCar = new Car({ make, model, year });
    await newCar.save();

    return NextResponse.json(
      { message: "Car created successfully", car: newCar },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json("Error in creating car " + error);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connect();
  const { id } = params;
  try {
    const deletedCar = await Car.findByIdAndDelete(id);
    if (!deletedCar) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Car deleted successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json("Error in deleting car" + error);
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }
) {
  await connect();
  const { id } = params;
  const { make, model, year } =  await request.json();
  try {
    const updateCar = await Car.findByIdAndUpdate(id,
        { make, model, year }, 
        { new: true, runValidators: true } 
    );
    if (!updateCar) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Car updated successfully" , car: updateCar},
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json("Error in updating car" + error);
  }
}
