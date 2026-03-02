'use client';

import { useCartStore } from '@/store/cart/cartStore';
import { useEffect, useRef } from 'react';

export const Modal = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cartMatches = useCartStore((state) => state.cartMatches);

  useEffect(() => {
    const key = 'modal-displayed';
    const modalWasDisplayed = sessionStorage.getItem(key) === 'true';

    if (cartMatches.length == 0 || modalWasDisplayed) return;

    dialogRef.current?.showModal();
    sessionStorage.setItem(key, 'true');
  }, []);

  return (
    <dialog
      id='my_modal_5'
      ref={dialogRef}
      className='modal modal-bottom sm:modal-middle'
    >
      <div className='modal-box'>
        <h3 className='font-bold text-lg'>Hola!</h3>
        <p className='py-4'>
          Tienes apuestas pendientes en tu carrito. ¡Revísalas antes de
          continuar!
        </p>
        <div className='modal-action'>
          <form method='dialog'>
            {/* if there is a button in form, it will close the modal */}
            <button className='btn'>Cerrar</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};
