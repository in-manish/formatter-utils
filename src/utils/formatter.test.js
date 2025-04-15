import { describe, it, expect } from 'vitest';
import { formatInputData } from './formatter';

describe('formatInputData', () => {
  // Test valid JSON inputs
  it('should format valid JSON object correctly', () => {
    const input = '{"name":"John","age":30}';
    const expected = {
      formatted: `{
  "name": "John",
  "age": 30
}`,
      error: null,
      fixed: false
    };
    expect(formatInputData(input)).toEqual(expected);
  });

  it('should format valid JSON with nested structures', () => {
    const input = '{"user":{"name":"John","hobbies":["reading","coding"]}}';
    const expected = {
      formatted: `{
  "user": {
    "name": "John",
    "hobbies": [
      "reading",
      "coding"
    ]
  }
}`,
      error: null,
      fixed: false
    };
    expect(formatInputData(input)).toEqual(expected);
  });

  // Test Python-like dictionary inputs
  it('should format Python-style dictionary with True/False/None', () => {
    const input = '{"name":"John","active":True,"score":None}';
    const expected = {
      formatted: `{
  "name": "John",
  "active": true,
  "score": null
}`,
      error: null,
      fixed: false
    };
    expect(formatInputData(input)).toEqual(expected);
  });

  it('should format complex Python-style dictionary', () => {
    const input = '{"user":{"name":"John","active":True,"scores":[10,None,30],"settings":{"notify":False}}}';
    const expected = {
      formatted: `{
  "user": {
    "name": "John",
    "active": true,
    "scores": [
      10,
      null,
      30
    ],
    "settings": {
      "notify": false
    }
  }
}`,
      error: null,
      fixed: false
    };
    expect(formatInputData(input)).toEqual(expected);
  });

  // Test auto-fix functionality
  it('should fix missing quotes around property names', () => {
    const input = '{name:"John",age:30}';
    const expected = {
      formatted: `{
  "name": "John",
  "age": 30
}`,
      error: null,
      fixed: true
    };
    expect(formatInputData(input)).toEqual(expected);
  });

  it('should fix missing closing bracket', () => {
    const input = '{"name":"John","age":30';
    const expected = {
      formatted: `{
  "name": "John",
  "age": 30
}`,
      error: null,
      fixed: true
    };
    expect(formatInputData(input)).toEqual(expected);
  });

  it('should fix single quotes', () => {
    const input = "{'name':'John','age':30}";
    const expected = {
      formatted: `{
  "name": "John",
  "age": 30
}`,
      error: null,
      fixed: true
    };
    expect(formatInputData(input)).toEqual(expected);
  });

  it('should fix trailing commas', () => {
    const input = '{"name":"John","age":30,}';
    const expected = {
      formatted: `{
  "name": "John",
  "age": 30
}`,
      error: null,
      fixed: true
    };
    expect(formatInputData(input)).toEqual(expected);
  });

  // Test invalid inputs
  it('should handle empty input', () => {
    expect(formatInputData('')).toEqual({
      formatted: null,
      error: 'Please enter some input to format',
      fixed: false
    });
  });

  it('should handle whitespace-only input', () => {
    expect(formatInputData('   ')).toEqual({
      formatted: null,
      error: 'Please enter some input to format',
      fixed: false
    });
  });

  it('should handle null input', () => {
    expect(formatInputData(null)).toEqual({
      formatted: null,
      error: 'Please enter some input to format',
      fixed: false
    });
  });

  it('should reject non-object input', () => {
    const input = '"just a string"';
    expect(formatInputData(input)).toEqual({
      formatted: null,
      error: 'Input must be a valid JSON object or Python dictionary',
      fixed: false
    });
  });

  it('should reject invalid JSON syntax', () => {
    const input = '{"name":"John",age:30}'; // missing quotes around age
    expect(formatInputData(input)).toEqual({
      formatted: null,
      error: 'Invalid input format. Please enter a valid JSON object or Python dictionary',
      fixed: false
    });
  });

  it('should reject invalid Python dict syntax', () => {
    const input = "{'name':'John','active':True}"; // single quotes not valid in JSON
    expect(formatInputData(input)).toEqual({
      formatted: null,
      error: 'Invalid input format. Please enter a valid JSON object or Python dictionary',
      fixed: false
    });
  });
}); 