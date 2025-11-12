import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Signup() {
  const navigate = useNavigate();
  const [serverMsg, setServerMsg] = useState("");

  // ✅ Yup schema for validation
  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too short!")
      .max(30, "Too long!")
      .required("First name is required"),
    lastName: Yup.string()
      .min(2, "Too short!")
      .max(30, "Too long!")
      .required("Last name is required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "At least 6 characters")
      .required("Password is required"),
  });

  // ✅ form submit handler
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setServerMsg("");

    try {
      const res = await fetch("http://localhost:8081/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Signup failed");
      }

      setServerMsg("✅ Signup successful! Redirecting to login...");
      resetForm();
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setServerMsg("❌ " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Create an Account</h1>

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form style={styles.form}>
            <label style={styles.label}>First Name</label>
            <Field name="firstName" type="text" style={styles.input} />
            <ErrorMessage name="firstName" component="div" style={styles.error} />

            <label style={styles.label}>Last Name</label>
            <Field name="lastName" type="text" style={styles.input} />
            <ErrorMessage name="lastName" component="div" style={styles.error} />

            <label style={styles.label}>Email</label>
            <Field name="email" type="email" style={styles.input} />
            <ErrorMessage name="email" component="div" style={styles.error} />

            <label style={styles.label}>Password</label>
            <Field name="password" type="password" style={styles.input} />
            <ErrorMessage name="password" component="div" style={styles.error} />

            <button type="submit" style={styles.button} disabled={isSubmitting}>
              {isSubmitting ? "Signing up..." : "Sign Up"}
            </button>
          </Form>
        )}
      </Formik>

      {serverMsg && (
        <p
          style={{
            marginTop: "1rem",
            color: serverMsg.startsWith("✅") ? "green" : "red",
          }}
        >
          {serverMsg}
        </p>
      )}

      <p style={styles.loginText}>
        Already have an account?{" "}
        <span
          style={{ color: "#007BFF", cursor: "pointer" }}
          onClick={() => navigate("/login")}
        >
          Log In
        </span>
      </p>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    fontFamily: "sans-serif",
  },
  title: {
    marginBottom: "1rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "320px",
    gap: "0.75rem",
  },
  label: {
    fontWeight: "bold",
    fontSize: "0.9rem",
  },
  input: {
    padding: "0.6rem 0.8rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    padding: "0.7rem",
    borderRadius: "5px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "0.85rem",
  },
  loginText: {
    marginTop: "1rem",
  },
};
