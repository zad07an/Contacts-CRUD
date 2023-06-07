import React from "react";
import { Link } from "react-router-dom";
import ContactAdd from "../components/ContactAdd";

const Create: React.FC = () => {
  return (
    <section className=" w-full flex items-center flex-col md:p-0 px-10">
      <div className=" w-full md:w-1/2 py-4 flex items-center justify-between border-b border-gray-300">
        <div>
          <p className=" text-xl font-medium">Add Contact</p>
        </div>
        <div>
          <Link
            to="/"
            className=" px-6 py-1.5 text-white rounded-md bg-red-500"
          >
            Cancel
          </Link>
        </div>
      </div>
      <ContactAdd />
    </section>
  );
};

export default Create;
