import React from 'react'

export default function LayoutProvider({ children }: { children: React.ReactNode }) {
  return (
    <div className='max-w-screen-lg mx-auto'>
        {children}
    </div>
  )
}
