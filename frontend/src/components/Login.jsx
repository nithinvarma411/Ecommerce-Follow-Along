import { useState } from 'react'


function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault() 
        if (email && password && mobileNumber) {
            console.log(email, password)
        }
    }

    return (
    <>
        <div className="flex items-center justify-center min-h-screen bg-gray-500">
            <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2"
                         htmlFor="email"
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}>
                         Email
                        </label>
                        <input
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                        id="email"
                        type="text"
                        placeholder="Email"
                        required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2"
                         htmlFor="Mobile Number"
                         value={mobileNumber}
                         onChange={(e) => setMobileNumber(e.target.value)}>
                         Mobile Number
                        </label>
                        <input
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                        id="Mobile Number"
                        type="number"
                        placeholder="Mobile Number"
                        required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" 
                         htmlFor="password"
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}>
                        Password
                        </label>
                        <input
                        className="border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none"
                        id="password"
                        type="password"
                        placeholder="******************"
                        required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={handleSubmit}>
                        Sign In
                        </button>
                
                        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                        Forgot Password?
                        </a>

                    </div>
                </form>
            </div>
        </div>



    </>
  )
}

export default Login