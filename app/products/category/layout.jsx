export default function Category({ children }) {
  return (
    <section className='flex flex-col items-center justify-around gap-4 md:py-10'>
      <div className='text-center w-[90%]'>{children}</div>
    </section>
  );
}
