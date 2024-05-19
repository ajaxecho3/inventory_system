/* eslint-disable no-unused-vars */
import React from 'react'

const Login = () => {

  //store to local storage

  const handleSubmit = (e) => {
    e.preventDefault()
    const username = e.target[0].value
    const password = e.target[1].value


    if (username === 'admin' && password === 'admin') {
      // store to local storage
      localStorage.setItem('loginin', true)
      window.location.href = '/'
    }
  }

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600 space-y-5">

        <form
          onSubmit={(e) => handleSubmit(e)}
          className="space-y-5"
        >
          <div>
            <label className="font-medium">
              Username
            </label>
            <input
              type="text"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>

          <button
            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
          >
            Login in
          </button>
        </form>

      </div>
    </main>
  )
}

export default Login