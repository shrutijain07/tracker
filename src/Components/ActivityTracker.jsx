import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { incrementCount } from '../redux/slices/activitySlice';

export default function ActivityTracker() {
  const form = useForm();
  const { register } = form
  const dispatch = useDispatch()

  const handleSubmit = (e)=>{
    e.preventDefault()
    dispatch(incrementCount(1))
  }
  return (
    <div className='p-4' style={{height:'600px',width:'600px',background: 'beige'}}>
      <form action="" onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor="title">Title</label>
          <input className='form-control' type="text" id="title" {...register("title")} />
        </div>
        <div className='form-group'>
          <label htmlFor="desc">Description</label>
          <input className='form-control' type="text" id="desc" {...register("desc")} />
        </div>
        <div className='d-flex justify-content-center'>
          <button type="submit" className='mt-2 btn btn-primary' >Submit</button>
        </div>
      </form>
    </div>
  )
}
