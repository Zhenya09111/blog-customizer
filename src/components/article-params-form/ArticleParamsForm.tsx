import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { clsx } from 'clsx';
import { useState, useRef } from 'react';

import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import {
	ArticleParamsFormProps,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
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

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { changeStyle, resetStyles } = props;
	const [isOpen, setOpen] = useState(false);
	const [select, setSelect] = useState(defaultArticleState);
	const rootRef = useRef<HTMLDivElement>(null);
	const handleOpeningSideBar = () => {
		setOpen((prevState) => !prevState);
	};

	const changeOptions = (option: OptionType, name: string | undefined) => {
		if (typeof name === 'string') {
			setSelect({
				...select,
				[name]: option,
			});
		}
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

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		changeStyle(select);
	};

	const reset = (event: React.MouseEvent<HTMLButtonElement> | undefined) => {
		if (event) {
			event.preventDefault();
			setSelect({ ...defaultArticleState });
			resetStyles();
		}
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleOpeningSideBar} />
			<aside
				ref={rootRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.gridWrapper}>
						<Text as='h1' size={31} weight={800} uppercase>
							задайте параметры
						</Text>
						<Select
							selected={select.fontFamilyOption}
							options={fontFamilyOptions}
							title='шрифт'
							onChange={changeOptions}
							id='fontFamilyOption'
						/>
						<RadioGroup
							name='sizeFont'
							options={fontSizeOptions}
							selected={select.fontSizeOption}
							title='размер шрифта'
							onChange={changeOptions}
							id='fontSizeOption'
						/>
						<Select
							selected={select.fontColor}
							options={fontColors}
							title='цвет шрифта'
							onChange={changeOptions}
							id='fontColor'
						/>
						<Separator />
						<Select
							selected={select.backgroundColor}
							options={backgroundColors}
							title='цвет фона'
							onChange={changeOptions}
							id='backgroundColor'
						/>
						<Select
							selected={select.contentWidth}
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
							onClick={reset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
