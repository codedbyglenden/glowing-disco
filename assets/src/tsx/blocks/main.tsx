import ListView from "./listView";

const { MediaUpload, MediaUploadCheck } = wp.blockEditor;
const { Button } = wp.components;

const MainStage = ({articles, featuredImage, attributes, setAttributes}) => {

	// Split the article pos
	const article     = articles[0];
	const articleList = articles.slice(1);

	const removeMedia = () => {
		setAttributes({
			mediaId: 0,
			mediaUrl: ''
		});
	}
 
 	const onSelectMedia = (media) => {
		setAttributes({
			mediaId: media.id,
			mediaUrl: media.url
		});
	}
 
	const blockStyle = {
		backgroundImage: attributes.mediaUrl != '' ? 'url("' + attributes.mediaUrl + '")' : 'none'
	};

	return (
		<div className="mcb-main-stage">
			<article className="stage">
				<div className="feature-image">
					<img src={attributes.mediaUrl ?? article.thumnail}/>
				</div>
				<div className="headline">
					<h2 className="heading">{article.title}</h2>
				</div>
			</article>

			<MediaUploadCheck>
				<MediaUpload
					onSelect={onSelectMedia}
					value={attributes.mediaId}
					allowedTypes={ ['image'] }
					render={({open}) => (
						<Button
							className="mcb-stage-override is-primary"
							onClick={open}
						>
							<span className="dashicon dashicons dashicons-camera-alt"></span>
						</Button>
					)}
				/>
				{
					attributes.mediaId ?
					<Button
						className="mcb-stage-remove mcb-stage-override is-danger"
						onClick={removeMedia}
					>
						<span className="dashicon dashicons dashicons-trash"></span>
					</Button>
				: ''}
			</MediaUploadCheck>

			<ListView articles={articleList} attributes={attributes} setAttributes={setAttributes}  />
		</div>
	);
}

export default MainStage