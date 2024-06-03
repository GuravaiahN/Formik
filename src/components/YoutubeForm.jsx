import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
const initialValues = {
  name: "",
  email: "",
  channel: "",
};
const onSubmit = (values) => {
  console.log("Form Data", values);
};
const validate = (values) => {
  //values.name,values.email,values.channel
  //errors.name,errors.email,errors.channel
  let errors = {};
  if (!values.name) {
    errors.name = "Required";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email format";
  }
  if (!values.channel) {
    errors.channel = "Required";
  }
  return errors;
};
const validationSchema = Yup.object({
  name: Yup.string().required("Required!"),
  email: Yup.string().email("Inavalid Email Format").required("Required!"),
  channel: Yup.string().required("Required!"),
});
function YoutubeForm() {
  const formik = useFormik({
    initialValues,
    onSubmit,
    // validate,
    validationSchema
  });
  //   console.log("Form Values", formik.values);
  // console.log('Form Errors',formik.errors)
  console.log("Visited fields", formik.touched);
  return (
    <div className="form-control">
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            {...formik.getFieldProps('name')}
          />
          {formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            name="channel"
            id="channel"
            {...formik.getFieldProps('channel')}
          />
          {formik.touched.channel && formik.errors.channel ? (
            <div className="error">{formik.errors.channel}</div>
          ) : null}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default YoutubeForm;
