import css from "./page.module.css";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Not found page',
  description: 'This page does not exist in NoteHub application.',
   openGraph: {
    title: "Not found page",
    description:
      "This page does not exist in NoteHub application.",

    siteName: "NoteHub",
    url: "https://08-zustand.vercel.app/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Not found page",
      },
    ],
  },
};
const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
