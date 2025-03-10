import React from 'react'

export default async function FailPage(params: {
    code: string;
    message: string;
}) {
  const { code, message } = params;
  return (
    <div>
        <h1>결제 실패</h1>
        <p>{code}</p>
        <p>{message}</p>
    </div>
  )
}
