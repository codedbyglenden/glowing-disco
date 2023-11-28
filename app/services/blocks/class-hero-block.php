<?php
/**
 * Runs the logic in between submitting data.
 *
 * @package mcb
 */

namespace mcb\services\blocks;

if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Generate post service.
 */
class Hero_Block {

	/**
	 * Search endpoint.
	 */
	public function search_endpoint( $request ): array {

		$search_query = $request->get_param( 'search' );
		$post_type    = $request->get_param( 'post_type' ) ?? 'post';

		if ( ! $search_query ) {
			return new \WP_Error( 'invalid_parameter', 'Please provide a search parameter.', array( 'status' => 400 ) );
		}

		$args = array(
			'post_type'      => $post_type,
			'post_status'    => 'publish',
			's'              => $search_query,
			'posts_per_page' => 12,
		);

		$search_results = get_posts( $args );

		foreach ( $search_results as $post ) {
			$excerpt = get_the_excerpt( $post->ID );
			$excerpt = $excerpt ? substr( get_the_excerpt( $post->ID ), 0, 350 ) . '...' : '';

			$thumbnail_url = get_the_post_thumbnail_url( $post->ID );

			$post_type = get_post_type_object( $post->post_type );

			$inx = array(
				'id'        => $post->ID,
				'title'     => $post->post_title,
				'excerpt'   => get_the_excerpt( $post->ID ),
				'thumbnail' => $thumbnail_url,
				'type'      => $post_type ? $post_type->labels->singular_name : '',
				'date'      => $this->format_post_date( $post->post_date ),
			);

			$data[] = $inx;
		}

		return $data;
	}

	/**
	 * Format the post date
	 *
	 * @var string The date to format.
	 *
	 * @return string Formatted post date.
	 */
	public function format_post_date( string $date ): string {
		return date( 'F j, Y', strtotime( $date ) );
	}
}
