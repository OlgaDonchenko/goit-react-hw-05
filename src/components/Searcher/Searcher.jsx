import { Formik, Form, Field } from "formik";
import { IoIosSearch } from "react-icons/io";
import { toast } from "react-hot-toast";
import css from "./Searcher.module.css";

export default function SearchBar({ onSubmit }) {
  const handleSubmit = (values, actions) => {
    const formattedSearch = values.search.trim().toLowerCase();
    if (!formattedSearch) {
      toast.error("Must be filled!");
      return;
    }
    onSubmit(formattedSearch);
    actions.resetForm();
  };

  return (
    <header className={css.box}>
      <Formik initialValues={{ search: "" }} onSubmit={handleSubmit}>
        <Form className={css.form}>
          <Field
            type="text"
            name="search"
            autoComplete="off"
            autoFocus
            placeholder="Search movie"
          />
          <button className={css.btn} type="submit">
            <IoIosSearch />
          </button>
        </Form>
      </Formik>
    </header>
  );
}
