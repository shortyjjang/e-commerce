import IconCart from '@/assets/icons/IconCart';
import { useCart } from '@/layout/LayoutProvider';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function CartButton() {
    const { cart } = useCart();
    const router = useRouter();
  return (
    <button
      onClick={() => router.push('/cart')}
      className="p-2 aspect-square relative"
    >
      <IconCart />
      <span className="absolute bottom-1/2 left-1/2 text-sm bg-red-500 text-white rounded-s-full rounded-e-full min-w-5 h-5 flex items-center justify-center">
        {cart.length}
      </span>
    </button>
  )
}
