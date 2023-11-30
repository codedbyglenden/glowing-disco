
const { MediaUpload, MediaUploadCheck } = wp.blockEditor;
const { Button } = wp.components;

const FeaturedPost = ({image, title, attributes, setAttributes}) => {

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

	return(
		<>
		<article className="stage">
				<div className="feature-image">
					<img src={image}/>
				</div>
				<div className="headline">
					<h2 className="heading">{title}</h2>
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
		</>
	)
};

export default FeaturedPost;