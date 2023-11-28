import LinkWithText from "./component/LinkWithText";

const ListView = ({
	articles,
	featuredImage,
	attributes,
	setAttributes
}) => {

	return(
		<div className="mcb-articles">

			<header className="mcb-articles-header">
				<LinkWithText
					placeholder="Breifing Room"
					url={attributes.listHeadingLink.url ?? ''}
					text={attributes.listHeadingLink.text ?? ''}
					linkAttributeName="listHeadingLink"
					setAttributes={setAttributes}
					customClass="is-uppercase"
				/>
			</header>

			<div className="mcb-articles-loop">
				{
					Object.values(articles).map((article, index) => (
						<article className="mcb-article" key={index}>
							{ ( featuredImage && article.thumbnail ) &&
								<div className="mcb-article-image">
									<img src={article.thumbnail}/>
								</div>
							}
							<div className="mcb-article-content">
								<time dateTime={article.date}>{article.date}</time>
								<h3 className="heading">{article.title}</h3>
							</div>
						</article>
					))
				}
			</div>

			<div className="mcb-articles-footer">
				<LinkWithText
					placeholder="View all"
					url={attributes.viewAllLink.url ?? ''}
					text={attributes.viewAllLink.text ?? ''}
					linkAttributeName="viewAllLink"
					setAttributes={setAttributes}
				/>
			</div>
		</div>
	)
}

export default ListView;