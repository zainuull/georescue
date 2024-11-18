'use client';
import { GoUpload } from 'react-icons/go';
import Image from 'next/image';
import { CldUploadButton, CloudinaryUploadWidgetResults } from 'next-cloudinary';
import React, { useState } from 'react';
import { NotifyService } from '@/core/services/notify/notifyService';

export const UploadImage = ({ setDataInput, dataInput }) => {
  const [publicId, setPublicId] = useState('');
  const notifyService = new NotifyService();

  const handleUploadImage = (res) => {
    console.log('Cloudinary upload response:', res);

    const info = res.info;

    if ('secure_url' in info && 'public_id' in info) {
      const url = info.secure_url;
      const public_id = info.public_id;
      console.log('public_id', public_id);

      setDataInput({ ...dataInput, public_id: public_id, imageUrl: url });
      setPublicId(public_id);
    }
  };

  const handleDeleteImage = async (e) => {
    e.preventDefault();
    notifyService.confirmationDelete().then(async (res) => {
      if (res) {
        try {
          const res = await fetch(`/api/delete-image`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ publicId }),
          });
          if (res.ok) {
            setDataInput({ ...dataInput, public_id: '', imageUrl: '' });
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <>
      <CldUploadButton
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        onSuccess={handleUploadImage}
        onError={(error) => console.log('Upload Error:', error)}
        className={`relative w-full h-28 bg-slate-100 flex items-center justify-center ${
          dataInput?.imageUrl && 'pointer-events-none'
        }`}>
        {dataInput.imageUrl ? (
          <Image
            src={dataInput?.imageUrl || ''}
            alt={dataInput?.public_id || ''}
            width={300}
            height={300}
            className="absolute w-full h-28 object-cover inset-0"
          />
        ) : (
          <div className="bg-gray-100 rounded-lg absolute w-full h-28 object-cover inset-0 flex items-center justify-center">
            <GoUpload size={25} className="w-[20px] h-[20px] xl:w-[25px] xl:h-[25px]" />
          </div>
        )}
      </CldUploadButton>
      {dataInput?.imageUrl && (
        <button
          onClick={handleDeleteImage}
          className="bg-red-600 text-white p-1 xl:py-2 text-sm rounded-lg w-1/2 xl:w-[150px] hover:bg-red-700 transition-all">
          Delete Image
        </button>
      )}
    </>
  );
};
