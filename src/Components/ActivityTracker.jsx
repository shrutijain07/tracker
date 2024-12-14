import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { incrementCount } from '../redux/slices/activitySlice';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required').max(50, 'Title must be 50 characters or less'),
  description: Yup.string().required('Description is required').max(200, 'Description must be 200 characters or less'),
});
const base_url = import.meta.env.VITE_PUBLIC_BASE_URL

const fetchActivities = async () => {
  try {
    const response = await axios.get(`${base_url}/activities`);
    console.log('Activities fetched successfully:', response.data);
  } catch (error) {
    console.error('Error fetching activities:', error);
  }
};

const ActivityTracker = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    console.log('Form submission started', values);
    try {
      const response = await axios.post(`${base_url}/activities`, values);
      console.log('Activity posted successfully:', response.data);
      dispatch(incrementCount(1));
      resetForm();
    } catch (error) {
      console.error('Error posting activity:', error);
    }
  };

  return (
    <div className='p-4' style={{ height: '600px', width: '600px', background: '#f5f5f5' }}>
      <Formik
        initialValues={{ title: '', description: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className='form-group'>
              <label htmlFor='title'>Title</label>
              <Field className='form-control' type='text' id='title' name='title' />
              <ErrorMessage name='title' component='div' className='text-danger' />
            </div>

            <div className='form-group'>
              <label htmlFor='description'>Description</label>
              <Field className='form-control' type='text' id='description' name='description' />
              <ErrorMessage name='description' component='div' className='text-danger' />
            </div>

            <div className='d-flex justify-content-center'>
              <button type='submit' className='mt-2 btn btn-primary' disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ActivityTracker;
