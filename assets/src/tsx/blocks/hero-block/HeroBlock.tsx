import List from "./List";
import FeaturedPost from "./FeaturedPost";

const HeroBlock = ({articles, attributes, setAttributes}) => {

	if ( articles.length < 1 ) {
		return (
			<div className="no-posts">
				<h2 className="heading">Add posts to output data</h2>
			</div>
		)
	}

	// Split the article pos
	const article     = articles[0];
	const articleList = articles.slice(1);

	return (
		<div className="mcb-hero-block">

			<FeaturedPost
				title={article.title}
				image={attributes.mediaUrl ? attributes.mediaUrl : article.thumbnail !== false ? article.thumbnail : undefined}
				attributes={attributes}
				setAttributes={setAttributes}
			/>

			<List articles={articleList} attributes={attributes} setAttributes={setAttributes}  />
		</div>
	);
}

export default HeroBlock;