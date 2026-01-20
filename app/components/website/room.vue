<script setup lang="ts">
	const props = defineProps({
		rooms: {
			default: [] as Room[],
		},
	})

	watch(
		() => useRoute().fullPath,
		(value) => {
			useCalendarStore().showWebsiteCalendar = false
		},
	)

	const capacityFilter = ref("all")
	const acFilter = ref("all")

	const capacityTabs = [
		{value: "all", label: "All"},
		{value: "single", label: "Single"},
		{value: "double", label: "Double"},
		{value: "triple", label: "Triple"},
	]

	const acTabs = [
		{value: "all", label: "All"},
		{value: "ac", label: "AC"},
		{value: "non-ac", label: "Non-AC"},
	]

	const filteredRooms = computed(() => {
		return props.rooms.filter((room) => {
			let capacityMatch = false
			let acMatch = false
			if (acFilter.value == "all") {
				acMatch = true
			} else if (acFilter.value == "ac") {
				if (room.is_ac) acMatch = true
			} else if (acFilter.value == "non-ac") {
				if (!room.is_ac) acMatch = true
			}

			if (capacityFilter.value == "all") {
				capacityMatch = true
			} else if (capacityFilter.value == "single") {
				if (room.capacity == 1) capacityMatch = true
			} else if (capacityFilter.value === "double") {
				if (room.capacity == 2) capacityMatch = true
			} else if (capacityFilter.value == "triple") {
				if (room.capacity == 3) capacityMatch = true
			}
			if (capacityMatch && acMatch) {
				return true
			}
		})
	})
</script>
<template>
	<section
		id="rooms"
		class="py-12 sm:py-16 lg:py-24 max-w-7xl mx-auto px-2 sm:px-4"
	>
		<div class="text-center mb-8 sm:mb-12 lg:mb-16 space-y-2 sm:space-y-4">
			<h2
				class="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-neutral-900 dark:text-white"
			>
				World-Class Accommodations
			</h2>
			<p
				class="text-neutral-500 max-w-2xl mx-auto italic text-sm sm:text-base lg:text-lg px-4"
			>
				Every room is a masterpiece of design and comfort.
			</p>
		</div>

		<!-- Filters -->
		<div class="mb-6 sm:mb-8 grid md:grid-cols-2 md:gap-8 lg:gap-96">
			<div>
				<h3
					class="text-xs sm:text-sm font-medium mb-2 text-neutral-700 dark:text-neutral-300 px-1"
				>
					Room Capacity
				</h3>
				<UTabs v-model="capacityFilter" :items="capacityTabs" :ui="{}" />
			</div>
			<div>
				<h3
					class="text-xs sm:text-sm font-medium mb-2 text-neutral-700 dark:text-neutral-300 px-1"
				>
					Air Conditioning
				</h3>
				<UTabs v-model="acFilter" :items="acTabs" :ui="{}" />
			</div>
		</div>

		<!-- Rooms Grid -->
		<div
			class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 lg:gap-6"
		>
			<UCard
				v-for="room in filteredRooms"
				:key="room.number"
				class="overflow-hidden group border-none shadow-lg hover:shadow-xl transition-all duration-300 ring-1 ring-neutral-200 dark:ring-neutral-800 flex flex-col"
				:ui="{
					body: 'flex-1 p-0 sm:p-0',

					footer: 'p-2 md:p-3',
				}"
			>
				<div v-if="room.id" class="flex flex-col h-full">
					<div class="flex-1">
						<div class="relative overflow-hidden aspect-square">
							<NuxtImg
								v-if="room.images[0]"
								:src="room.images[0].url"
								class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
								alt="Room image"
							/>
							<NuxtImg
								v-if="!room.images[0]"
								src="/assets/images/hotel-room-placeholder.svg"
								class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
								alt="Room image"
							/>
							<div
								class="absolute top-2 right-2 bg-white/90 dark:bg-neutral-900/90 px-2 py-0.5 rounded-full text-xs sm:text-sm font-bold shadow-sm"
							>
								₹{{ room.rate }}
							</div>
						</div>

						<div class="p-2 lg:p-4 space-y-1.5 sm:space-y-2">
							<h3
								class="text-sm sm:text-base lg:text-lg font-bold line-clamp-2"
							>
								{{ room.description }}
							</h3>
							<div class="text-xs space-y-0.5">
								<p class="text-neutral-500">Room #{{ room.number }}</p>
								<p v-if="room.max_capacity" class="text-neutral-500">
									{{ room.capacity }}-{{ room.max_capacity }} guests
								</p>
								<p v-if="room.single_bed_count" class="text-neutral-500">
									Single bed: {{ room.single_bed_count }}
								</p>
								<p v-if="room.double_bed_count" class="text-neutral-500">
									Double bed: {{ room.double_bed_count }}
								</p>
							</div>
						</div>
					</div>
				</div>

				<template #footer>
					<UButton
						block
						@click="useCalendarStore().showWebsiteCalendar = true"
						label="Check Availability"
						trailing-icon="i-heroicons-arrow-right"
						size="xs"
						class="text-xs sm:text-sm"
					/>
				</template>
			</UCard>
		</div>

		<!-- No results message -->
		<div v-if="filteredRooms.length === 0" class="text-center py-12">
			<p class="text-neutral-500 text-sm sm:text-base">
				No rooms match your filters. Please try different options.
			</p>
		</div>
	</section>
</template>
