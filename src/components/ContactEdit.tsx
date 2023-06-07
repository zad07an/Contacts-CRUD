import React, {
  useId,
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  FormEvent,
} from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks/hooks";
import { updateContact } from "../redux/features/contactSlice";

interface ContactEditProps {
  id?: string;
  name?: string;
  email?: string;
}

interface InitialStateProps {
  name: string;
  email: string;
}

const ContactEdit: React.FC<ContactEditProps> = ({
  id: contactId,
  name,
  email,
}) => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null!);
  const [inputValue, setInputValue] = useState<InitialStateProps>({
    name: name ? name : "",
    email: email ? email : "",
  });

  useEffect(() => inputRef.current.focus(), []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdateContact = (e: FormEvent) => {
    e.preventDefault();
    const { name, email } = inputValue;
    if (name.trim().length >= 3 && email.trim()) {
      dispatch(updateContact({ id: contactId ? contactId : "", name, email }));
      navigate("/");
    }
  };

  return (
    <form
      className=" w-full md:w-1/2 flex items-start flex-col gap-3 py-4"
      onSubmit={handleUpdateContact}
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
          value={inputValue.email}
          name="email"
          className=" w-full h-10 px-4 rounded-md outline-none border-2 border-gray-300 focus:border-red-500 transition-all"
          onChange={handleChange}
        />
      </div>
      <div className=" mt-2">
        <button className=" px-6 py-1 rounded-sm bg-green-500 text-white">
          Update
        </button>
      </div>
    </form>
  );
};

export default ContactEdit;
