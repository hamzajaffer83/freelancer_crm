import { gsap } from 'gsap';
import { useLayoutEffect, useRef } from 'react';

const TabBar = ({
    tabs,
    selectedTab,
    setSelectedTab,
}: {
    tabs: { title: string; source: string }[];
    selectedTab: string;
    setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}) => {
    const activeBarRef = useRef<HTMLDivElement | null>(null);
    const tabsRef = useRef<Record<string, HTMLButtonElement | null>>({});

    useLayoutEffect(() => {
        const activeTab = tabsRef.current[selectedTab];
        const bar = activeBarRef.current;

        if (activeTab && bar) {
            const tabRect = activeTab.getBoundingClientRect();
            const parentRect = activeTab.parentElement!.getBoundingClientRect();

            gsap.to(bar, {
                x: tabRect.left - parentRect.left,
                width: tabRect.width,
                duration: 0.35,
                ease: 'power2.out',
            });
        }
    }, [selectedTab]);
    return (
        <header className="relative flex gap-6 pb-2">
            {/* Active sliding bar */}
            <div
                ref={activeBarRef}
                className="absolute bottom-0 h-[3px] rounded-full bg-primary"
                style={{ width: '0px' }}
            />

            {/* Tabs */}
            {tabs.map((tab, index) => (
                <button
                    key={index}
                    ref={(el) => {
                        tabsRef.current[tab.source] = el;
                    }}
                    onClick={() => setSelectedTab(tab.source)}
                    className={`pb-2 text-sm transition ${
                        selectedTab === tab.source
                            ? 'font-semibold text-primary'
                            : 'text-gray-500'
                    }`}
                >
                    {tab.title}
                </button>
            ))}
            <section></section>
        </header>
    );
};

export default TabBar;
