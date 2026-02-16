<script setup lang="ts">
import { uuidv7 } from 'uuidv7';

/**
 * Holiday Palace Landing Page
 * Features: Nuxt UI Carousel, Room Showcase, Restaurant Menu, and Contact Section.
 */
const room = useRoom();
const roomStore = useRoomStore();
const calendarStore = useCalendarStore();
await room.fetchData();
// const menuItem = useMenuItem();
// const menuItemStore = useMenuItemStore();
// await menuItem.fetchData();
// HERO SLIDESHOW DATA


// HOTEL ROOMS DATA


// RESTAURANT MENU DATA

</script>

<template>
	<div class="min-h-screen bg-neutral-50 dark:bg-neutral-950 font-sans selection:bg-primary-500/30">

		<!-- Navigation -->
		<WebsiteHeader />

		<!-- Hero Slideshow -->
		<WebsiteHeroSlideshow />

		<WebsiteRoom :rooms="roomStore.data.data" />

		<!-- Dining Section (The Palace Kitchen) -->
		<WebsiteFoodMenu />

		<!-- Footer / Contact -->
		<footer
			id="contact"
			class="bg-neutral-900 text-white pt-20 pb-10"
		>
			<div class="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12 mb-16">
				<div class="space-y-6">
					<div class="flex items-center gap-2 ">
						<!-- <UIcon
							name="i-lucide-palmtree"
							class="w-8 h-8 text-primary-500"
						/> -->
						<span class="text-2xl font-serif font-bold">Paradise</span>
					</div>
					<p class="text-neutral-400 text-sm leading-relaxed">
						Located in the heart of the Amalfi Coast, offering unparalleled luxury since 1924.
					</p>
				</div>

				<div>
					<h4 class="font-bold mb-6">Explore</h4>
					<ul class="space-y-4 text-neutral-400 text-sm">
						<!-- <li class="hover:text-primary-400 transition-colors"><a href="#">Spa & Wellness</a></li>
						<li class="hover:text-primary-400 transition-colors"><a href="#">Events & Weddings</a></li>
						<li class="hover:text-primary-400 transition-colors"><a href="#">Local Attractions</a></li>
						<li class="hover:text-primary-400 transition-colors"><a href="#">Membership</a></li> -->
						<li class="hover:text-primary-400 transition-colors"><a href="/hotels/calendar">Admin</a></li>
					</ul>
				</div>

				<div>
					<h4 class="font-bold mb-6">Contact</h4>
					<ul class="space-y-4 text-neutral-400 text-sm">
						<li class="flex items-center gap-3">
							<UIcon
								name="i-heroicons-map-pin"
								class="text-primary-500"
							/>
							Sihhmui, Sairang
						</li>
						<li class="flex items-center gap-3">
							<UIcon
								name="i-heroicons-phone"
								class="text-primary-500"
							/>
							+91 94361 54813/ +91 88373 82366
						</li>
						<li class="flex items-center gap-3">
							<UIcon
								name="i-heroicons-envelope"
								class="text-primary-500"
							/>
							rinpuii@gmail.com
						</li>
					</ul>
				</div>

				<!-- <div>
					<h4 class="font-bold mb-6">Newsletter</h4>
					<div class="flex gap-2">
						<UInput
							placeholder="Email Address"
							class="flex-1"
						/>
						<UButton
							color="primary"
							icon="i-heroicons-paper-airplane"
						/>
					</div>
					<p class="text-[10px] text-neutral-500 mt-4 uppercase tracking-widest font-bold">Join the palace
						circle</p>
				</div> -->
			</div>

			<div
				class="max-w-7xl mx-auto px-4 border-t border-neutral-800 pt-8 flex flex-col md:row justify-between items-center text-neutral-500 text-xs gap-4">
				<p>© {{ new Date().getFullYear() }} Holiday Palace Hotel. All rights reserved.</p>
				<div class="flex gap-6">
					<a
						href="#"
						class="hover:text-white"
					>Privacy Policy</a>
					<a
						href="#"
						class="hover:text-white"
					>Terms of Service</a>
				</div>
			</div>
		</footer>
		<UModal
			v-model:open="calendarStore.showWebsiteCalendar"
			fullscreen
		>
			<template #title>
				Book a room
			</template>
			<template #description></template>
			<template #body>
				<BookingsCalendar />
			</template>
		</UModal>
		<WebsiteBookingSummary />
	</div>
</template>

<style>
/* Custom Serif Font handling (Optional: if you want a specific feeling) */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

.font-serif {
	font-family: 'Playfair Display', serif;
}

/* Smooth Scrolling */
html {
	scroll-behavior: smooth;
}
</style>