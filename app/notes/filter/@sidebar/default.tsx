import css from "./SidebarNotes.module.css";
import Link from "next/link";

export default async function SidebarNotes() {
  const tags = ["Work", "Personal", "Meeting", "Shopping", "Todo"];
  return (
    <div>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <Link href={`/notes/filter/All`} className={css.menuLink}>
            All
          </Link>
        </li>
        {tags.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
