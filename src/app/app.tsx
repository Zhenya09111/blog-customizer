import styles from '../styles/index.module.scss';

import { Article } from '../components/article/Article';
import { ArticleParamsForm } from '../components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from '../constants/articleProps';
import clsx from 'clsx';
import { CSSProperties, useState } from 'react';

export const App = () => {
	const [pageStyles, setPageStyles] = useState(defaultArticleState);

	const changeStyle = (options: ArticleStateType) => {
		setPageStyles({ ...options });
	};

	const resetStyles = () => {
		setPageStyles({ ...defaultArticleState });
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
			<ArticleParamsForm changeStyle={changeStyle} resetStyles={resetStyles} />
			<Article />
		</main>
	);
};
