import React, { useEffect } from "react";
import { Link, useParams, Params } from "react-router-dom";
import ContactEdit from "../components/ContactEdit";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { fetchContact } from "../redux/features/contactSlice";
import Loading from "../components/ui/Loading";

const Edit: React.FC = () => {
  const { id }: Readonly<Params<string>> = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { contact, fetchLoading } = useAppSelector((state) => state.contact);

  useEffect(() => {
    dispatch(fetchContact(String(id)));
  }, [dispatch, id]);

  return (
    <section className=" w-full flex items-center flex-col md:p-0 px-10">
      <div className=" w-full md:w-1/2 py-4 flex items-center justify-between border-b border-gray-300">
        <div>
          <p className=" text-xl font-medium">Edit Contact</p>
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
      {fetchLoading ? <Loading /> : <ContactEdit {...contact} />}
    </section>
  );
};

export default Edit;
