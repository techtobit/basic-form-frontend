import React, { useEffect, useState } from 'react'
import { useGet } from '../Hooks/useApiFetching';


const SaveFormData = () => {
    const[saveFormData, setSaveFormData] = useState(null);
    const{data:getSaveFromData} = useGet('/saveData');
    
    useEffect( ()=> {
      if(getSaveFromData)
      {
        setSaveFormData(getSaveFromData[0]);
      }
    }, [getSaveFromData]);

    

  return (
    <div>
      <form>
      <label htmlFor='name'>Full Name <span className='text-red ' >*</span></label>
                <input
                    className='p-2 rounded-md border-2 border-primary focus:outline-none focus:ring focus:border-primary'
                    type="text"
                    name="name"
                    required
                    minLength={5}
                    maxLength={20}
                    placeholder="Jhone Alex"
                    value={saveFormData?.name}
                    // onChange={handleInputChange}
                />
      </form>
    </div>
  )
}

export default SaveFormData;

