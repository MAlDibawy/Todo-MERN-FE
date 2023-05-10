import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { reset, register } from "../features/auth/authSlice";
import LoadingScreen from "./../components/LoadingScreen/LoadingScreen";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const validateSchema = Yup.object().shape({
    name: Yup.string().min(3).required("please enter your name."),
    email: Yup.string()
      .email("please enter a valid email.")
      .required("please enter your e-mail"),
    password: Yup.string()
      .required("please enter your password")
      .min(8, "password is too short - should be at least 8 characters"),
    confirmPassword: Yup.string()
      .required("please confirm your password")
      .oneOf([Yup.ref("password")], "passwords does not match"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: submitRegister,
    validationSchema: validateSchema,
  });

  async function submitRegister(userData) {
    dispatch(register(userData));
  }

  useEffect(() => {
    if (isError) {
      toast.error(message);
    } else if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="w-75 mx-auto">
        <h2>Register Now</h2>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            name="name"
            id="name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-control my-2"
            placeholder="Name"
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="alert alert-danger text-center">
              {formik.errors.name}
            </div>
          ) : (
            ""
          )}
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            type="text"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-control my-2"
            placeholder="Email"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="alert alert-danger text-center">
              {formik.errors.email}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-control my-2"
            placeholder="Password"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="alert alert-danger text-center">
              {formik.errors.password}
            </div>
          ) : (
            ""
          )}
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            name="confirmPassword"
            id="confirmPassword"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-control my-2"
            placeholder="Confirm password"
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="alert alert-danger text-center">
              {formik.errors.confirmPassword}
            </div>
          ) : (
            ""
          )}
          <button className="btn btn-outline-info" type="submit">
            Register
          </button>
        </form>
      </div>
    </>
  );
}
