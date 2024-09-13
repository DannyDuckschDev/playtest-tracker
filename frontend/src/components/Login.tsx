import React from "react";
import { useTranslation } from 'react-i18next'; // For translations
import { useFormik } from 'formik'; // For form handling with Formik
import * as Yup from 'yup'; // For form validation with Yup
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/login.css';
import { useLogin } from "../hooks/useLogin";
import { usePasswordToggle } from "../hooks/usePasswordToggle";
import { Spinner } from "react-bootstrap";

// Import FontAwesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login: React.FC = () => {
    const { t } = useTranslation(); // Hook for translations

    const { login, error } = useLogin(); // Custom hook for login logic
    const [passwordType, togglePasswordVisibility] = usePasswordToggle(); // Custom hook for password visibility toggle

    // Formik setup for form handling and validation
    const formik = useFormik({
        initialValues: {
            email: '', // Initial value for email
            password: '', // Initial value for password
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email(t('loginValidation.emailInvalid')) // Translated validation message for invalid email
                .required(t('loginValidation.emailRequired')), // Email is required
            password: Yup.string()
                .min(8, t('loginValidation.passwordMin')) // Password should be at least 8 characters
                .required(t('loginValidation.passwordRequired')), // Password is required
        }),
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true); // Start submission process
            try {
                await login(values.email, values.password); // Handle login logic
            } catch (error) {
                console.error("Login failed", error);
            } finally {
                setSubmitting(false); // Stop submission process
            }
        },
    });

    return (
        <div className="login-container">
            <form onSubmit={formik.handleSubmit}>
                <h2>{t('login.title')}</h2>

                {formik.isSubmitting && error && <p className="error">{error}</p>} {/* Display error on form submission */}

                {/* Email field */}
                <div>
                    <label htmlFor="email" className="form-label">{t('login.email')}</label>
                    <input 
                        type="email"
                        id="login-email"
                        className="form-control"
                        {...formik.getFieldProps('email')} // Use Formik props for input handling
                        disabled={formik.isSubmitting} // Disable field when submitting
                        autoComplete="email"
                    />
                    {formik.touched.email && formik.errors.email && (
                        <p className="error">{formik.errors.email}</p> // Display validation error for email
                    )}
                </div>

                {/* Password field */}
                <div>
                    <label htmlFor="password" className="form-label">{t('login.password')}</label>
                    <div className="password-input-container">
                        <input 
                            type={passwordType} 
                            id="login-password"
                            className="form-control"
                            {...formik.getFieldProps('password')} // Use Formik props for input handling
                            disabled={formik.isSubmitting} // Disable field when submitting
                            autoComplete="current-password"  // Fix autocomplete warning
                        />
                        <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                            <FontAwesomeIcon icon={passwordType === "password" ? faEyeSlash : faEye} />
                        </span>
                    </div>
                    {formik.touched.password && formik.errors.password && (
                        <p className="error">{formik.errors.password}</p> // Display validation error for password
                    )}
                </div>

                {/* Submit button */}
                <button type="submit" className="btn btn-primary">
                    {formik.isSubmitting ? <Spinner animation="border" size="sm" /> : t('login.submit')}
                </button>
            </form>
        </div>
    );
};

export default Login;
