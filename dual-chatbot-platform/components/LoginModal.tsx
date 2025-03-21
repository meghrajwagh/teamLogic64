"use client";
import React from "react";

const LoginModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null; // Don't render if closed

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-black">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input type="text" placeholder="Username" className="w-full p-2 border rounded mb-2" />
        <input type="password" placeholder="Password" className="w-full p-2 border rounded mb-2" />
        <button className="w-full bg-blue-500 text-white py-2 rounded">Login</button>
        <button className="mt-2 w-full bg-red-500 text-white py-2 rounded" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default LoginModal;