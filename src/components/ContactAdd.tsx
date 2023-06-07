import React, {
  useId,
  useState,
  ChangeEvent,
  FormEvent,
  useRef,
  useEffect,
} from "react";
import { v4 as uuid } from "uuid";
import { useAppDispatch } from "../redux/hooks/hooks";
import { createContact } from "../redux/features/contactsSlice";
import { useNavigate } from "react-router-dom";

interface InitialStateProps {
  name: string;
  email: string;
}

const initialState = {
  name: "",
  email: "",
};

const ContactAdd: React.FC = () => {
  const id = useId();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null!);
  const [inputValue, setInputValue] = useState<InitialStateProps>(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => inputRef.current.focus(), []);

  const handleAddContact = (e: FormEvent) => {
    e.preventDefault();
    const { name, email } = inputValue;
    if (name.trim().length >= 3 && email.trim()) {
      dispatch(createContact({ id: uuid(), name, email }));
      setInputValue(initialState);
      navigate("/");
    }
  };

  return (
    <form
      className=" w-full md:w-1/2 flex items-start flex-col gap-3 py-4"
      onSubmit={handleAddContact}
    >
      <div className=" w-full flex items-start flex-col gap-1">
        <label htmlFor={`${id}name`}>Name:</label>
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter name"
          id={`${id}name`}
          name="name"
          value={inputValue.name}
          className=" w-full h-10 px-4 rounded-md outline-none border-2 border-gray-300 focus:border-red-500 transition-all"
          onChange={handleChange}
        />
      </div>
      <div className=" w-full flex items-start flex-col gap-1">
        <label htmlFor={`${id}email`}>Email:</label>
        <input
          type="email"
          placeholder="Enter email"
          id={`${id}email`}
          name="email"
          value={inputValue.email}
          className=" w-full h-10 px-4 rounded-md outline-none border-2 border-gray-300 focus:border-red-500 transition-all"
          onChange={handleChange}
        />
      </div>
      <div className=" mt-2 flex items-center gap-4">
        <button className=" px-6 py-1 rounded-sm bg-blue-500 text-white">
          Add
        </button>
      </div>
    </form>
  );
};

export default ContactAdd;
