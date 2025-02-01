import React from 'react'
import { Users, ShoppingCart, Package, MoreHorizontal } from "lucide-react";

function AdminDashboard() {

    const cards = [
        { title: "Products", icon: <Package size={40} />, bg: "bg-blue-500" },
        { title: "Users", icon: <Users size={40} />, bg: "bg-green-500" },
        { title: "Orders", icon: <ShoppingCart size={40} />, bg: "bg-yellow-500" },
        { title: "Others", icon: <MoreHorizontal size={40} />, bg: "bg-gray-500" },
      ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`p-6 rounded-2xl shadow-lg text-white flex flex-col items-center justify-center ${card.bg} hover:scale-105 transition-transform duration-300 cursor-pointer`}
          >
            {card.icon}
            <h2 className="text-xl font-semibold mt-3">{card.title}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminDashboard
