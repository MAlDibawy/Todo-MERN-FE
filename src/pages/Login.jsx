import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import LoadingScreen from "./../components/LoadingScreen/LoadingScreen";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const validateSchema = Yup.object().shape({
    email: Yup.string()
      .email("please enter a valid email.")
      .required("please enter your e-mail"),
    password: Yup.string()
      .required("please enter your password")
      .min(8, "password is too short - should be at least 8 characters"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: submitLogin,
    validationSchema: validateSchema,
  });

  async function submitLogin(userData) {
    dispatch(login(userData));
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
        <h2>Log in</h2>
        <form onSubmit={formik.handleSubmit}>
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

          <button className="btn btn-outline-info" type="submit">
            Log in
          </button>
        </form>
      </div>
    </>
  );
}
