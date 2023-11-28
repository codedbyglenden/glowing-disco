import ListView from "./listView";
import FeaturedPost from "./component/FeaturedPost";

const MainStage = ({articles, featuredImage, attributes, setAttributes}) => {

	// Split the article pos
	const article     = articles[0];
	const articleList = articles.slice(1);

	return (
		<div className="mcb-main-stage">

			<FeaturedPost
				title={article.title}
				image={article.thumbnail}
				attributes={attributes}
				setAttributes={setAttributes}
			/>

			<ListView articles={articleList} attributes={attributes} setAttributes={setAttributes}  />
		</div>
	);
}

export default MainStage