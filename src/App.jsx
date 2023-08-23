import React, { useState, useEffect } from 'react';
import { Stitch, RemoteMongoClient, AnonymousCredential } from 'mongodb-stitch-browser-sdk';

const NestedSelectOptions = () => {
  const [data, setData] = useState(null);
  const [datas, setDatas] = useState(null);

  const indentation = '\u00A0\u00A0\u00A0\u00A0';


  useEffect(() => {
    const appId = 'application-1-bbwnq';
    const app = Stitch.initializeAppClient(appId);
    const db = app.getServiceClient(RemoteMongoClient.factory, 'application-1-bbwnq').db('codify');
    console.log(db);
  }, []);

  useEffect(() => {
    const collection = db.collection('itemList');
    collection.find({}, { limit: 10 }).asArray()
      .then(docs => {
        console.log('Fetched data:', docs);
        // Update state or do something with the fetched data
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const renderOptions = (options, level = 0) => {
    return Object.keys(options).map(key => {
      const value = options[key];
      if (Array.isArray(value)) {
        return (
          <React.Fragment key={key}>
            <option value={key}>{indentation.repeat(level)}{key}</option>
            {value.map(item => (
              <option key={`${key}_${item}`} value={`${key}_${item}`}>{indentation.repeat(level + 1)}{item}</option>
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
    <div className='w-screen flex'>
      <label htmlFor="selection">Select Options:</label>
      <select className='p-10 h-screen w-screen' id="selection" multiple>
        {data && renderOptions(data)}
      </select>
    </div>
  );
};

export default NestedSelectOptions;
