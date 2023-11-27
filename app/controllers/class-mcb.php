<?php
/**
 * Class to generate posts from JSON.
 *
 * @package barista
 */

namespace mcb\controllers;

use mcb\controllers\blocks\WhiteHouse_Hero_Block;

if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Master Controller.
 */
class MCB {

	/**
	 * Add Hooks.
	 */
	public function __construct() {
		$this->enqueue_block();
	}

	/**
	 * Registers all bartender json files.
	 *
	 * @return void
	 */
	public function enqueue_block(): void {
		new WhiteHouse_Hero_Block();
	}
}
