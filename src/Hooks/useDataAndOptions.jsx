import { useState, useEffect } from 'react';

const useDataAndOptions = (fetchedData, customRenderOptions) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        if (fetchedData) {
            setData(fetchedData[0]);
            console.log(fetchedData);
        }
    }, [fetchedData]);

    return { data, renderOptions: customRenderOptions };
};

export default useDataAndOptions;
