import { useEffect } from 'react';

type UseEscClose = {
	isOpen: boolean;
	onChange?: (value: boolean) => void;
};

export const useEscClose = ({ isOpen, onChange }: UseEscClose) => {
	useEffect(() => {
		const handleEscapePress = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && isOpen) {
				isOpen && onChange?.(false);
			}
		};

		window.addEventListener('keydown', handleEscapePress);

		return () => {
			window.removeEventListener('keydown', handleEscapePress);
		};
	}, [isOpen]);
};
