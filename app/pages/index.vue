<script setup lang="ts">
/**
 * Holiday Palace Landing Page
 * Features: Nuxt UI Carousel, Room Showcase, Restaurant Menu, and Contact Section.
 */

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
const rooms = [
	{
		name: 'Presidential Suite',
		price: '$850',
		description: 'Breathtaking ocean views with a private terrace and personal butler service.',
		features: ['King Bed', 'Ocean View', 'Private Pool'],
		image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800'
	},
	{
		name: 'Executive Deluxe',
		price: '$420',
		description: 'Modern elegance meeting comfort, perfect for business or leisure travelers.',
		features: ['Queen Bed', 'City View', 'Work Station'],
		image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=800'
	},
	{
		name: 'Family Sanctuary',
		price: '$550',
		description: 'Spacious interconnected rooms designed for ultimate family bonding.',
		features: ['2 Bedrooms', 'Garden View', 'Kitchenette'],
		image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800'
	}
]

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
		<header
			class="fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 dark:bg-neutral-900/70 border-b border-neutral-200 dark:border-neutral-800"
		>
			<nav class="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
				<div class="flex items-center gap-2">
					<UIcon
						name="i-lucide-palmtree"
						class="w-8 h-8 text-primary-600"
					/>
					<span class="text-2xl font-serif font-bold tracking-tight">Holiday Palace</span>
				</div>

				<div class="hidden md:flex items-center gap-8">
					<UButton
						variant="ghost"
						color="neutral"
						label="Rooms"
						to="#rooms"
					/>
					<UButton
						variant="ghost"
						color="neutral"
						label="Dining"
						to="#dining"
					/>
					<UButton
						variant="ghost"
						color="neutral"
						label="Contact"
						to="#contact"
					/>
					<UButton
						color="primary"
						label="Book Now"
						size="lg"
					/>
				</div>

				<UButton
					icon="i-heroicons-bars-3"
					variant="ghost"
					class="md:hidden"
				/>
			</nav>
		</header>

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

		<!-- Hotel Rooms Section -->
		<section
			id="rooms"
			class="py-24 max-w-7xl mx-auto px-4"
		>
			<div class="text-center mb-16 space-y-4">
				<h2 class="text-4xl font-serif font-bold text-neutral-900 dark:text-white">World-Class Accommodations
				</h2>
				<p class="text-neutral-500 max-w-2xl mx-auto italic text-lg">Every room is a masterpiece of design and
					comfort.</p>
			</div>

			<div class="grid md:grid-cols-3 gap-8">
				<UCard
					v-for="room in rooms"
					:key="room.name"
					class="overflow-hidden group border-none shadow-xl hover:shadow-2xl transition-all duration-300 ring-1 ring-neutral-200 dark:ring-neutral-800"
				>
					<div class="relative overflow-hidden aspect-[4/3]">
						<NuxtImg
							:src="room.image"
							class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
							alt="Room image"
						/>
						<div
							class="absolute top-4 right-4 bg-white/90 dark:bg-neutral-900/90 px-3 py-1 rounded-full text-sm font-bold shadow-sm">
							From {{ room.price }} / Night
						</div>
					</div>

					<div class="p-6 space-y-3">
						<h3 class="text-xl font-bold">{{ room.name }}</h3>
						<p class="text-sm text-neutral-500 leading-relaxed">{{ room.description }}</p>
						<div class="flex flex-wrap gap-2 pt-2">
							<UBadge
								v-for="feat in room.features"
								:key="feat"
								variant="subtle"
								color="neutral"
								size="sm"
							>
								{{ feat }}
							</UBadge>
						</div>
					</div>

					<template #footer>
						<UButton
							block
							label="Check Availability"
							trailing-icon="i-heroicons-arrow-right"
						/>
					</template>
				</UCard>
			</div>
		</section>

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
					<div class="flex items-center gap-2">
						<UIcon
							name="i-lucide-palmtree"
							class="w-8 h-8 text-primary-500"
						/>
						<span class="text-2xl font-serif font-bold">Holiday Palace</span>
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

	</div>
</template>

<style scoped>
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