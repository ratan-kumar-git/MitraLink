import React from 'react'
import BaseLayout from '../components/layout/BaseLayout'
import SidebarLayout from '../components/layout/SidebarLayout'

const Group = () => {
  return (
    <BaseLayout sidebar={(
      <SidebarLayout content={(
        <>
          <h1 className='pt-10 text-center text-lg font-semibold'>Comming Soon !!</h1>
          <p className='pt-1 text-center text-base font-semibold'>Work under process...</p>
        </>
      )} />
    )} content={
    <div className='bg-zinc-200 dark:bg-gray-900 h-screen hidden sm:block'>
      <h1 className='pt-10 text-center text-lg font-semibold'>Comming Soon !!</h1>
      <p className='pt-1 text-center text-base font-semibold'>Work under process...</p>
    </div>
    }/>
  )
}

export default Group