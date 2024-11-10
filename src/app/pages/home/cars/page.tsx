'use client'
import CrudList from '@/app/components/CrudList'
import { createCar, deleteCar, getCars, updateCar } from '@/app/services/carActive'
import ICar from '@/app/types/carSchema';
import React, { useEffect, useState } from 'react'

const Page = () => {
  const [cars, setCars] = useState<ICar[]>([]);

  useEffect(() => {
    const fetchCars = async () => {
      try{
      const data = await getCars();
      setCars(data || []);
    } catch (error) {
      console.error("Failed to fetch cars:", error);
      setCars([]); 
    }
    };
    fetchCars();
  }, []);

  const handleCreate = async(carData: ICar) => {
    await createCar(carData);
    const updatedCars = await getCars();

    setCars(updatedCars);
  };

  const handleUpdate = async(id: string, carData: ICar) => {
    await updateCar(id, carData);
    const updatedCars = await getCars();
    setCars(updatedCars);
  };

  const handleDelete = (id: string) => {
    deleteCar(id);
    setCars((prevCars) => prevCars.filter((car) => car._id !== id));
  }; 

  return (
    <div>
      <CrudList
      items={cars}
      onAdd={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      fields={['make', 'model_car', 'year']}
      itemType="Car"
    />
    </div>
  )
}

export default Page
