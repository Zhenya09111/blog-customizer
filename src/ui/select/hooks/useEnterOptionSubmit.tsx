import { useEffect } from 'react';
import { UseEnterOptionSubmit } from 'src/constants/articleProps';

export const useEnterOptionSubmit = ({
	onClick,
	value,
	optionRef,
}: UseEnterOptionSubmit) => {
	useEffect(() => {
		const option = optionRef.current;
		if (!option) return;
		const handleEnterKeyDown = (event: KeyboardEvent) => {
			if (document.activeElement === option && event.key === 'Enter') {
				onClick(value);
			}
		};

		option.addEventListener('keydown', handleEnterKeyDown);
		return () => {
			option.removeEventListener('keydown', handleEnterKeyDown);
		};
	}, [value, onClick, optionRef]);
};
