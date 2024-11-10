'use client'
import { useState } from 'react';

type CrudListProps<T> = {
  items: T[];
  onAdd: (item: T) => void;
  onUpdate: (index: string, updatedItem: T) => void;
  onDelete: (index: string) => void;
  fields: Array<keyof T>;
  itemType: string;
};

function CrudList<T>({ items, onAdd, onUpdate, onDelete, fields, itemType }: CrudListProps<T>) {
  const [newItem, setNewItem] = useState([] as T);

  const handleInputChange = (key: keyof T, value: string ) => {
    setNewItem({ ...newItem, [key]: value });
  };
console.log("tgctuctc", items);
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">{itemType} List</h1>

      <table className="w-full border">
        <thead>
          <tr>
            {fields.map((field) => (
              <th key={String(field)} className="border px-4 py-2 capitalize">{String(field)}</th>
            ))}
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              {fields.map((field) => (
                <td key={String(field)} className="border px-4 py-2">{String(item[field])}</td>
              ))}
              <td className="border px-4 py-2">
                <button onClick={() => onUpdate(item._id, item)} className="bg-blue-500 text-white px-2 py-1 mr-2">Edit</button>
                <button onClick={() => onDelete(String(item._id))} className="bg-red-500 text-white px-2 py-1">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <h2>Add New {itemType}</h2>
        {fields.map((field) => (
          <input
            key={String(field)}
            type="text"
            placeholder={String(field)}
            value={(newItem[field] as string ) || ''}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className="border px-2 py-1 mb-2 mr-2"
          />
        ))}
        <button onClick={() => onAdd(newItem)} className="bg-green-500 text-white px-4 py-2">Add</button>
      </div>
    </div>
  );
}

export default CrudList;
