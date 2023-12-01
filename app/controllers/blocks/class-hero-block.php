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
	 * The hero block service.
	 *
	 * @var Hero_Block_Service
	 */
	protected Hero_Block_Service $service;

	/**
	 * Add Hooks.
	 */
	public function __construct() {

		$this->service = new Hero_Block_Service();

		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_block_editor_assets' ), 20, 2 );
		add_action( 'rest_api_init', array( $this, 'rest_endpoint' ) );
		add_filter( 'render_block', array( $this->service, 'render_block' ), 10, 2 );
		add_action( 'after_setup_theme', array( $this, 'enqueue_frontend_assets' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_fonts' ) );

		add_filter( 'block_categories_all', array( $this, 'add_block_category' ) );
	}

	/**
	 * Adds my custom block category.
	 */
	public function add_block_category( $categories ): array {

		$categories[] = array(
			'slug'  => 'codedbyglenden',
			'title' => 'CodedByGlenden Blocks',
		);

		return $categories;
	}

	/**
	 * Add fonts.
	 */
	public function enqueue_fonts(): void {
		\wp_enqueue_style( 'google-fonts', 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Roboto:wght@500&display=swap', false );
	}

	/**
	 * Enqueue
	 */
	public function enqueue_frontend_assets() {

		\wp_enqueue_block_style(
			'mcb/hero',
			array(
				'handle' => 'mcb-hero-front-end-css',
				'src'    => MCB_BLOCKS_PLUGIN_URL . 'assets/dist/css/blocks/hero-block/front-end/index.min.css',
				'ver'    => '1.0.0',
			)
		);
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
				'src'    => MCB_BLOCKS_PLUGIN_URL . 'assets/dist/css/blocks/hero-block/editor/index.min.css',
				'ver'    => $plugin_version,
			)
		);

		// JSX Enqueue
		\wp_enqueue_script(
			'mcb-gutenberg-js',
			MCB_BLOCKS_PLUGIN_URL . 'assets/dist/jsx/hero-block.min.js',
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
				'callback'            => array( $this->service, 'search_endpoint' ),
				'permission_callback' => '__return_true',
			)
		);
	}
}

