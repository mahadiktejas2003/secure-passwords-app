import React, { useState } from 'react';

const SavedPasswordItem = ({ item, onCopy, onDelete }) => {
  const [show, setShow] = useState(false);

  return (
    <li className="bg-gray-800 rounded p-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3 border border-gray-700 transition hover:shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
        <span className="font-semibold text-orange-300 text-base">{item.website}</span>
        <a href={item.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline break-all text-sm">{item.websiteUrl}</a>
      </div>
      <div className="flex items-center gap-2">
        <input
          type={show ? 'text' : 'password'}
          value={item.password}
          readOnly
          className="bg-gray-700 px-2 py-1 rounded text-orange-400 w-40 text-base border border-gray-600 focus:outline-none"
        />
        <button
          onClick={() => setShow(s => !s)}
          className="bg-gray-600 text-white px-2 py-1 rounded text-xs hover:bg-gray-500 transition border border-gray-500"
        >{show ? 'Hide' : 'Show'}</button>
        <button
          onClick={() => onCopy(item.password)}
          className="bg-blue-700 text-white px-3 py-1 rounded text-xs hover:bg-blue-800 transition border border-blue-800"
        >Copy</button>
        <button
          onClick={() => onDelete(item.id)}
          className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 transition border border-red-700"
        >Delete</button>
      </div>
    </li>
  );
};

export default SavedPasswordItem;
