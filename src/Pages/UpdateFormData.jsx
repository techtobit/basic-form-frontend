import React, { useState, useEffect } from 'react';

const Form = () => {
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
        //Validate all input data
        if (!formData.name || formData.selectedSectors.length === 0 || !formData.agreeToTerms) {
            alert('Please fill in all mandatory fields.');
            return;
        }

        console.log(formData);
        //Store all input data to the database
        fetch('http://localhost:5000/saveData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        // .then(response => response.json())
        // .then(savedData => {
        //   //Refill the form using stored data
        //   setFormData(savedData); 
        // })
        // .catch(error => console.error('Error saving data:', error));
    };

    const renderOptions = (options, level = 0) => {
        return Object.keys(options).map(key => {
            if (key === '_id') {
                return null;
            }
            const value = options[key];
            const isCategory = !Array.isArray(value) && typeof value === 'object';
            const isSelected = formData.selectedSectors.includes(key);

            return (
                <React.Fragment className='' key={key}>
                    <option
                        value={key}
                        className={isSelected ? 'appearance-none bg-bgPrimary text-primary hover:bg-primary py-2 my-[1px] hover:text-white font-bold rounded-md' : ''}
                    >
                        {indentation.repeat(level)}{key}{isSelected ? `   ✓` : ''}
                    </option>
                    {isCategory && renderOptions(value, level + 1)}
                </React.Fragment>
            );
        });
    };

    return (
        <div className='w-screen grid justify-center items-center bg-white '>
            <form className='grid  justify-center items-center bg-lightWhite '>
                <label htmlFor='name'>Full Name <span className='text-red ' >*</span></label>
                <input
                    className='p-2 rounded-md border-2 border-primary focus:outline-none focus:ring focus:border-primary'
                    type="text"
                    name="name"
                    required
                    minLength={5}
                    maxLength={20}
                    placeholder="Jhone Alex"
                    value={formData.name}
                    onChange={handleInputChange}
                />
                <label htmlFor="selection" className='pt-5'>Select Options:<span className='text-red ' >*</span></label>
                <select
                    className='appearance-none p-2 h-80 w-96 rounded-md border-2 border-primary border-primary focus:outline-none focus:ring focus:border-primary'
                    id="selection"
                    name="selectedSectors"
                    multiple
                    value={formData.selectedSectors}
                    onChange={handleInputChange}
                >
                    {data && renderOptions(data)}
                </select>
                <label className='flex pt-4 pb-4'>
                    <input
                        className='text-primary'
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleInputChange}
                    />
                    <p className='pl-2 flex'>Agree to terms <span className='text-red ' >*</span></p>
                </label>
                <button className='py-3 rounded-md border-2  bg-primary text-white font-bold hover:bg-hover' onClick={handleSave}>Update</button>
            </form>
        </div>
    );
};

export default Form;
