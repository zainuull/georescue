import Image from 'next/image';
import React from 'react';

const MapAccordion = ({ mapSources, activeKey, setActiveKey }) => {
  const handleSelectChange = (key) => {
    setActiveKey(key);
  };

  return (
    <div className="text-start p-2 bg-black bg-opacity-50 min-h-[450px] max-h-[400px] overflow-y-auto z-10">
      {Object.keys(mapSources).map((key) => {
        const source = mapSources[key];
        return (
          <div
            key={key}
            className="flex flex-col border-b border-white mb-2 cursor-pointer"
            onClick={() => handleSelectChange(key)}>
            <Image src={source.foto} alt={key} layout="responsive" objectFit="cover" />
            <div className="flex items-center gap-2">
              <input type="radio" id={key} name="mapLayer" checked={activeKey === key} readOnly />
              <label className="mt-2 capitalize" htmlFor={key}>
                {source.name}
              </label>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MapAccordion;
