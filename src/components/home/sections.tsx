import React from 'react'

export default function Sections({ children }: React.PropsWithChildren) {
  return (
    <section className="pb-16 pt-12 sm:pb-24 px-4">
      {children}
    </section>
  );
}
