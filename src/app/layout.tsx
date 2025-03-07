import "@/app/globals.css";
import {Tabs} from "@/app/сomponents/Tabs/Tabs";

export const metadata = {
    title: "Tabs App",
    description: "Tabs Navigation Example",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="uk">
        <body>
        <Tabs />
        {children}
        </body>
        </html>
    );
}
