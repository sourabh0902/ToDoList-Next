"use client"
import { Main } from 'next/document'
import { mainModule } from 'process'
import React, { useState } from 'react'

const page = () => {
  const [title, settitle] = useState("")
  const [desc, setdesc] = useState("")
  const [MainTask, setMainTask] = useState([]); {/*Created a container in which the previous and the new tasks will be stored*/}

  let renderTask = <h2 className=' flex items-center justify-center'>No Task Available</h2>

  const deleteHandler = (i) => {
    let copyTask = [...MainTask]
    copyTask.splice(i,1);
    setMainTask(copyTask);
  }

  if (MainTask.length > 0) {
    {/*The below logic will basically add the title and desc in the renderTask contianer if the container is empty otherwise it'll show default value of rendertask*/}
    renderTask = MainTask.map ((t, i) => {
      return (
        <li key={i} className=' flex items-center justify-between mb-5'>
          <div className=' flex items-center justify-between w-2/3'>
              <h5 className=' text-xl font-semibold'>{t.title}</h5>
            <h6 className=' text-lg font-medium'>{t.desc}</h6>
          </div>
          <button className=' bg-red-500 font-bold text-white rounded px-4 py-2'
            onClick={ () => {
              deleteHandler(i);
            }}
          >Delete</button>
        </li>
      )
    })
  }
  


  const submitHandler = (e) => {
    e.preventDefault(); {/*This line will stop the page from being reload so that the data won't be lost*/}
    {/*This will basically copy the previos tasks using ... and store it and also all the new tasks*/}
    setMainTask([...MainTask, {title, desc}]);

    {/* Below lines will clear out the input fields once they are submitted, so that user can add more tasks*/}
    settitle("");
    setdesc("");

    console.log(MainTask);
  }

  return (
    <>
      <h1 className=' bg-zinc-900 font-bold text-white text-5xl p-5 text-center'>Sourabh's ToDo List</h1>
      <form onSubmit={submitHandler}>
        <input type='text' className=' text-2xl border-4 border-slate-900 m-8 px-4 py-2 font-medium rounded-md' 
          placeholder='Enter Title here'
          value={title}
          onChange={ (e) => {
            settitle(e.target.value); {/* e.target.value => This particular line will fetch the values 
            (characters) which are printed in the console */}
          }}
        />
        <input type='text' className=' text-2xl border-4 border-slate-900 m-8 px-4 py-2 font-medium rounded-md' 
          placeholder='Enter Description here'
          value={desc}
          onChange={ (e) => {
            setdesc(e.target.value);
          }}
        />
        <button className=' text-white bg-black text-2xl m-5 px-4 py-3 rounded font-bold'>Add Task</button>
      </form>
      <hr className='m-3'/>
      <div className=' p-8 m-5 bg-slate-300'>
          <ul> {/*Created a ul because we have to show all the task in the form of lists*/}
            {renderTask} {/*The tasks will be printed out using this*/}
          </ul>
      </div>
    </>
  )
}

export default page