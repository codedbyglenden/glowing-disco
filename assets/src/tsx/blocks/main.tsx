import ListView from "./listView";

const MainStage = ({articles, featuredImage, attributes, setAttributes}) => {

	// Split the article pos
	const article     = articles[0];
	const articleList = articles.slice(1);

	return (
		<div className="mcb-main-stage">
			<article className="stage">
				<div className="feature-image">
					<img src={article.thumbnail}/>
				</div>
				<div className="headline">
					<h2 className="heading">{article.title}</h2>
				</div>
			</article>

			<ListView articles={articleList} attributes={attributes} setAttributes={setAttributes}  />
		</div>
	);
}

export default MainStage