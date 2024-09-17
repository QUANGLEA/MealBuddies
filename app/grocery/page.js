"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/cardComponents";
import { Plus, X } from "lucide-react";

const GroceryListPage = () => {
  const [activeItems, setActiveItems] = useState([
    { id: 1, name: "Apples" },
    { id: 2, name: "Bread" },
    { id: 3, name: "Chicken" },
    { id: 4, name: "Milk" },
    { id: 5, name: "Eggs" },
  ]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  const handleCheck = (item) => {
    setActiveItems(activeItems.filter((i) => i.id !== item.id));
    setCheckedItems([...checkedItems, item]);
  };

  const handleUncheck = (item) => {
    setCheckedItems(checkedItems.filter((i) => i.id !== item.id));
    setActiveItems([...activeItems, item]);
  };

  const handleAddItem = () => {
    if (newItem.trim() !== "") {
      setActiveItems([
        ...activeItems,
        { id: Date.now(), name: newItem.trim() },
      ]);
      setNewItem("");
    }
  };

  const handleRemoveItem = (id, isChecked) => {
    if (isChecked) {
      setCheckedItems(checkedItems.filter((item) => item.id !== id));
    } else {
      setActiveItems(activeItems.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="min-h-screen text-black bg-gradient-to-br from-green-200 to-blue-400 p-8">
      <h1 className="text-4xl font-bold text-green-800 mb-6">Grocery List</h1>
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Add new item"
              className="flex-grow mr-2 p-2 border rounded"
            />
            <button
              onClick={handleAddItem}
              className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">To Buy</h2>
          <ul>
            {activeItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between mb-2"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    onChange={() => handleCheck(item)}
                    className="form-checkbox h-5 w-5 text-green-600 mr-2"
                  />
                  <span>{item.name}</span>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id, false)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Purchased</h2>
          <ul>
            {checkedItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between mb-2 text-gray-500"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked
                    onChange={() => handleUncheck(item)}
                    className="form-checkbox h-5 w-5 text-gray-400 mr-2"
                  />
                  <span className="line-through">{item.name}</span>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id, true)}
                  className="text-red-300 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default GroceryListPage;
