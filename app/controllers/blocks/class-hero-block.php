<?php
/**
 * Class to generate posts from JSON.
 *
 * @package mcb
 */

namespace mcb\controllers\blocks;

use mcb\services\blocks\Hero_Block as Hero_Block_Service;

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

		add_action( 'rest_api_init', array( $this, 'rest_endpoint' ) );
	}

	/**
	 * Enqueue the assets for the cta block.
	 */
	public function enqueue_block_editor_assets(): void {

		// Get the theme version.
		$plugin_version = mcb_get_plugin_data();

		// Style Enqueue
		\wp_enqueue_block_style(
			'mcb/hero',
			array(
				'handle' => 'mcb-hero-css',
				'src'    => MCB_BLOCKS_PLUGIN_DIR . 'assets/dist/css/blocks/hero-block/editor.min.css',
				'ver'    => $plugin_version,
			)
		);

		// JSX Enqueue
		\wp_enqueue_script(
			'mcb-gutenberg-js',
			MCB_BLOCKS_PLUGIN_DIR . 'assets/dist/jsx/hero-block.min.js',
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

	/**
	 * Rest endpoint
	 *
	 * @return void
	 */
	public function rest_endpoint() {
		register_rest_route(
			'mcb/query',
			'/search',
			array(
				'methods'             => 'GET',
				'callback'            => array( new Hero_Block_Service(), 'search_endpoint' ),
				'permission_callback' => '__return_true',
			)
		);
	}
}

