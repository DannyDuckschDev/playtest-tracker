import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { usePasswordToggle } from '../hooks/usePasswordToggle';
import { Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../styles/register.css';

const Register: React.FC = () => {
  const { t } = useTranslation();
  const [isPasswordFocused, setIsPasswordFocused] = useState(false); // Track focus on password field
  const [passwordType, togglePasswordVisibility] = usePasswordToggle();
  const [confirmPasswordType, toggleConfirmedPasswordVisibility] = usePasswordToggle();

  // Password complexity criteria
  const passwordCriteria = [
    { rule: t('registerValidation.passwordMin'), test: (password: string) => password.length >= 8 },
    { rule: t('registerValidation.passwordUpperCase'), test: (password: string) => /[A-Z]/.test(password) },
    { rule: t('registerValidation.passwordLowerCase'), test: (password: string) => /[a-z]/.test(password) },
    { rule: t('registerValidation.passwordNumber'), test: (password: string) => /[0-9]/.test(password) },
    { rule: t('registerValidation.passwordSpecialChar'), test: (password: string) => /[!@#$%^&*(),.?":{}|<>]/.test(password) },
  ];

  // Yup validation schema
  const validationSchema = Yup.object({
    username: Yup.string().required(t('registerValidation.usernameRequired')),
    email: Yup.string().email(t('registerValidation.emailInvalid')).required(t('registerValidation.emailRequired')),
    password: Yup.string()
      .required(t('registerValidation.passwordRequired'))
      .test('password-strength', t('registerValidation.passwordWeak'), function (value) {
        // Check that all password criteria are fulfilled
        return passwordCriteria.every((criteria) => criteria.test(value || ''));
      }),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), undefined], t('registerValidation.passwordsMustMatch'))
      .required(t('registerValidation.confirmPasswordRequired')),
  });

  const formik = useFormik({
    initialValues: {
      username: '', // Make sure it's an empty string and not null
      email: '',    // Make sure it's an empty string and not null
      password: '', // Make sure it's an empty string and not null
      confirmPassword: '', // Make sure it's an empty string and not null
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const response = await fetch('http://localhost:3000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values), // Send form data to backend
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error(errorData.msg || 'An error occurred during registration.');
        } else {
          // Handle successful registration
          console.log('Registration successful');
        }
      } catch (err) {
        console.error('Registration error:', err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="register-container">
      <form onSubmit={formik.handleSubmit}>
        <h2>{t('register.title')}</h2>

        {/* Username Input */}
        <div>
          <label htmlFor="username" className="form-label">
            {t('register.username')}
          </label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete='new-username'
            required
          />
          {formik.touched.username && formik.errors.username && <p className="error">{formik.errors.username}</p>}
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="form-label">
            {t('register.email')}
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            autoComplete='email'
          />
          {formik.touched.email && formik.errors.email && <p className="error">{formik.errors.email}</p>}
        </div>

        {/* Password Input */}
        <div>
          <label htmlFor="password" className="form-label">
            {t('register.password')}
          </label>
          <div className="password-input-container">
            <input
              type={passwordType}
              id="password"
              className="form-control"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={() => setIsPasswordFocused(false)}
              onFocus={() => setIsPasswordFocused(true)}
              required
              autoComplete="new-password"
            />
            <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
              <FontAwesomeIcon icon={passwordType === 'password' ? faEyeSlash : faEye} />
            </span>
          </div>

          {/* Display password criteria */}
          {isPasswordFocused && (
            <ul className="password-criteria-list">
              {passwordCriteria.map((criteria, index) => (
                <li key={index} className={criteria.test(formik.values.password) ? 'valid' : 'invalid'}>
                  {criteria.rule}
                </li>
              ))}
            </ul>
          )}

          {formik.touched.password && formik.errors.password && <p className="error">{formik.errors.password}</p>}
        </div>

        {/* Confirm Password Input */}
        <div>
          <label htmlFor="confirmPassword" className="form-label">
            {t('register.confirmPassword')}
          </label>
          <div className="password-input-container">
            <input
              type={confirmPasswordType}
              id="confirmPassword"
              className="form-control"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              required
              autoComplete="new-password"
            />
            <span className="password-toggle-icon" onClick={toggleConfirmedPasswordVisibility}>
              <FontAwesomeIcon icon={confirmPasswordType === 'password' ? faEyeSlash : faEye} />
            </span>
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="error">{formik.errors.confirmPassword}</p>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? <Spinner animation="border" size="sm" /> : t('register.submit')}
        </button>
      </form>
    </div>
  );
};

export default Register;
