import React from 'react'
import Image from 'next/image'
import notFoundImage from "@/assets/images/error.gif"
export default function CustomNotFound() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <span className="text-[90px] font-extrabold flex items-center">
        4<Image src={notFoundImage} alt="404" width={100} height={100} className='-mx-2' />4
      </span>
      <strong>Oops, Page not found!</strong>
    </div>
  )
}
