export function FormError({ error }: { error?: string[] }) {
  if (!error) return null;

  return error.map((err, index) => (
    <div key={index} className='text-error text-xs italic mt-1 py-0.5'>
      {err}
    </div>
  ));
}
