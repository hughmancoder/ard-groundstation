/*
import { View } from '@/types';
import React from 'react';

import {
    GiChart, GiRadarDish, GiSettingsKnobs
} from 'react-icons/gi';

interface NavigationMenuProps {
    view: View;
    setView: React.Dispatch<React.SetStateAction<View>>;

}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ view, setView }) => {
	const iconMap: { [key: string]: JSX.Element } = {
		telemetry: <GiRadarDish className="inline mr-2" />,
		settings: <GiSettingsKnobs className="inline mr-2" />,
		details: <GiChart className="inline mr-2" />,
	};

	return (
		<div className="flex flex-row lg:flex-col pt-6 space-x-4 lg:space-x-0 lg:space-y-6">
			{['telemetry', 'settings', 'details'].map((item) => (
				<div
					key={item}
					onClick={() => setView(item as View)}
					className={`text-md font-bold rounded cursor-pointer hover:text-blue-100 ${
						view === item ? 'text-white' : 'text-gray-600'
					}`}
				>
					{iconMap[item]} {item.charAt(0).toUpperCase() + item.slice(1)}
				</div>
			))}
		</div>
	);
}

export default NavigationMenu;
*/