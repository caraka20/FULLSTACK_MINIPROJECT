import React from "react";

const Filter = () => {
  return (
    <div className="mt-10">
      <select className="select select-bordered">
        <option disabled selected>
          Pilih Kota
        </option>
        <option>Jakarta</option>
        <option>Bogor</option>
        <option>Tangerang</option>
        <option>Bekasi</option>
      </select>
    </div>
  );
};

export default Filter;
