import React from 'react'

export default function Score({ score }: { score: number }) {
  return (
    <span className="relative text-gray-200 text-lg">
      ★★★★★
      <span
        className="absolute top-0 left-0 h-full text-yellow-500 overflow-hidden"
        style={{
          width: `${score * 20}%`,
        }}
      >
        ★★★★★
      </span>
    </span>
  )
}
