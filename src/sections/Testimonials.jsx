import React from 'react'
import { clients } from '../exports'
import ClientsGrid from '../components/ClientsGrid'

const Testimonials = () => {
  return (
    <section id='testimonials' className='w-full flex flex-col gap-5 h-fit p-7 lg:p-20'>
      <p className='text-center text-xl '>Testimonials</p>
      <h1 className='text-green-600 font-bold text-6xl text-center leading-[68px]'>What Students Says</h1>
      <p className='text-slate-950 text-2xl text-center'>Discover what our students have to say about their transformative learning experiences. Read firsthand testimonials from satisfied learners who've benefited from our courses.</p>
      <div className='flex justify-center flex-wrap mt-5 w-full gap-6'>
        {clients.map((client)=>(
          <div key={client.name} className='w-80'>
            <ClientsGrid {...client}/>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Testimonials