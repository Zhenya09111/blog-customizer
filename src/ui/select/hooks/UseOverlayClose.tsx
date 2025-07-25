import { useEffect } from 'react';

type UseOverlayClose = {
	rootRef: React.RefObject<HTMLDivElement>;
	isOpen: boolean;
	onChange?: (value: boolean) => void;
};
export const useOverlayClose = ({
	rootRef,
	isOpen,
	onChange,
}: UseOverlayClose) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (
				event.target instanceof Node &&
				!rootRef.current?.contains(event.target)
			) {
				isOpen && onChange?.(false);
			}
		};
		window.addEventListener('mousedown', handleClick);
		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [isOpen]);
};
