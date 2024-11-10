import CrudList from '@/app/components/CrudList'
import { createCar, deleteCar, getCars, updateCar } from '@/app/services/carActive'
import ICar from '@/app/types/carSchema';
import React from 'react'

const page = async() => {

  const cars: ICar[] = await getCars();
  return (
    <div>
      <CrudList
      items={cars}
      onAdd={createCar}
      onUpdate={updateCar}
      onDelete={deleteCar}
      fields={['make', 'model', 'year']}
      itemType="Car"
    />
    </div>
  )
}

export default page
