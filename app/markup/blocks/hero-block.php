<?php
/**
 * Render the hero block.
 *
 * @package mcb
 */

// sb_dd( $attributes );

$override_image = $attributes['mediaId'] > 0 ? '' : '';

?>

<section class="mcb-hero-block alignfull">
	<article class="featured">
		<div class="stickyImage">
			<img
				src="<?php echo esc_url( $attributes['savedPosts'][0]['thumbnail'] ); ?>"
				alt=""
			/>
		</div>
		<header>
			<h1>Statement from President Joe<span class="dewidow">&nbsp;</span>Biden on the Hostage Release in<span class="dewidow">&nbsp;</span>Gaza</h1>
		</header>
	</article>

	<aside class="aside">
		<h2 class="aside-heading is-roboto is-uppercase" id="sidebar-heading">
			<a href="#link" class="link">Sidebar heading</a>
		</h2>
		<div class="mcb-hero-block-list" role="group" aria-labelledby="sidebar-heading">

			<!-- Require a list in a loop -->
			<article class="faux-link--element">
				<a href="#link-here" class="faux-link" title="visit article: The title of the post here."></a>
				<time class="posted-on entry-date published updated" datetime="2023-11-17T21:24:57-05:00">November 17, 2023</time>
				<div class="title-container">
					<h3 class="title">
						The title of the post here. sdfj f sjf jsd fjsd fjds fj dsf
					</h3>
				</div>
			</article>


			<article class="faux-link--element">
				<a href="#link-here" class="faux-link" title="visit article: The title of the post here."></a>
				<time class="posted-on entry-date published updated" datetime="2023-11-17T21:24:57-05:00">November 17, 2023</time>
				<div class="title-container">
					<h3 class="title">
						The title of the post here. sdfj f sjf jsd fjsd fjds fj dsf
					</h3>
				</div>
			</article>


			<article class="faux-link--element">
				<a href="#link-here" class="faux-link" title="visit article: The title of the post here."></a>
				<time class="posted-on entry-date published updated" datetime="2023-11-17T21:24:57-05:00">November 17, 2023</time>
				<div class="title-container">
					<h3 class="title">
						The title of the post here. sdfj f sjf jsd fjsd fjds fj dsf
					</h3>
				</div>
			</article>


			<article class="faux-link--element">
				<a href="#link-here" class="faux-link" title="visit article: The title of the post here."></a>
				<time class="posted-on entry-date published updated" datetime="2023-11-17T21:24:57-05:00">November 17, 2023</time>
				<div class="title-container">
					<h3 class="title">
						The title of the post here. sdfj f sjf jsd fjsd fjds fj dsf
					</h3>
				</div>
			</article>


			<article class="faux-link--element">
				<a href="#link-here" class="faux-link" title="visit article: The title of the post here."></a>
				<time class="posted-on entry-date published updated" datetime="2023-11-17T21:24:57-05:00">November 17, 2023</time>
				<div class="title-container">
					<h3 class="title">
						The title of the post here. sdfj f sjf jsd fjsd fjds fj dsf
					</h3>
				</div>
			</article>


			<article class="faux-link--element">
				<a href="#link-here" class="faux-link" title="visit article: The title of the post here."></a>
				<time class="posted-on entry-date published updated" datetime="2023-11-17T21:24:57-05:00">November 17, 2023</time>
				<div class="title-container">
					<h3 class="title">
						The title of the post here. sdfj f sjf jsd fjsd fjds fj dsf
					</h3>
				</div>
			</article>

			<article class="faux-link--element">
				<a href="#link-here" class="faux-link" title="visit article: The title of the post here."></a>
				<time class="posted-on entry-date published updated" datetime="2023-11-17T21:24:57-05:00">November 17, 2023</time>
				<div class="title-container">
					<h3 class="title">
						The title of the post here. sdfj f sjf jsd fjsd fjds fj dsf
					</h3>
				</div>
			</article>

			<article class="faux-link--element">
				<a href="#link-here" class="faux-link" title="visit article: The title of the post here."></a>
				<time class="posted-on entry-date published updated" datetime="2023-11-17T21:24:57-05:00">November 17, 2023</time>
				<div class="title-container">
					<h3 class="title">
						The title of the post here. sdfj f sjf jsd fjsd fjds fj dsf
					</h3>
				</div>
			</article>
		</div>

		<a class="view-all link" href="#view-all">View all</a>
	</aside>
</section>
