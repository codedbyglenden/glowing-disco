const {
    element: {
        useState,
    },
} = wp;

const {
    URLInput,
	BlockControls
} = wp.editor;

const {
    Popover,
    Button,
} = wp.components;

function URLPopover({
	url,
	setUrl
}) {

    const [isPopoverVisible, setPopoverVisibility] = useState(false);

    return (
        <>
            <Button
				icon="admin-links"
				onClick={() => setPopoverVisibility(true)}
				label="Add/Edit Link"
			/>

            {isPopoverVisible && (
                <Popover position="middle center" onClose={() => setPopoverVisibility(false)}>
                    <URLInput
                        value={url}
                        onChange={setUrl}
                    />
                    <Button
                        isPrimary
                        onClick={() => setPopoverVisibility(false)}
                    >
                        Apply
                    </Button>
                </Popover>
            )}
        </>
    );
}

export default URLPopover;