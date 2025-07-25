import { OptionType } from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { Option } from './Option';
import { useRef } from 'react';

import styles from './RadioGroup.module.scss';

type RadioGroupProps = {
	name: string;
	options: OptionType[];
	selected: OptionType;
	onChange?: (option: OptionType, name: string | undefined) => void;
	title: string;
	id?: string;
};

export const RadioGroup = (props: RadioGroupProps) => {
	const { name, options, selected, onChange, title, id } = props;
	const radioGroupRef = useRef<HTMLDivElement>(null);

	const handleChange = (option: OptionType, name: string | undefined) => {
		onChange?.(option, name);
	};

	return (
		<div className={styles.container}>
			{title && (
				<>
					<Text weight={800} size={12} uppercase>
						{title}
					</Text>
				</>
			)}
			<div className={styles.group} ref={radioGroupRef} data-id={id}>
				{options.map((option) => (
					<Option
						key={option.value}
						groupName={name}
						value={option.value}
						title={option.title}
						selected={selected}
						onChange={() =>
							handleChange(option, radioGroupRef.current?.dataset.id)
						}
						option={option}
					/>
				))}
			</div>
		</div>
	);
};
