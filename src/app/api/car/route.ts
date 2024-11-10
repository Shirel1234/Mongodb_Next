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
    const { make, model_car, year } = await request.json();
    const existingCar = await Car.findOne({ make, model_car, year });

    if (existingCar) {
      return NextResponse.json(
        { message: "This car already exists" },
        { status: 409 }
      );
    }
    const newCar = new Car({ make, model_car, year });
    await newCar.save();

    return NextResponse.json(
      { message: "Car created successfully", car: newCar },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json("Error in creating car " + error);
  }
}


