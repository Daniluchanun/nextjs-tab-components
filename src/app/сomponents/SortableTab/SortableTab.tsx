"use client";

import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import Link from "next/link";
import styles from "./SortableTab.module.css";
import { usePathname } from "next/navigation";

interface SortableTabProps {
    tab: {
        id: string;
        title: string;
        url: string;
        pinned: boolean;
    };
}

export const SortableTab = ({ tab }: SortableTabProps) => {
    const pathname = usePathname();

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: tab.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const handleClick = (e: React.MouseEvent) => {
        if (isDragging) {
            e.preventDefault();
        }
    };

    const isActive = pathname === tab.url;

    return (
        <Link href={tab.url} onClick={handleClick} className={styles.listStyle}>
            <div
                className={`${styles.tab} ${isActive ? styles.activeTab : ""}`}
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
            >
                {tab.title}
            </div>
        </Link>
    );
};
