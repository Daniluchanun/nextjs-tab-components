"use client";

import { useState, useEffect, useRef } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useRouter } from "next/navigation";
import { useResizeObserver } from "@/app/hooks/useResizeObserver";
import { SortableTab } from "@/app/сomponents/SortableTab/SortableTab";
import styles from "./Tabs.module.css";

interface Tab {
    id: string;
    title: string;
    url: string;
    pinned: boolean;
}

const initialTabs: Tab[] = [
    { id: "1", title: "Головна", url: "/tabs/1", pinned: false },
    { id: "2", title: "Профіль", url: "/tabs/2", pinned: false },
    { id: "3", title: "Налаштування", url: "/tabs/3", pinned: false },
    { id: "4", title: "Допомога", url: "/tabs/4", pinned: false },
    { id: "5", title: "Контакти", url: "/tabs/5", pinned: false },
    { id: "6", title: "FAQ", url: "/tabs/6", pinned: false },
    { id: "7", title: "Блог", url: "/tabs/7", pinned: false },
    { id: "8", title: "Про нас", url: "/tabs/8", pinned: false },
    { id: "9", title: "Послуги", url: "/tabs/9", pinned: false },
    { id: "10", title: "Новини", url: "/tabs/10", pinned: false },
    { id: "11", title: "Клієнти", url: "/tabs/11", pinned: false },
    { id: "12", title: "Партнери", url: "/tabs/12", pinned: false },
];

const LOCAL_STORAGE_KEY = "tabs-order";

export const Tabs = () => {
    const [tabs, setTabs] = useState<Tab[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const containerWidth = useResizeObserver(containerRef);
    const router = useRouter();

    const TAB_WIDTH = 118;
    const visibleCount = Math.floor(containerWidth / TAB_WIDTH);

    const visibleTabs = tabs.slice(0, visibleCount);
    const hiddenTabs = tabs.slice(visibleCount);

    useEffect(() => {
        const savedTabs = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedTabs) {
            setTabs(JSON.parse(savedTabs));
        } else {
            setTabs(initialTabs);
        }
    }, []);

    useEffect(() => {
        if (tabs.length > 0) {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tabs));
        }
    }, [tabs]);

    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setTabs((prevTabs) => {
                const oldIndex = prevTabs.findIndex((tab) => tab.id === active.id);
                const newIndex = prevTabs.findIndex((tab) => tab.id === over.id);
                return arrayMove(prevTabs, oldIndex, newIndex);
            });
        }
    };

    const handleMoveTabToStart = (tabId: string, url: string) => {
        setTabs((prevTabs) => {
            const index = prevTabs.findIndex((t) => t.id === tabId);
            if (index === -1) return prevTabs;
            const newTabs = [...prevTabs];
            const [removed] = newTabs.splice(index, 1);
            newTabs.unshift(removed);
            return newTabs;
        });
        router.push(url);
    };

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext
                items={tabs.map((tab) => tab.id)}
                strategy={verticalListSortingStrategy}
            >
                <div>
                    <div ref={containerRef} className={styles.tabsContainer}>
                        {visibleTabs.map((tab) => (
                            <SortableTab key={tab.id} tab={tab} />
                        ))}
                    </div>

                    {hiddenTabs.length > 0 && (
                        <div className={styles.dropdown}>
                            Інші
                            <div className={styles.dropdownContent}>
                                {hiddenTabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => handleMoveTabToStart(tab.id, tab.url)}
                                        className={styles.dropdownTab}
                                    >
                                        {tab.title}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </SortableContext>
        </DndContext>
    );
};
