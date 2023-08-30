import React, { useState, useEffect } from 'react';
import { useGet, usePost, usePut } from '../Hooks/useApiFetching';
import { toast } from 'react-hot-toast';
import axios from 'axios';


const Form = () => {
    const [data, setData] = useState(null);
    const [existingDocument, setExistingDocument] = useState(null);
    const { data: fetchedData, loading, error } = useGet('/data');
    const { data: submitData } = useGet('/saveData');
    const { postLoading, pstError, makePutRequest } = usePut();
    const { makePostRequest } = usePost();

    const [formData, setFormData] = useState({
        name: '',
        selectedSectors: [],
        agreeToTerms: false,
    });

    const indentation = '\u00A0\u00A0\u00A0\u00A0';

    useEffect(() => {
        // Fetch the JSON data
        if (fetchedData) {
            setData(fetchedData[0]);
            console.log(fetchedData);
        }
    }, [fetchedData]);

    useEffect(() => {
        // Fetch the JSON data
        if (submitData) {
            setExistingDocument(submitData[0]);
        }
    }, [submitData]);


    const handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSave = async () => {
        try {
            // Validate all input data
            if (!formData.name || formData.selectedSectors.length === 0 || !formData.agreeToTerms) {
                alert('Please fill in all mandatory fields.');
                return;
            }

            if (existingDocument) {
                // Update exiting data
                existingDocument.name = formData.name;
                existingDocument.selectedSectors = formData.selectedSectors;
                existingDocument.agreeToTerms = formData.agreeToTerms;

                const updateUrl = `https://basicformbackend.onrender.com/saveData/${existingDocument?._id}`;
                // await makePutRequest(updateUrl, formData);
                axios.put(updateUrl, formData)
                    .then(response => {
                        console.log(response);
                    })
                toast.success('Successfully Updated!');
            }
            else {
                //Add data in Empty DB
                makePostRequest('/saveData', formData);
                toast.success('Successfully Saved!')

            }
        } catch (error) {
            toast.error("Faild to save")
        }
    }

    const renderOptions = (options, level = 0) => {
        return Object.keys(options).map(key => {
            if (key === '_id') {
                return null;
            }
            const value = options[key];
            const isCategory = !Array.isArray(value) && typeof value === 'object';
            const isSelected = formData.selectedSectors.includes(key);

            return (
                <React.Fragment key={key}>
                    <option
                        value={key}
                        className={isSelected ? 'appearance-none bg-bgPrimary text-primary hover:bg-primary lg:py-2 md:py-2 py-[1px]  my-[1px] hover:text-white lg:font-bold md:font-bold font-normal lg:text-sm md:text-md text-sm rounded-md' : ''}
                    >
                        {indentation.repeat(level)}{key}{isSelected ? `   ✓` : ''}
                    </option>
                    {isCategory && renderOptions(value, level + 1)}
                </React.Fragment>
            );
        });
    };

    return (
        <div className='w-screen grid justify-center items-center bg-lightWhite '>
            <form className='lg:w-[850px] md:w[750px] h-[418px] lg:pl-20 px-[2.8rem] md:px-[8.2rem]  pt-4 pb-6 grid  justify-start items-center bg-white  bg-white border-x-[1px] border-b-[1px] border-borderColor shadow-xl shadow-blue-500/20 '>
                <label htmlFor='name'>Full Name <span className='text-red ' >*</span></label>
                <input
                    className='p-2 px-[1px] lg:w-96 md:w-96 w-[18rem]  text-sm rounded-md border-2 border-primary focus:outline-none focus:ring focus:border-primary'
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
                    className='appearance-none lg:w-96 md:w-96 w-[18rem] p-2 h-40 rounded-md border-2 border-primary border-primary focus:outline-none focus:ring focus:border-primary'
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
                <button className='py-3 lg:w-96 md:w-96  w-[18rem] rounded-md border-2  bg-primary text-white font-bold hover:bg-hover' onClick={handleSave}>Submit</button>
            </form>
        </div>
    );
};

export default Form;
