import React from "react";
import { useFormik } from "formik";

const LatihanFormik = () => {
  const formik = useFormik({
    initialValues: {
      nama: "",
      alamat: "",
    },
    onSubmit: () => {
      console.log("run");
    },
  });

  return (
    <div>
      <h1>Latihan Formik</h1>
      <div className="flex flex-col gap-2 w-1/2">
        <input className="border-2 border-black" placeholder="Masukkan nama" />
        <input
          className="border-2 border-black"
          placeholder="Masukkan alamat"
        />
      </div>
    </div>
  );
};

export default LatihanFormik;
