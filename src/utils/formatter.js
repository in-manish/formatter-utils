/**
 * Formats input string as JSON, handling both JSON and Python-like dictionary formats
 * @param {string} input - The input string to format
 * @returns {{ formatted: string | null, error: string | null, fixed: boolean }} Formatted JSON string, error message, and whether input was fixed
 */
export function formatInputData(input) {
  if (!input?.trim()) {
    return {
      formatted: null,
      error: 'Please enter some input to format',
      fixed: false
    };
  }

  // Try to fix common JSON formatting issues
  let fixedInput = input;
  let wasFixed = false;
  
  // Fix missing quotes around property names
  if (fixedInput.includes('{') && !fixedInput.includes('"') && fixedInput.includes(':')) {
    fixedInput = fixedInput.replace(/([{,]\s*)([a-zA-Z0-9_]+)(\s*:)/g, '$1"$2"$3');
    wasFixed = true;
  }
  
  // Fix missing closing bracket
  if (fixedInput.includes('{') && !fixedInput.includes('}')) {
    fixedInput += '}';
    wasFixed = true;
  }
  
  // Fix missing closing bracket with comma
  if (fixedInput.includes('{') && fixedInput.includes('}') && fixedInput.includes(',') && 
      fixedInput.lastIndexOf(',') > fixedInput.lastIndexOf('}')) {
    fixedInput = fixedInput.replace(/,\s*}/g, '}');
    wasFixed = true;
  }
  
  // Fix single quotes
  if (fixedInput.includes("'")) {
    fixedInput = fixedInput.replace(/'/g, '"');
    wasFixed = true;
  }
  
  // Fix trailing commas
  if (fixedInput.includes(',]') || fixedInput.includes(',}')) {
    fixedInput = fixedInput.replace(/,(\s*[}\]])/g, '$1');
    wasFixed = true;
  }

  try {
    // Try parsing as JSON first
    const jsonObj = JSON.parse(fixedInput);
    
    // Ensure the input is an object, not a primitive
    if (typeof jsonObj !== 'object' || jsonObj === null) {
      return {
        formatted: null,
        error: 'Input must be a valid JSON object or Python dictionary',
        fixed: false
      };
    }
    
    return {
      formatted: JSON.stringify(jsonObj, null, 2),
      error: null,
      fixed: wasFixed
    };
  } catch (jsonError) {
    try {
      // If JSON parsing fails, try parsing as Python dict
      const cleanedInput = fixedInput.trim();
      if (!cleanedInput.startsWith('{') || !cleanedInput.endsWith('}')) {
        return {
          formatted: null,
          error: 'Input must be a valid JSON object or Python dictionary',
          fixed: false
        };
      }

      // Replace Python's True/False/None with JavaScript's true/false/null
      const jsCompatible = cleanedInput
        .replace(/True/g, 'true')
        .replace(/False/g, 'false')
        .replace(/None/g, 'null');

      // Try parsing the Python-like dict as JSON
      const pythonObj = JSON.parse(jsCompatible);
      
      // Double-check that we have an object
      if (typeof pythonObj !== 'object' || pythonObj === null) {
        return {
          formatted: null,
          error: 'Input must be a valid JSON object or Python dictionary',
          fixed: false
        };
      }
      
      return {
        formatted: JSON.stringify(pythonObj, null, 2),
        error: null,
        fixed: wasFixed
      };
    } catch (pythonError) {
      return {
        formatted: null,
        error: 'Invalid input format. Please enter a valid JSON object or Python dictionary',
        fixed: false
      };
    }
  }
} 