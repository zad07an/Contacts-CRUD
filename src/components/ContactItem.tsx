import React from "react";
import { Link } from "react-router-dom";
import { EditIcon, RemoveIcon } from "../icons/Icons";
import { useAppDispatch } from "../redux/hooks/hooks";
import { removeContact } from "../redux/features/contactsSlice";

interface ContactItemProps {
  id: string;
  name: string;
  email: string;
}

const ContactItem: React.FC<ContactItemProps> = ({ id, name, email }) => {
  const dispatch = useAppDispatch();

  const handleRemoveContact = (newId: string) => {
    dispatch(removeContact(newId));
  };

  return (
    <div className=" w-full flex items-center justify-between py-3 border-b border-gray-300">
      <div className=" flex items-center gap-4">
        <div className=" w-12 h-12 rounded-full overflow-hidden">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt=""
          />
        </div>
        <div className=" flex items-start flex-col">
          <div>
            <p>{name}</p>
          </div>
          <div className=" text-blue-500 text-xs">
            <p>{email}</p>
          </div>
        </div>
      </div>
      <div className=" flex items-center justify-center gap-6">
        <Link to={`/edit/${id}`} className=" text-blue-500 text-xl">
          <EditIcon />
        </Link>
        <button
          className=" text-red-500 text-xl"
          onClick={() => handleRemoveContact(id)}
        >
          <RemoveIcon />
        </button>
      </div>
    </div>
  );
};

export default ContactItem;
