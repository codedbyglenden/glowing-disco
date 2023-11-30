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

const LinkWithText = ({url = '', text = '', placeholder, customClass = '', linkAttributeName, setAttributes}) => {

	const setUrl = (value) => {

		const obj = {
			url: value,
			text: text
		};

		setAttributes( { [linkAttributeName]: obj } );
	};

	const setText = (value) => {

		const obj = {
			url: url,
			text: value
		};

		setAttributes( { [linkAttributeName]: obj } );
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