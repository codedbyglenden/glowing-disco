import URLPopover from "@components/URLPopover";

const {
	Tooltip
} = wp.components;

const {
    element: {
        useState,
    },
} = wp;

const { TextControl } = wp.components;

const LinkWithText = ({
	url = '',
	text = '',
	placeholder,
	customClass = '',
	linkAttributeName,
	setAttributes
}) => {

	/**
	 * Set the url for the link object.
	 */
	const setUrl = (value) => {
		setAttributes({
			[linkAttributeName] : {
				url: value,
				text: text
			}
		});
	};

	/**
	 * Set the text for the link object.
	 */
	const setText = (value) => {
		setAttributes({
			[linkAttributeName] : {
				url: url,
				text: value
			}
		});
	};

	return(
		<div className="mcb-link-with-text">
			<URLPopover url={url} setUrl={setUrl} />

			<TextControl
				placeholder={placeholder}
				value={text}
				onChange={setText}
				className={customClass}
			/>

			{ ( ! url || url.length < 1 ) && text && text.length > 1 &&
				<Tooltip text="You have not yet provided a url">
					<span className="dashicon dashicons dashicons-warning"></span>
				</Tooltip>
			}
		</div>
	)
};

export default LinkWithText;