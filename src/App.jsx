import React, { useState, useEffect } from 'react';

const NestedSelectOptions = () => {
  const [data, setData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    selectedSectors: [],
    agreeToTerms: false,
  });

  const indentation = '\u00A0\u00A0\u00A0\u00A0';

  useEffect(() => {
    // Fetch the JSON data
    fetch('http://localhost:5000/data')
      .then(response => response.json())
      .then(jsonData => {
        setData(jsonData[0]);
        console.log(jsonData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSave = () => {
    // Task 3.1: Validate all input data (all fields are mandatory)
    if (!formData.name || formData.selectedSectors.length === 0 || !formData.agreeToTerms) {
      alert('Please fill in all mandatory fields.');
      return;
    }

    // Task 3.2: Store all input data to the database

    // Assuming you have an API endpoint to store data, make a POST request here.
    // Replace 'your_api_endpoint' with the actual API endpoint.
    console.log(formData);
    fetch('your_api_endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(savedData => {
        // Task 3.3: Refill the form using stored data
        setFormData(savedData); // Assuming the response contains the saved data
      })
      .catch(error => console.error('Error saving data:', error));
  };
  
  const renderOptions = (options, level = 0) => {
    return Object.keys(options).map(key => {
      const value = options[key];
      if (Array.isArray(value)) {
        return (
          <React.Fragment key={key}>
            <option value={key}>{indentation.repeat(level)}{key}</option>
            {value.map(item => (
              <option
                key={`${key}_${item}`}
                value={`${key}_${item}`}
                className={formData.selectedSectors.includes(`${key}_${item}`) ? 'bg-blue-500 text-white' : ''}
              >
                {indentation.repeat(level + 1)}{item}
              </option>
            ))}
          </React.Fragment>
        );
      } else if (typeof value === 'object') {
        return (
          <React.Fragment key={key}>
            <option value={key}>{indentation.repeat(level)}{key}</option>
            {renderOptions(value, level + 1)}
          </React.Fragment>
        );
      }
      return null;
    });
  };

  return (
    <div className='w-96 flex flex-col'>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleInputChange}
      />
      <label htmlFor="selection">Select Options:</label>
      <select
        className='p-10 h-96 w-96'
        id="selection"
        name="selectedSectors"
        multiple
        value={formData.selectedSectors}
        onChange={handleInputChange}
      >
        {data && renderOptions(data)}
      </select>
      <label>
        <input
          type="checkbox"
          name="agreeToTerms"
          checked={formData.agreeToTerms}
          onChange={handleInputChange}
        />
        Agree to terms
      </label>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default NestedSelectOptions;