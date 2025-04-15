import { useState } from 'react';
import { formatInputData } from '../utils/formatter';
import ToggleSwitch from './ToggleSwitch';
import CopyButton from './CopyButton';
import PreviewToggle from './PreviewToggle';

const FormatterInput = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isPrettyMode, setIsPrettyMode] = useState(true);
  const [wasFixed, setWasFixed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedOutput, setEditedOutput] = useState('');

  const handleFormat = () => {
    const { formatted, error: formatError, fixed } = formatInputData(input);
    setError(formatError || '');
    setOutput(formatted || '');
    setEditedOutput(formatted || '');
    setWasFixed(fixed);
  };

  const toggleViewMode = () => {
    setIsPrettyMode(!isPrettyMode);
  };

  const toggleEditMode = () => {
    if (!isEditing) {
      setEditedOutput(output);
    } else {
      try {
        // Validate JSON before saving
        JSON.parse(editedOutput);
        setOutput(editedOutput);
        setError('');
      } catch (err) {
        setError('Invalid JSON format in edited output');
        return;
      }
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-colors duration-200">
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="input" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Input (JSON or Python dict)
          </label>
          <textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-48 p-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm 
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400
                     transition-colors duration-200"
            placeholder="Enter JSON or Python dictionary here..."
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <ToggleSwitch 
              isOn={isPrettyMode} 
              onChange={toggleViewMode} 
              label="Pretty Print" 
            />
            {output && (
              <ToggleSwitch 
                isOn={isEditing} 
                onChange={toggleEditMode} 
                label="Edit Output" 
              />
            )}
          </div>
          <button
            onClick={handleFormat}
            className="px-6 py-2.5 bg-blue-500 text-white rounded-lg 
                     hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                     dark:focus:ring-offset-gray-800 transition-colors duration-200
                     shadow-md hover:shadow-lg"
          >
            Format
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg border border-red-200 dark:border-red-800">
            {error}
          </div>
        )}

        {wasFixed && (
          <div className="p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg border border-green-200 dark:border-green-800">
            <p className="font-medium">Auto-fixed common JSON formatting issues:</p>
            <ul className="mt-2 list-disc list-inside text-sm">
              <li>Added missing quotes around property names</li>
              <li>Added missing closing brackets</li>
              <li>Fixed trailing commas</li>
              <li>Converted single quotes to double quotes</li>
            </ul>
          </div>
        )}

        {output && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="output" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Formatted Output
              </label>
              <CopyButton text={isEditing ? editedOutput : output} />
            </div>
            <div
              id="output"
              className="w-full p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 
                       rounded-lg overflow-auto text-sm font-mono
                       dark:text-gray-100 transition-colors duration-200"
            >
              {isEditing ? (
                <textarea
                  value={editedOutput}
                  onChange={(e) => setEditedOutput(e.target.value)}
                  className="w-full h-48 p-3 bg-transparent border-none focus:ring-0 font-mono text-sm
                           dark:text-gray-100 resize-none"
                  spellCheck="false"
                />
              ) : (
                <PreviewToggle>
                  {isPrettyMode ? output : JSON.stringify(JSON.parse(output), null, 0)}
                </PreviewToggle>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormatterInput; 