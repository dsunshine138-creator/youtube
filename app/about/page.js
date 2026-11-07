'use client'
import React, { useState } from 'react'
import Header from '@/Components/Header'
import Link from 'next/link'
import {useRouter} from  'next/navigation'


const page = () => {
  const [count, setCount] = useState(0)
  const router = useRouter()
  function goToDaraz(){
    router.push("/daraz")
  }
  return (
    <div>
      <Header firstName={"faham"} age={30}
        setCount={setCount} count={count} />
      This is about page
      Count: {count}
      <button onClick={() => setCount(count + 1)}>Increament</button>
      <div>
        <parent age={40}/>
      </div>
      <button onClick={goToDaraz} className='bg-red-500 p-4 rounded'>
        Go to Daraz
      </button>
      <Link href="/product/1">samsung s27</Link>
      <Link href={"/daraz"}>Daraz</Link>
    </div>
  )
}

export default page