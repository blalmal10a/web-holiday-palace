<script setup lang="ts">
import type { tabs } from '#build/ui'

const menuItem = useMenuItem()
const menuItemStore = useMenuItemStore()

menuItem.fetchMenuItemCategories()
menuItemStore.pagination.pageSize = 50
await menuItem.fetchData()
const placeholderImageLink = computed(() => {
	return "/assets/images/menu-item-placeholder.png"
})
// Category filter state
const selectedCategory = ref("all")

// Selected item for preview
const selectedItem = ref<MenuItem | null>(null)

// Modal state for mobile
const isModalOpen = ref(false)

// Compute category tabs from fetched data
const categoryTabs = computed(() => {
	const categories = new Set<string>()

	menuItemStore.data.data?.forEach((item) => {
		if (item.category) {
			categories.add(item.category)
		}
	})

	return [
		{ value: "all", label: "All Items" },
		...Array.from(categories).map((cat) => ({
			value: cat,
			label: cat,
		})),
	]
})

// Filter menu items by category
const filteredMenuItems = computed(() => {
	const items = menuItemStore.data.data || []

	if (selectedCategory.value === "all") {
		return items
	}

	return items.filter((item) => item.category === selectedCategory.value)
})

// Watch for category changes and select first item
watch(
	[selectedCategory, () => menuItemStore.data.data],
	() => {
		if (filteredMenuItems.value.length > 0) {
			selectedItem.value = filteredMenuItems.value[0]!
		} else {
			selectedItem.value = null
		}
	},
	{ immediate: true },
)

// Handle item selection
const selectItem = (item: MenuItem) => {
	selectedItem.value = item
	// Open modal on mobile
	if (window.innerWidth < 768) {
		isModalOpen.value = true
	}
}
</script>

<template>
	<section class="py-16 md:py-24 bg-neutral-100 dark:bg-neutral-900 transition-colors duration-300">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex flex-col gap-2">
				<!-- Header Section -->
				<div
					id="dining"
					class="space-y-4 max-w-3xl"
				>
					<span class="text-primary-600 font-bold uppercase tracking-[0.2em] text-xs">
						Fine Dining
					</span>
					<h2
						class="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-neutral-800 dark:text-neutral-100">
						The Palace Kitchen
					</h2>
				</div>
				<h3 class="text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300 px-1 pt-2 -mb-2">
					Menu Categories
				</h3>
				<!-- Menu Content: List + Preview -->
				<div class="grid md:grid-cols-2 gap-8 lg:gap-12">
					<div
						class="col-span-2 sticky bg-default z-10"
						style="top: 80px; overflow-x: auto; max-width: calc(100dvw - 35px);"
					>

						<UTabs
							variant="link"
							v-model="selectedCategory"
							:items="categoryTabs"
							:ui="{
								trigger: [
									'group relative inline-flex items-center min-w-auto data-[state=inactive]:text-muted hover:data-[state=inactive]:not-disabled:text-default font-medium rounded-md disabled:cursor-not-allowed disabled:opacity-75',
								],
							}"
						/>
					</div>
					<!-- Menu List (Left Side) -->
					<div class="space-y-4 md:pr-4 pl-1">
						<div
							v-for="item in filteredMenuItems"
							:key="item.name"
							@click="selectItem(item)"
							class="group cursor-pointer bg-white dark:bg-neutral-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border-2"
							:class="selectedItem?.name === item.name
								? 'border-primary-600 ring-2 ring-primary-200 dark:ring-primary-900'
								: 'border-transparent hover:border-neutral-200 dark:hover:border-neutral-700'
								"
						>
							<div class="flex gap-4 items-center">
								<div
									class="relative sm:w-10 h-10 shrink-0 overflow-hidden rounded-lg bg-neutral-200 dark:bg-neutral-700">
									<img
										v-if="item.images && item.images[0]"
										:src="item.images[0].url"
										:alt="item.name"
										class="w-full h-full object-cover"
									/>
									<img
										:src="placeholderImageLink"
										alt="Food placeholder"
										class="w-full h-full object-cover opacity-80"
									/>
								</div>

								<!-- Item Info -->
								<div class="flex-1 min-w-0 items-center h-full ">
									<div class="flex justify-between items-start gap-2 mb-1">
										<h3
											class="font-serif text-lg font-semibold text-neutral-800 dark:text-neutral-200 line-clamp-1">
											{{ item.name }}
										</h3>
										<span class="font-bold text-lg text-primary-600 whitespace-nowrap shrink-0">
											₹{{ item.rate }}
										</span>
									</div>
								</div>
							</div>
						</div>

						<!-- No results message -->
						<div
							v-if="filteredMenuItems.length === 0"
							class="text-center py-12"
						>
							<p class="text-neutral-500 text-sm sm:text-base">
								No menu items available for this category.
							</p>
						</div>
					</div>

					<!-- Preview Panel (Right Side - Hidden on Mobile) -->
					<div
						v-if="selectedItem"
						class="hidden md:block sticky top-42 h-fit"
					>
						<div class="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg overflow-hidden">
							<!-- Image Carousel -->
							<div class="relative w-full aspect-square bg-neutral-200 dark:bg-neutral-700">
								<UCarousel
									v-if="selectedItem.images && selectedItem.images.length > 0"
									:items="selectedItem.images"
									arrows
									:ui="{
										viewport: 'h-full',
										container: 'h-full',
										item: 'h-full',
									}"
									class="w-full h-full"
								>
									<template #default="{ item: image }">
										<div class="h-full w-full">
											<img
												:src="image.url"
												:alt="selectedItem.name"
												class="w-full h-full object-cover"
												draggable="false"
											/>
										</div>
									</template>
								</UCarousel>

								<img
									v-else
									:src="placeholderImageLink"
									alt="Food placeholder"
									class="w-full h-full object-cover opacity-80"
								/>

								<!-- Price Badge -->
								<div
									class="absolute top-4 right-4 bg-white/95 dark:bg-neutral-900/95 px-4 py-2 rounded-full shadow-lg">
									<span class="font-bold text-2xl text-primary-600">
										₹{{ selectedItem.rate }}
									</span>
								</div>
							</div>

							<!-- Details -->
							<div class="p-6 space-y-4">
								<div>
									<p
										v-if="selectedItem.category"
										class="text-xs text-primary-600 font-bold uppercase tracking-wider mb-2"
									>
										{{ selectedItem.category }}
									</p>
									<h3 class="text-2xl font-serif font-bold text-neutral-800 dark:text-neutral-200">
										{{ selectedItem.name }}
									</h3>
								</div>

								<p
									v-if="selectedItem.description"
									class="text-neutral-600 dark:text-neutral-400 leading-relaxed"
								>
									{{ selectedItem.description }}
								</p>

								<!-- <UButton
									label="Order Now"
									color="primary"
									size="lg"
									block
									trailing-icon="i-heroicons-shopping-cart"
									class="mt-6"
								/> -->
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
