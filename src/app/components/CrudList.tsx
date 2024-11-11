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
  const [editingItem, setEditingItem] = useState<T | null>(null);

  const handleInputChange = (key: keyof T, value: string) => {
    if (editingItem) {
      setEditingItem((prevEditingItem) => ({
        ...prevEditingItem,
        [key]: value,
      }));
    } else {
      setNewItem((prevNewItem) => ({
        ...prevNewItem,
        [key]: value,
      }));
    }
  };

  const handleAdd = () => {
    onAdd(newItem);
    resetNewItem();
  };

  const resetNewItem = () => {
    setNewItem({} as T);
  };

  const handleSave = () => {
    if (editingItem) {
      onUpdate(editingItem._id, editingItem);
      setEditingItem(null);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">{itemType} List</h1>

      <table className="w-full border">
        <thead>
          <tr>
            {fields.map((field) => (
              <th key={String(field)} className="border px-4 py-2 capitalize">
                {String(field)}
              </th>
            ))}
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              {fields.map((field) => (
                <td key={String(field)} className="border px-4 py-2">
                  {editingItem && editingItem._id === item._id ? (
                    <input
                      type="text"
                      value={(editingItem[field] as string) || ''}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                      className="border px-2 py-1"
                    />
                  ) : (
                    String(item[field])
                  )}
                </td>
              ))}
              <td className="border px-4 py-2">
                {editingItem && editingItem._id === item._id ? (
                  <>
                    <button onClick={handleSave} className="bg-green-500 text-white px-2 py-1 mr-2">
                      Save
                    </button>
                    <button onClick={() => setEditingItem(null)} className="bg-gray-500 text-white px-2 py-1">
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setEditingItem(item)} className="bg-blue-500 text-white px-2 py-1 mr-2">
                      Edit
                    </button>
                    <button onClick={() => onDelete(item._id)} className="bg-red-500 text-white px-2 py-1">
                      Delete
                    </button>
                  </>
                )}
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
            value={(newItem[field] as string) || ''}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className="border px-2 py-1 mb-2 mr-2"
          />
        ))}
        <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2">
          Add
        </button>
      </div>
    </div>
  );
}

export default CrudList;
