<?php
/**
 * Class to generate posts from JSON.
 *
 * @package barista
 */

namespace mcb\controllers\blocks;

if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Class to generate posts from JSON.
 */
class WhiteHouse_Hero_Block {

	/**
	 * Add Hooks.
	 */
	public function __construct() {
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_block_editor_assets' ), 20, 2 );
	}

	/**
	 * Enqueue the assets for the cta block.
	 */
	public function enqueue_block_editor_assets(): void {

		// Get the theme version.
		$plugin_version = mcb_get_plugin_data();

		// Style Enqueue
		\wp_enqueue_block_style(
			'mcb-blocks-css',
			MCB_BLOCKS_PLUGIN_DIR . '/assets/dist/css/blocks/editor/cta-block.min.css',
			array(),
			$plugin_version
		);

		// JSX Enqueue
		\wp_enqueue_script(
			'mcb-gutenberg-js',
			MCB_BLOCKS_PLUGIN_DIR . '/assets/dist/jsx/cta-block.min.js',
			array(
				'wp-blocks',
				'wp-i18n',
				'wp-element',
				'wp-components',
				'wp-editor',
				'wp-data',
				'wp-compose',
			),
			$plugin_version
		);

		// .
		wp_localize_script(
			'mcb-gutenberg-js',
			'blockData',
			array(
				'url'        => get_site_url(),
				'post_types' => mcb_searchable_post_types(),
			)
		);
	}
}

