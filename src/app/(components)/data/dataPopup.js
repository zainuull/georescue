import React from 'react';

const generateDynamicTable = (result, fields) => {
  if (!result)
    return '<div style="font-family: Arial, sans-serif; color: #888; text-align: center;">Tidak ada data</div>';

  let rows = fields.map((field, index) => {
    const backgroundColor = index % 2 === 0 ? '#f9f9f9' : '#ffffff';
    const isImage = field.key === 'imageUrl'; // Cek jika key adalah imageUrl

    // Konten untuk kolom kedua
    const content = isImage
      ? `<div style="width: 100%; height: 200px; overflow: hidden;">
           <img src="${result[field.key]}" alt="${
          field.label
        }" style="width: 100%; height: 100%; object-fit: cover;"/>
         </div>`
      : result[field.key] || '<span style="color: #aaa;">N/A</span>';

    return `
      <tr style="background-color: ${backgroundColor}; transition: background-color 0.3s ease;">
        <td style="
          padding: 5px; 
          border-bottom: 1px solid #ddd; 
          font-weight: bold;
          color: #333;
          width: 30%;
          font-family: Arial, sans-serif;
        ">
          ${field.label}
        </td>
        <td style="
          padding: 5px; 
          border-bottom: 1px solid #ddd; 
          font-family: Arial, sans-serif; 
          color: #555;
        ">
          ${content}
        </td>
      </tr>
    `;
  });

  return `
    <div style="
      border: 1px solid #e0e0e0; 
      border-radius: 8px; 
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
      overflow-y: auto;
      max-width: 300px; /* Table max width */
      max-height:150px;
      font-family: Arial, sans-serif;
      background-color: #fff;
    ">
      <table style="border-collapse: collapse; width: 100%; text-align: left;">
        ${rows.join('')}
      </table>
    </div>
  `;
};

const formatCurrency = (amount) => {
  return `${Number(amount || 0).toLocaleString('id-ID', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  })}`;
};

export const dataPopup = {
  // ADMINISTRASI WILAYAH
  Provinsi_Indonesia: (result) =>
    generateDynamicTable(result, [
      // { label: "Waktu", key: "created_at" },
      { label: "Nama", key: "nama" },
      { label: "Latitude", key: "latitude" },
      { label: "Longitude", key: "longitude" },
      { label: "Gambar", key: "imageUrl" },
    ]),
};
