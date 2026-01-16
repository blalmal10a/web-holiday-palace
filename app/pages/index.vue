<script setup lang="ts">
import { uuidv7 } from 'uuidv7';

/**
 * Holiday Palace Landing Page
 * Features: Nuxt UI Carousel, Room Showcase, Restaurant Menu, and Contact Section.
 */
const room = useRoom();
const roomStore = useRoomStore();
await room.fetchData();
const menuItem = useMenuItem();
const menuItemStore = useMenuItemStore();
await menuItem.fetchData();
// HERO SLIDESHOW DATA
const carouselItems = [
	{
		title: 'Welcome to Paradise',
		description: 'Experience luxury redefined at Holiday Palace.',
		image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1920',
	},
	{
		title: 'Exquisite Dining',
		description: 'Savor world-class cuisine prepared by our master chefs.',
		image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1920',
	},
	{
		title: 'Relax & Rejuvenate',
		description: 'Discover serenity in our award-winning spa and pools.',
		image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=1920',
	}
]

// HOTEL ROOMS DATA


// RESTAURANT MENU DATA
const menuCategories = [
	{
		label: 'Starters',
		items: [
			{ name: 'Truffle Arancini', price: '$18', desc: 'Crispy risotto balls with truffle oil and parmesan.' },
			{ name: 'Seared Scallops', price: '$24', desc: 'Hokkaido scallops with pea puree and pancetta.' }
		]
	},
	{
		label: 'Main Course',
		items: [
			{ name: 'Wagyu Ribeye', price: '$65', desc: 'Grade A5 wagyu served with roasted bone marrow.' },
			{ name: 'Lobster Thermidor', price: '$58', desc: 'Atlantic lobster in a rich brandy cream sauce.' }
		]
	},
	{
		label: 'Desserts',
		items: [
			{ name: 'Gold Leaf Fondant', price: '$16', desc: 'Dark chocolate lava cake with edible 24k gold.' },
			{ name: 'Lemon Yuzu Tart', price: '$14', desc: 'Zesty yuzu curd with toasted swiss meringue.' }
		]
	}
]
</script>

<template>
	<div class="min-h-screen bg-neutral-50 dark:bg-neutral-950 font-sans selection:bg-primary-500/30">

		<!-- Navigation -->
		<WebsiteHeader />

		<!-- Hero Slideshow -->
		<section class="relative h-screen overflow-hidden">
			<UCarousel
				v-slot="{ item }"
				:items="carouselItems"
				:ui="{ item: 'basis-full' }"
				class="h-full"
				indicators
			>
				<div class="relative w-full h-screen">
					<NuxtImg
						:src="item.image"
						class="absolute inset-0 w-full h-full object-cover"
						alt="Hero Image"
						loading="lazy"
					/>
					<div class="absolute inset-0 bg-black/40 flex items-center justify-center text-center px-4">
						<div class="max-w-3xl space-y-6 animate-in fade-in zoom-in duration-700">
							<h1 class="text-5xl md:text-7xl font-serif text-white font-bold">{{ item.title }}</h1>
							<p class="text-xl md:text-2xl text-white/90 font-light">{{ item.description }}</p>
							<div class="flex justify-center gap-4 pt-4">
								<UButton
									size="xl"
									color="primary"
									label="Explore Suites"
									to="#rooms"
								/>
								<UButton
									size="xl"
									variant="outline"
									class="text-white border-white hover:bg-white/20"
									label="Virtual Tour"
								/>
							</div>
						</div>
					</div>
				</div>
			</UCarousel>
		</section>

		<WebsiteRoom :rooms="roomStore.data.data" />

		<!-- Dining Section (The Palace Kitchen) -->
		<section
			id="dining"
			class="py-24 bg-neutral-100 dark:bg-neutral-900"
		>
			<div class="max-w-7xl mx-auto px-4">
				<div class="flex flex-col lg:flex-row gap-16 items-center">
					<div class="lg:w-1/2 space-y-8">
						<div class="space-y-4">
							<span class="text-primary-600 font-bold uppercase tracking-widest text-sm">Fine
								Dining</span>
							<h2 class="text-4xl font-serif font-bold">The Palace Kitchen</h2>
							<p class="text-neutral-600 dark:text-neutral-400 text-lg">
								Embark on a culinary journey where every dish tells a story of tradition and innovation.
								Our Michelin-starred restaurant offers a curated menu of seasonal delights.
							</p>
						</div>

						<div class="space-y-6">
							<div
								v-for="cat in menuCategories"
								:key="cat.label"
							>
								<h4
									class="text-lg font-bold border-b border-primary-200 dark:border-primary-800 pb-2 mb-4">
									{{ cat.label }}
								</h4>
								<div class="space-y-4">
									<div
										v-for="item in cat.items"
										:key="item.name"
										class="flex justify-between items-start"
									>
										<div class="space-y-1">
											<p class="font-medium">{{ item.name }}</p>
											<p class="text-xs text-neutral-500 italic">{{ item.desc }}</p>
										</div>
										<span class="font-bold text-primary-600">{{ item.price }}</span>
									</div>
								</div>
							</div>
						</div>

						<UButton
							label="View Full Menu"
							variant="link"
							color="primary"
							class="p-0"
						/>
					</div>

					<div class="lg:w-1/2 grid grid-cols-2 gap-4">
						<NuxtImg
							src="https://images.unsplash.com/photo-1550966842-3ae52656348f?auto=format&fit=crop&w=600"
							class="rounded-2xl shadow-lg"
						/>
						<NuxtImg
							src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600"
							class="rounded-2xl shadow-lg mt-12"
						/>
					</div>
				</div>
			</div>
		</section>

		<!-- Footer / Contact -->
		<footer
			id="contact"
			class="bg-neutral-900 text-white pt-20 pb-10"
		>
			<div class="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12 mb-16">
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
						<li class="hover:text-primary-400 transition-colors"><a href="#">Spa & Wellness</a></li>
						<li class="hover:text-primary-400 transition-colors"><a href="#">Events & Weddings</a></li>
						<li class="hover:text-primary-400 transition-colors"><a href="#">Local Attractions</a></li>
						<li class="hover:text-primary-400 transition-colors"><a href="#">Membership</a></li>
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
							123 Royal Terrace, Amalfi, Italy
						</li>
						<li class="flex items-center gap-3">
							<UIcon
								name="i-heroicons-phone"
								class="text-primary-500"
							/>
							+39 089 123 4567
						</li>
						<li class="flex items-center gap-3">
							<UIcon
								name="i-heroicons-envelope"
								class="text-primary-500"
							/>
							reservations@holidaypalace.com
						</li>
					</ul>
				</div>

				<div>
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
				</div>
			</div>

			<div
				class="max-w-7xl mx-auto px-4 border-t border-neutral-800 pt-8 flex flex-col md:row justify-between items-center text-neutral-500 text-xs gap-4">
				<p>© {{ new Date().getFullYear() }} Holiday Palace Resort & Spa. All rights reserved.</p>
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
			v-model:open="useCalendarStore().showWebsiteCalendar"
			fullscreen
		>
			<template #body>
				<WebsiteCalendar />

			</template>
		</UModal>
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