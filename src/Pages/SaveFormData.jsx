import React, { useEffect, useState } from 'react'
import { useGet } from '../Hooks/useApiFetching';


const SaveFormData = () => {
  const [saveFormData, setSaveFormData] = useState(null);
  const { data: getSaveFromData } = useGet('/saveData');

  useEffect(() => {
    if (getSaveFromData) {
      setSaveFormData(getSaveFromData[0]);
    }
  }, [getSaveFromData]);



  return (
    <div className='w-screen  grid justify-center items-center bg-lightWhite '>
      <form className='lg:w-[850px] h-[416px] py-16 pl-20 grid  justify-start items-center bg-white rounded-md border-x-[1px] border-b-[1px] border-borderColor shadow-xl shadow-blue-500/20'>
        <label htmlFor='name'>Full Name</label>
        <input
          className='p-2 rounded-md border-2 border-primary bg-disable '
          type="text"
          name="name"
          required
          minLength={5}
          maxLength={20}
          placeholder="Jhone Alex"
          disabled
          value={saveFormData?.name}
        />
        <label htmlFor="selection" className='pt-5'>Selected Option</label>
        <input
          className='p-2 rounded-md border-2 border-primary  bg-disable '
          type="text"
          name="name"
          required
          minLength={5}
          maxLength={20}
          placeholder="No option avaliable"
          disabled
          value={saveFormData?.selectedSectors}
        />
        <label htmlFor="selection" className='pt-5'>Terms & Conditions</label>
        <input
          className='p-2 rounded-md border-2 border-primary bg-disable  '
          type="text"
          name="name"
          required
          minLength={5}
          maxLength={20}
          placeholder="No option avaliable"
          disabled
          value={saveFormData?.agreeToTerms == true ? "Agree  ✅" : "Disagree"}
        />
      </form>
    </div>
  )
}

export default SaveFormData;

