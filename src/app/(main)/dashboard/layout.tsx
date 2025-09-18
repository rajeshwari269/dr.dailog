"use client";

import AppHeader from "./_components/app-header";

const DashboardLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-100">
            <AppHeader />
            <main className="px-4 sm:px-6 py-6">
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout