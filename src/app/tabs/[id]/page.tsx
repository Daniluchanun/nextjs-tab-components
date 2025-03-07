"use client"
import { useParams } from "next/navigation";

export default function TabPage() {
    const params = useParams();
    const tabId = params.id;

    const tabs = {
        "1": { title: "Головна", content: "Це головна сторінка." },
        "2": { title: "Профіль", content: "Це сторінка профілю." },
        "3": { title: "Налаштування", content: "Це сторінка налаштувань." },
        "4": { title: "Допомога", content: "Це сторінка допомоги." },
        "5": { title: "Контакти", content: "Це сторінка контактів." },
        "6": { title: "FAQ", content: "Це сторінка FAQ." },
        "7": { title: "Блог", content: "Це сторінка блогу." },
        "8": { title: "Про нас", content: "Це сторінка про нас." },
        "9": { title: "Послуги", content: "Це сторінка з послугами." },
        "10": { title: "Новини", content: "Це сторінка новин." },
        "11": { title: "Клієнти", content: "Це сторінка з інформацією про клієнтів." },
        "12": { title: "Партнери", content: "Це сторінка з партнерами." },
    };


    const tab = tabs[tabId as keyof typeof tabs];

    if (!tab) return <div>Сторінку не знайдено</div>;

    return (
        <div>
            <h1>{tab.title}</h1>
        </div>
    );
}
