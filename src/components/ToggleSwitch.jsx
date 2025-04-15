import React from 'react';

const ToggleSwitch = ({ isOn, onChange, label }) => {
  return (
    <div className="flex items-center">
      <label className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only"
            checked={isOn}
            onChange={onChange}
          />
          <div className={`block w-10 h-6 rounded-full transition-colors duration-200 ease-in-out ${
            isOn ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
          }`}></div>
          <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${
            isOn ? 'transform translate-x-4' : ''
          }`}></div>
        </div>
        <div className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </div>
      </label>
    </div>
  );
};

export default ToggleSwitch; 