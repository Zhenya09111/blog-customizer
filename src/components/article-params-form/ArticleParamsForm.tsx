import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { clsx } from 'clsx';
import { useState, useRef } from 'react';

import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { useOverlayClose } from 'src/ui/select/hooks/UseOverlayClose';
import { useEscClose } from 'src/ui/select/hooks/useEscClose';

export type ParametersSelected = {
	fontFamilyOption: OptionType;
	fontSizeOption: OptionType;
	fontColor: OptionType;
	contentWidth: OptionType;
	backgroundColor: OptionType;
};

type ArticleParamsFormProps = {
	options: ParametersSelected;
	changeOptions: (selected: OptionType, par: string | undefined) => void;
	changeStyle: (event: React.MouseEvent<HTMLButtonElement> | undefined) => void;
	resetStyles: (event: React.MouseEvent<HTMLButtonElement> | undefined) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { changeOptions, options, changeStyle, resetStyles } = props;
	const [isOpen, setOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const handleOpeningSideBar = () => {
		setOpen((prevState) => !prevState);
	};

	useOverlayClose({
		rootRef,
		isOpen,
		onChange: setOpen,
	});

	useEscClose({
		isOpen,
		onChange: setOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleOpeningSideBar} />
			<aside
				ref={rootRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form className={styles.form}>
					<div className={styles.gridWrapper}>
						<Text as='h1' size={31} weight={800} uppercase>
							задайте параметры
						</Text>
						<Select
							selected={options.fontFamilyOption}
							options={fontFamilyOptions}
							title='шрифт'
							onChange={changeOptions}
							id='fontFamilyOption'
						/>
						<RadioGroup
							name='sizeFont'
							options={fontSizeOptions}
							selected={options.fontSizeOption}
							title='размер шрифта'
							onChange={changeOptions}
							id='fontSizeOption'
						/>
						<Select
							selected={options.fontColor}
							options={fontColors}
							title='цвет шрифта'
							onChange={changeOptions}
							id='fontColor'
						/>
						<Separator />
						<Select
							selected={options.backgroundColor}
							options={backgroundColors}
							title='цвет фона'
							onChange={changeOptions}
							id='backgroundColor'
						/>
						<Select
							selected={options.contentWidth}
							options={contentWidthArr}
							title='ширина контента'
							onChange={changeOptions}
							id='contentWidth'
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={resetStyles}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={changeStyle}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
