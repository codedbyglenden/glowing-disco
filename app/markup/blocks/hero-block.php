<?php
/**
 * Render the hero block.
 *
 * @package mcb
 */

$saved_posts = $attributes['savedPosts'] ?? array();

if ( empty( $saved_posts ) ) {
	return;
}

$featured = $attributes['savedPosts'][0];

$featured_image = $attributes['mediaId'] > 0 ? wp_get_attachment_image_src( $attributes['mediaId'], 'large' )[0] : $featured['thumbnail'];
?>

<section class="mcb-hero-block alignfull">
	<article class="mcb-hero-block--featured">
		<div class="stickyImage">
			<?php if ( ! empty( $featured_image ) ) : ?>
				<img
					src="<?php echo esc_url( $featured_image ); ?>"
					alt="<?php echo esc_attr( $featured['title'] ); ?>"
				/>
			<?php endif; ?>
		</div>
		<header>
			<h1><?php esc_html_e( $featured['title'] ); ?></h1>
		</header>
	</article>

	<aside class="mcb-hero-block--aside">

		<?php if ( $attributes['listHeadingLink']['url'] ) : ?>
			<h2 class="aside-heading is-roboto is-uppercase" id="sidebar-heading">
				<a href="<?php echo esc_url( $attributes['listHeadingLink']['url'] ); ?>" class="link"><?php esc_html_e( $attributes['listHeadingLink']['text'] ) ?></a>
			</h2>
		<?php endif; ?>

		<div class="mcb-hero-block--list" role="group" aria-labelledby="sidebar-heading">

			<?php
				foreach ( $saved_posts as $key => $saved_post ) {

					printf(
						'<article class="faux-link--element">
							<a href="%1$s" class="faux-link" title="visit article: %2$s"></a>
							<time class="posted-on entry-date published updated" datetime="%3$s">%3$s</time>
							<div class="title-container">
								<h3 class="title">
									%2$s
								</h3>
							</div>
						</article>',
						esc_url( get_the_permalink( $saved_post['id'] ) ),
						esc_attr( $saved_post['title'] ),
						esc_attr( $saved_post['date'] )
					);
				}
			?>

		<?php
			if ( $attributes['viewAllLink']['url'] ) :
				printf(
					'<div class="is-block">
						<a class="view-all link is-inline-block" href="%1$s">%2$s</a>
					</div>',
					esc_url( $attributes['viewAllLink']['url'] ),
					$attributes['viewAllLink']['text'] ? esc_html( $attributes['viewAllLink']['text'] ) : 'View All'
				);
			endif;
		?>
		</div>
	</aside>
</section>
