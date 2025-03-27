import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const CaptainSignup = () => {
    const [email, setEmail] = useState('')
    const [password,setPassword]=useState('')
    const [firstname,setFirstname]=useState('')
    const [lastname,setLastname]=useState('')
    const [userData,setUserData]=useState({})
    const submitHandler=(e)=>{
        e.preventDefault();
        setUserData({
            email:email,
            password:password,
            fullName:{
                firstname:firstname,
                lastname:lastname
            }
        })
        console.log(userData)
       setEmail('')
       setPassword('')
       setFirstname('')
       setLastname('')
    }
  return (
    <div className='p-7 flex h-screen flex-col justify-between'>
      <div >
      <img className='w-16 mb-8'  src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
      <form onSubmit={(e)=>submitHandler(e)}>
<h3 className='text-base w-full font-medium mb-2'>Captain name</h3>
<div className='flex gap-4 mb-7' >
<input required

className='bg-[#f3f3f3]  w-1/2 rounded px-4 py-2 border  text-base placeholder:text-base'
 type="text" placeholder="First name"
 value={firstname}
 onChange={(e)=>
    setFirstname(e.target.value)}
 />
<input required
className='bg-[#f3f3f3]  w-1/2 rounded px-4 py-2 border  text-base placeholder:text-base'
 type="text" placeholder="Last name"  
 
 value={lastname}
 onChange={(e)=>
    setLastname(e.target.value)}
 />

</div>
<h3 className='text-base width-full font-medium mb-2'>Captain email</h3>
<input required
value={email}
onChange={(e)=>{setEmail(e.target.value)}}
className='bg-[#f3f3f3] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
 type="email" placeholder="email@example.com"/>

<h3 
className='text-base font-medium mb-2'>Enter password</h3>
<input 

className='bg-[#f3f3f3] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
required type="password" placeholder="password"/>
<button
className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base'
>Create account</button>
<p className='text-center'>if, Already have a account? <Link to='/captain-login' className='text-blue-600'>Login here</Link></p>
      </form>
      </div>
      <div>
      <p className='text-[10px] leading-tight text-gray-500'>
  By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to the number provided.
</p>

      </div>
    </div>
  )
}

export default CaptainSignup
