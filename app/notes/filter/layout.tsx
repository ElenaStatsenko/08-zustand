import css from "./layout.module.css";
import { Suspense } from "react";

export default function LayoutNotes({
  children,
  sidebar,
}: Readonly<{
  children: React.ReactNode;
  sidebar: React.ReactNode;
}>) {
  return (
    <section className={css.container}>
      <Suspense fallback={<p>Loading, please wait...</p>}>
      <aside className={css.sidebar}>{sidebar}</aside></Suspense>
      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
}
