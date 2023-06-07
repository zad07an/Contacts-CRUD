import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { fetchContacts } from "../redux/features/contactsSlice";
import { Link } from "react-router-dom";
import ContactItem from "../components/ContactItem";
import Loading from "../components/ui/Loading";

const Contacts: React.FC = () => {
  const dispatch = useAppDispatch();
  const { contacts, fetchLoading } = useAppSelector((state) => state.contacts);
  const { updateLoading } = useAppSelector((state) => state.contact);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch, updateLoading]);

  return (
    <section className=" w-full flex items-center flex-col md:p-0 px-10">
      <div className=" w-full md:w-1/2 py-4 flex items-center justify-between border-b border-gray-300">
        <div>
          <p className=" text-xl font-medium">Contact List</p>
        </div>
        <div>
          <Link
            to="/create"
            className=" px-6 py-1.5 text-white rounded-md bg-blue-500"
          >
            Add Contact
          </Link>
        </div>
      </div>
      <div className=" w-full md:w-1/2 flex items-center flex-col">
        {fetchLoading ? (
          <Loading />
        ) : (
          contacts?.map((contact) => {
            return <ContactItem key={contact.id} {...contact} />;
          })
        )}
      </div>
    </section>
  );
};

export default Contacts;
