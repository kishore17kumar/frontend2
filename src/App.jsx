import React, { useState } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [filter, setFilter] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError(''); 
    setLoading(true); 
    try {
      const parsedJson = JSON.parse(jsonInput);
      const payload = { data: parsedJson };
      const res = await axios.post('https://backend-cxvy.onrender.com/bfhl', payload);
      setResponse(res.data); 
    } catch (error) {
      setError('Invalid JSON or API error'); 
      console.error('Error:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false); 
    }
  };

  const handleFilterChange = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setFilter(options);
  };

  const renderFilteredResponse = () => {
    if (!response) return null;
    let result = {};
    if (filter.includes('Alphabets')) result.alphabets = response.alphabets;
    if (filter.includes('Numbers')) result.numbers = response.numbers;
    if (filter.includes('Highest lowercase alphabet')) result.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
    return <pre>{JSON.stringify(result, null, 2)}</pre>;
  };

  return (
    <div className='container'>
      <h1 className='heading'>Input</h1>
      <textarea
        rows="4"
        cols="50"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Enter JSON here"
      />
      <button onClick={handleSubmit} disabled={loading} className='button'>
        {loading ? 'Submitting...' : 'Submit'}
      </button>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      {response && (
        <>
          <select multiple onChange={handleFilterChange} className='select'>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
          </select>
          {renderFilteredResponse()}
        </>
      )}
    </div>
  );
}

export default App;
