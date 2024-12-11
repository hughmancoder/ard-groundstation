import React from 'react';

interface NavigationMenuProps {
    view: string;
    setView: (view: string) => void;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ view, setView }) => {
    return (
        <div className="flex flex-row lg:flex-col pt-6 space-x-4 lg:space-x-0 lg:space-y-6">
            {['telemetry', 'settings', 'details'].map((item) => (
                <div
                    key={item}
                    onClick={() => setView(item)}
                    className={`text-md font-bold rounded cursor-pointer hover:text-blue-100 ${
                        view === item ? 'text-white' : 'text-gray-600'
                    }`}
                >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                </div>
            ))}
        </div>
    );
}

export default NavigationMenu;