
import connect from "@/app/lib/db/mongodb";
import Car from "@/app/lib/models/Car";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    req: NextRequest,
    { params }: { params: { carId: string } }
  ) {
    await connect();
    const { carId } = params;
    try {
      const deletedCar = await Car.findByIdAndDelete(carId);
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
  
  export async function PUT(request: NextRequest, { params }: { params: { carId: string } }
  ) {
    await connect();
    const { carId } = params;
    const { make, model_car, year } =  await request.json();
    try {
      const updateCar = await Car.findByIdAndUpdate(carId,
          { make, model_car, year }, 
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