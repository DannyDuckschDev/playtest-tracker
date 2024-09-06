// frontend/src/components/blocks/DemographicsBlock.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import BlockHeader from '../common/BlockHeader';

interface Props {
  name: string;
  age: string;
  gender: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  error?: {
    name?: string;
    age?: string;
    gender?: string;
  };
}

const DemographicsBlock: React.FC<Props> = () => {
  const { t } = useTranslation();

  // Formik Setup
  const formik = useFormik({
    initialValues: {
      name: '',
      age: '',
      gender: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required(t('survey.validation.nameRequired')), // Name is required
      age: Yup.number()
        .nullable() // Age is optional but must be a number if provided
        .typeError(t('survey.validation.ageRequired')), // Validation message for invalid number
      gender: Yup.string()
        .required(t('survey.validation.genderRequired')), // Gender is required
    }),
    onSubmit: (values) => {
      console.log('Demographic Data:', values);
      // Logic to handle form submission (e.g., API call)
    },
  });

  return (
    <div className="block form-group">
      {/* Block Header: Displays category, question, and task */}
      <BlockHeader
        category="survey.categories.demographics"
        question="survey.questions.demographics"
        task="survey.tasks.enterDemographics"
      />

      {/* Name Field */}
      <div>
        <label htmlFor="name">{t('survey.labels.name')}</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          className="form-control"
        />
        {formik.errors.name && <p className="error-text">{formik.errors.name}</p>}
      </div>

      {/* Age Field */}
      <div>
        <label htmlFor="age">{t('survey.labels.age')}</label>
        <input
          type="text"
          id="age"
          name="age"
          value={formik.values.age}
          onChange={formik.handleChange}
          className="form-control"
        />
        {formik.errors.age && <p className="error-text">{formik.errors.age}</p>}
      </div>

      {/* Gender Field */}
      <div>
        <label htmlFor="gender">{t('survey.labels.gender')}</label>
        <select
          id="gender"
          name="gender"
          value={formik.values.gender}
          onChange={formik.handleChange}
          className="form-control"
        >
          <option value="">{t('survey.options.gender.select')}</option>
          <option value="male">{t('survey.options.gender.male')}</option>
          <option value="female">{t('survey.options.gender.female')}</option>
          <option value="divers">{t('survey.options.gender.divers')}</option>
        </select>
        {formik.errors.gender && <p className="error-text">{formik.errors.gender}</p>}
      </div>
    </div>
  );
};

export default DemographicsBlock;
