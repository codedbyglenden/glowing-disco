<?php
/**
 * Plugin Name:       My Custom Blocks plugin
 * Plugin URI:        https://github.com/codedbyglenden/my-custom-blocks
 * Description:       A custom blocks plugin to show off what I can do.
 * Version:           1.0.0
 * Requires at least: 6.0
 * Requires PHP:      8.2
 * Author:            James Glendenning
 * Author URI:        https://github.com/codedbyglenden/my-custom-blocks
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       mcb
 * Domain Path:       /languages
 *
 * @package mcb
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

define( 'MCB_BLOCKS_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'MCB_BLOCKS_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );

/**
 * Require the main helper class.
 */
require_once __DIR__ . '/vendor/autoload.php';

/**
 * Get the plugin data.
 *
 * @param string $name The key for the data to return about the plugin.
 *
 * @author James Glendenning
 *
 * @return string The plugin version
 */
function mcb_get_plugin_data( string $name = 'Version' ): string {

	$data = get_plugin_data( MCB_BLOCKS_PLUGIN_DIR, false, false );

	return $data[ $name ] ?? '';
}

/**
 * Returns an array of allowed cpts to search.
 */
function mcb_searchable_post_types() {
	return array(
		'post',
		'page',
	);
}

new mcb\controllers\MCB();
