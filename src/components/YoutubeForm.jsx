import React, { useState } from "react";
// import { useFormik } from "formik";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField,
} from "formik";
import * as Yup from "yup";
import TextError from "./TextError";
const initialValues = {
  name: "Guru ",
  email: "",
  channel: "",
  comments: "",
  address: "",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumbers: ["", ""],
  phNumbers: [""],
};
const savedValues = {
  name: "Guru ",
  email: "guru@gmail.com",
  channel: "GuruReyo",
  comments: "Gureyo is good",
  address: "skdjfds",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumbers: ["", ""],
  phNumbers: [""],
};
const onSubmit = (values ,onSubmitProps) => {
  console.log("Form Data", values);
  console.log(onSubmitProps)
  onSubmitProps.setSubmitting(false);
  onSubmitProps.resetForm();
};
// const validate = (values) => {
//   //values.name,values.email,values.channel
//   //errors.name,errors.email,errors.channel
//   let errors = {};
//   if (!values.name) {
//     errors.name = "Required";
//   }
//   if (!values.email) {
//     errors.email = "Required";
//   } else if (!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = "Invalid email format";
//   }
//   if (!values.channel) {
//     errors.channel = "Required";
//   }
//   return errors;
// };
const validationSchema = Yup.object({
  name: Yup.string().required("Required!"),
  email: Yup.string().email("Inavalid Email Format").required("Required!"),
  channel: Yup.string().required("Required!"),
  comments: Yup.string()
    .required("Required"),

  // phoneNumbers:Yup.number().required("Required"),
  address: Yup.string()
    .required("Required"),
});
const validateComments = (value) => {
  let error;
  if (!value) {
    error = "Required";
  }
  return error;
};
function YoutubeForm() {
  // const formik = useFormik({
  //   initialValues,
  //   onSubmit,
  //   // validate,
  //   validationSchema
  // });
  //   console.log("Form Values", formik.values);
  // console.log('Form Errors',formik.errors)
  // console.log("Visited fields", formik.touched);
  const [formValues,setFormValues]=useState(null);
  return (
    <Formik
      initialValues={formValues ||initialValues }
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
      // validateOnChange={false}
      // validateOnBlur={false}
      // validateOnMount
    >
      {(formik) => {
        console.log("Formik props", formik);
        return (
          <Form>
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <Field type="text" name="name" id="name" />
              <ErrorMessage name="name" component={TextError} />
            </div>
            <div className="form-control">
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" id="email" />
              <ErrorMessage name="email" component={TextError} />
            </div>
            <div className="form-control">
              <label htmlFor="channel">Channel</label>
              <Field 
                type="text" 
                name="channel" 
                id="channel" 
                placeholder="Youtube Channel Name"
              />
              {/* <ErrorMessage name="channel">
                {(errorMsg) => <div className="error">{errorMsg}</div>}
              </ErrorMessage> */}
              <ErrorMessage name="channel" component={TextError} />
            </div>
            <div className="form-control">
              <label htmlFor="comments">Comments</label>
              <Field
                as="textarea"
                id="comments"
                name="comments"
                validate={validateComments}
              />
              <ErrorMessage name="comments" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="address">Addresss for Communication</label>
              <FastField name="address">
                {(props) => {
                  // console.log("Address Render")
                  const { field, form, meta } = props;
                  // console.log("Render Props:",props);
                  return (
                    <div>
                      <input type="text" id="address" {...field} />
                      {meta.touched && meta.error ? (
                        <div className="error">{meta.error}</div>
                      ) : null}
                    </div>
                  );
                }}
              </FastField>
            </div>

            <div className="form-control">
              <label htmlFor="twitter">Twitter</label>
              <Field type="text" id="twitter" name="social.twitter" />
            </div>
            <div className="form-control">
              <label htmlFor="twitter">FaceBook</label>
              <Field type="text" id="facebook" name="social.facebook" />
            </div>
            <div className="form-control">
              <label htmlFor="primaryPhn">Primary Phone</label>
              <Field type="text" id="primaryPhn" name="phoneNumbers[0]" />
            </div>
            <div className="form-control">
              <label htmlFor="secondaryPhn">Secondary Phone</label>
              <Field type="text" id="secondaryPhn" name="phoneNumbers[1]" />
            </div>

            <div className="form-control">
              <label htmlFor="">List of Phone Numbers</label>
              <FieldArray name="phNumbers">
                {(fieldArrayProps) => {
                  const { push, remove, form } = fieldArrayProps;
                  const { values } = form;
                  const { phNumbers } = values;
                  // console.log("Form Errors", form.errors);
                  // console.log("Field Arrya",fieldArrayProps);
                  return (
                    <div>
                      {phNumbers.map((phNumber, index) => (
                        <div key={index}>
                          <Field name={`phNumbers[${index}]`} />

                          {index > 0 && (
                            <button
                              type="button"
                              onClick={() => {
                                remove(index);
                              }}
                            >
                              -
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              push("");
                            }}
                          >
                            {"  "} + {"  "}
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                }}
              </FieldArray>
            </div>
            {/* <button
              type="submit"
              onClick={() => formik.validateField("comments")}
            >
              validateComments
            </button>
            <button type="submit" onClick={() => formik.validateForm()}>
              validateAll
            </button>
            <button type="button" onClick={()=>formik.setFieldTouched('comments')}>Visit Commennts</button>
            <button type="button" onClick={()=>formik.setTouched({
              name:true,
              email:true,
              channel:true,
              comments:true
            })}>Visit Fields</button> */}
            <button type='button' onClick={()=>setFormValues(savedValues)}>Load Saved Data</button>
            {/* <button type="submit" disabled={!(formik.dirty &&  formik.isValid)}>Submit</button> */}
            <button type="submit" disabled={!(formik.isValid || formik.isSubmitting )}>Submit</button>
            <button type="reset" onClick={formik.handleReset}>Reset</button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default YoutubeForm;
