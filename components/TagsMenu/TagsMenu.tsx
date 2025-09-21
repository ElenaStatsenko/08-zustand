"use client";
import { useState } from "react";
import Link from "next/link";
import css from "./TagsMenu.module.css";

const TagsMenu = () => {
  const tags = ["Work", "Personal", "Meeting", "Shopping", "Todo"];
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={css.menuContainer}>
      <button onClick={toggle} className={css.menuButton}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          <li>
            <Link
              href={`/notes/filter/All`}
              onClick={toggle}
              className={css.menuLink}
            >
              All notes
            </Link>
          </li>
          {tags.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={`/notes/filter/${tag}`}
                onClick={toggle}
                className={css.menuLink}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagsMenu;
