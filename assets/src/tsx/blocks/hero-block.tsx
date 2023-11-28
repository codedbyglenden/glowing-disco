import MainStage from './main';
import List from './list';
import NoPosts from './NoPosts';

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
	URLInput
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
    title: 'mcb Hero Block',
    icon: 'smiley',
    category: 'common',
    supports: {
        align: ['full']
    },
    attributes: {
        savedPosts: {
            type: 'array',
            default: []
        },
        featuredImage: {
            type: 'bool',
            default: false
        },
        displayType: {
            type: 'string',
            default: 'list'
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
				text: 'View all',
			}
		},
		
    },
    edit: ( {attributes, setAttributes} ) => {
        const [searchQuery, setSearchQuery] = useState('');
        const [foundPosts, setFoundPosts] = useState([]);

        let { savedPosts, featuredImage, displayType, postType } = attributes;

        const searchPosts = (query) => {
            if ( query === '' ) {
                setFoundPosts([])
                setSearchQuery(query)
                return;
            }

            setSearchQuery(query)
            const url = site_url + '/wp-json/mcb/query/search?search=' + query + '&post_type=' + postType;

            fetch(url)
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

		const savePosts = (post) => {
            const newSearch = foundPosts.filter(obj => obj.id !== post.id);

            const posts = [...savedPosts, post];
            setAttributes({savedPosts: posts})
            setFoundPosts(newSearch)
        }

        const removePosts = (post) => {
            const posts = savedPosts.filter(obj => obj.id !== post.id);

            setAttributes({savedPosts: posts})
        }

        const postUp = (post) => {
            var posts = savedPosts;

            const selectedPost  = posts.find(item => item.id === post.id);
            const oldIndex      = posts.indexOf(selectedPost);

            if (oldIndex > 0) {
                var newIndex = oldIndex - 1;

                posts.splice(oldIndex, 1)
                posts.splice(newIndex, 0, selectedPost)

                // We have to trigger a state change
                let tmpArray = [...posts];

                setAttributes({savedPosts: tmpArray})
            }
        }

        const postDown = (post) => {
            var posts = savedPosts;

            const selectedPost  = posts.find(item => item.id === post.id);
            const oldIndex      = posts.indexOf(selectedPost);

            if (oldIndex < posts.length - 1) {
                var newIndex = oldIndex + 1;
                posts.splice(oldIndex, 1)
                posts.splice(newIndex, 0, selectedPost)

                // We have to trigger a state change
                let tmpArray = [...posts];

                setAttributes({savedPosts: tmpArray})
            }
        }

        const setShowFeatured = (featured) => {
            if ( featured ) {
                setAttributes({featuredImage: true});
                return;
            }

            setAttributes({featuredImage: false});
        }

		function switchBlockType( type ) {

			if ( savedPosts.length < 1 ) {
				return <NoPosts />
			}

			switch(type) {
                case 'main':
                    return <MainStage articles={savedPosts} featuredImage={featuredImage} attributes={attributes} setAttributes={setAttributes} />;
                case 'list':
                    return <List articles={savedPosts} featuredImage={featuredImage} attributes={attributes} setAttributes={setAttributes} />;
            }
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
                                                <button type="button" onClick={() => postUp(page)} className="components-button has-icon" aria-label="Close Settings">
                                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="components-panel__arrow" aria-hidden="true" focusable="false"><path d="M6.5 12.4L12 8l5.5 4.4-.9 1.2L12 10l-4.5 3.6-1-1.2z"></path></svg>
                                                </button>

                                                <button type="button" onClick={() => postDown(page)} className="components-button has-icon" aria-label="Close Settings">
                                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="components-panel__arrow" aria-hidden="true" focusable="false"><path d="M17.5 11.6L12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z"></path></svg>
                                                </button>

                                                <button type="button" onClick={() => removePosts(page)} className="components-button has-icon" aria-label="Close Settings">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d="M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"></path></svg>
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
							onChange={ (searchQuery) => { searchPosts(searchQuery) } }
							style={{marginTop: '16px'}}
						/>

						{foundPosts.length > 0 &&
						<>
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
						</>}
                    </PanelBody>

                    <PanelBody title={ __( 'Display' ) } initialOpen={ false } >
                        <ToggleControl
                            label="Featured Images"
                            help={
                                featuredImage
                                    ? 'Display featured images.'
                                    : 'Hide Featured Images.'
                            }
                            checked={ featuredImage }
                            onChange={ () => {
                                setShowFeatured(!featuredImage)
                            }}
                        />
                        <SelectControl
                            label="Layout Type"
                            value={ displayType }
                            options={ [
                                { label: 'Main stage', value: 'main' },
                                { label: 'List', value: 'list' },
                            ] }
                            onChange={ ( type ) => setAttributes({displayType: type}) }
                        />
                    </PanelBody>
                </InspectorControls>

				<div className="mcb-hero-block">
					{ switchBlockType( displayType ) }
				</div>
            </>
        )
      },
      save: () => {
        return;
      }
});