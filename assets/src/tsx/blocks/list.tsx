
const List = ({articles, featuredImage}) => {

	return(
		<div className="articles">
			{
				Object.values(articles).map((article, index) => (
					<article className="mcb-article" key={index}>
						{ ( featuredImage && article.thumbnail ) &&
							<div className="hp-selector-image">
								<img src={article.thumbnail ?? undefined}/>
							</div>
						}
						<div className="hp-selector-content">
							<time dateTime={article.date}>{article.date}</time>
							<h3 className="hp-block-header">{article.title}</h3>
						</div>
					</article>
				))
			}
		</div>
	)
}

export default List