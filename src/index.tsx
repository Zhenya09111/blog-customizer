import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, OptionType } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [pageStyles, setPageStyles] = useState(defaultArticleState);
	const [options, setOptions] = useState(defaultArticleState);
	const changeStyle = (
		event: React.MouseEvent<HTMLButtonElement> | undefined
	) => {
		if (event) {
			event.preventDefault();
			setPageStyles({ ...options });
		}
	};
	const changeOptions = (option: OptionType, name: string | undefined) => {
		if (typeof name === 'string') {
			setOptions({
				...options,
				[name]: option,
			});
			console.log(option);
		}
	};

	const resetStyles = (
		event: React.MouseEvent<HTMLButtonElement> | undefined
	) => {
		if (event) {
			event.preventDefault();
			setPageStyles({ ...defaultArticleState });
			setOptions({ ...defaultArticleState });
		}
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': pageStyles.fontFamilyOption.value,
					'--font-size': pageStyles.fontSizeOption.value,
					'--font-color': pageStyles.fontColor.value,
					'--container-width': pageStyles.contentWidth.value,
					'--bg-color': pageStyles.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				options={options}
				changeOptions={changeOptions}
				changeStyle={changeStyle}
				resetStyles={resetStyles}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
