import HeroBlock from "./HeroBlock";

declare const wp: any;
declare const blockData: Array<string>;

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

const {
	element: {
		useState,
	},
} = wp;

const {
	InspectorControls,
} = wp.editor;

const {
	PanelBody,
	SearchControl,
	ToggleControl,
	SelectControl
} = wp.components;

const {
	select
} = wp.data;

const site_url = blockData.url;

registerBlockType( 'mcb/hero', {
	title: 'MCB Hero Block',
	icon: 'smiley',
	category: 'codedbyglenden',
	supports: {
		align: ['full']
	},
	attributes: {
		savedPosts: {
			type: 'array',
			default: []
		},
		displayType: {
			type: 'string',
			default: 'main'
		},
		postType: {
			type: 'string',
			default: 'post'
		},
		align: {
			type: 'string',
			default: 'full'
		},
		listHeadingLink: {
			type: 'object',
			default: {
				url: '',
				text: '',
			}
		},
		viewAllLink: {
			type: 'object',
			default: {
				url: '',
				text: '',
			}
		},
		mediaUrl: {
			type: 'string',
			default: '',
		},
		mediaId: {
			type: 'int',
			default: '',
		}
	},
	edit: ( { attributes, setAttributes } ) => {

		const [searchQuery, setSearchQuery] = useState('');
		const [foundPosts, setFoundPosts] = useState([]);

		let { savedPosts, displayType, postType } = attributes;

		/**
		 * Query for posts with a search term.
		 */
		const searchPosts = async (query) => {

			// If query empty reset search states.
			if ( query === '' ) {
				setFoundPosts([]);
				setSearchQuery('');
				return;
			}

			setSearchQuery(query)

			fetch(site_url + '/wp-json/mcb/query/search?search=' + query + '&post_type=' + postType)
			.then(response => {
				if ( ! response.ok ) {
					throw new Error( 'Network response was not ok' );
				}
				return response.json();
			})
			.then(data => {
				setFoundPosts(data)
			})
			.catch(error => {
				console.error( 'Fetch error:', error );
			});
		}

		/**
		 * Adds a post to the bottom of the list.
		 */
		const savePosts = (post) => {

			// Only add the post if it isn't already selected.
			if ( ! savedPosts.find( (obj) => obj.id === post.id ) ) {
				setAttributes({savedPosts: [...savedPosts, post] })
			}

			// Empty the search input.
			setSearchQuery('');
			setFoundPosts([])
		}

		/**
		 * Remove a post from the list.
		 */
		const removePosts = (post) => {
			setAttributes({savedPosts: savedPosts.filter(obj => obj.id !== post.id)})
		}

		/**
		 * Pull post Uup the selected list.
		 */
		const postUp = (post) => {

			let posts = savedPosts;
			const index = posts.findIndex(item => item.id === post.id);

			if ( index <= 0 ) {
				return;
			}

			// Get the post current in the index we want.
			let tempPost = posts[index - 1];

			// Little swapsy doodle.
			posts[index - 1] = post;
			posts[index] = tempPost;

			setAttributes({savedPosts: [...posts]})
		}

		/**
		 * Push post down the selected list.
		 */
		const postDown = (post) => {

			let posts = savedPosts;
			const index = posts.findIndex(item => item.id === post.id);

			if ( index === posts.length - 1 ) {
				return;
			}

			// Get the post current in the index we want.
			let tempPost = posts[index + 1];

			// Little swapsy doodle.
			posts[index + 1] = post;
			posts[index] = tempPost;

			setAttributes({savedPosts: [...posts]})
		}

		return (
			<>
				<InspectorControls key='inspector'>
					<PanelBody title={ __( 'Selected Posts' ) } initialOpen={ true } >
						{savedPosts && <>
							<table className="wp-list-table widefat fixed striped table-view-list">
								<tbody>
									{ savedPosts?.map( ( page ) => (
										<tr key={ page.id } style={{display: 'flex', justifyContent: 'end'}}>
											<td className="row-center" style={{flex: '1', overflow: 'hidden'}}>
												{ page.title.length > 23 ? page.title.substring(0, 23) + '...' : page.title}
											</td>
											<td>
												<button type="button" onClick={() => postUp(page)} className="components-button has-icon" aria-label="Move post up list">
													<svg viewBox="0 0 24 24" width="24" height="24" className="components-panel__arrow" aria-hidden="true" focusable="false"><path d="M6.5 12.4L12 8l5.5 4.4-.9 1.2L12 10l-4.5 3.6-1-1.2z"></path></svg>
												</button>

												<button type="button" onClick={() => postDown(page)} className="components-button has-icon" aria-label="Move post down list">
													<svg viewBox="0 0 24 24" width="24" height="24" className="components-panel__arrow" aria-hidden="true" focusable="false"><path d="M17.5 11.6L12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z"></path></svg>
												</button>

												<button type="button" onClick={() => removePosts(page)} className="components-button has-icon" aria-label="Remove post from list">
													<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d="M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"></path></svg>
												</button>
											</td>
										</tr>
									) ) }
								</tbody>
							</table>
						</>}

						<SearchControl
							label={ __( 'Search posts' ) }
							value={searchQuery}
							onChange={searchPosts}
							style={{marginTop: '16px'}}
						/>

						{foundPosts.length > 0 &&
						<div className="mcb-wrap-search">
							<table className="wp-list-table widefat fixed striped table-view-list">
								<tbody>
									{ foundPosts?.map( ( post ) => (
										<tr key={ post.id } onClick={() => savePosts(post)} className="row-hover">
											<td>
												<div style={{display: 'flex', alignItems: 'center'}}>
													<div style={{width: '32px', height: '32px', background: '#e0e0e0',  marginRight: '4px'}}>
														<img style={{width: '32px', height: '32px'}} src={post.thumbnail ? post.thumbnail : undefined}/>
													</div>
													<div>
														<strong style={{display: 'block'}}>{post.title}</strong>
														<small>{post.type}</small>
													</div>
												</div>
											</td>
										</tr>
									) ) }
								</tbody>
							</table>
						</div>}
					</PanelBody>
				</InspectorControls>

				<HeroBlock articles={savedPosts} attributes={attributes} setAttributes={setAttributes} />;
			</>
		)
	},
	save: () => {
		return;
	}
});