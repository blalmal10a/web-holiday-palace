<script setup lang="ts">
	import type {NavigationMenuItem} from "@nuxt/ui"

	const route = useRoute()
	const toast = useToast()

	const open = ref(false)

	const links = computed(() => [
		[
			{
				label: "Calendar",
				icon: "i-lucide-calendar",
				to: {
					name: "hotels-calendar",
				},
				onSelect: () => {
					open.value = false
				},
				active:
					useRoute().name === "hotels-calendar-id-form" ||
					useRoute().name === "hotels-calendar",
			},
			{
				label: "Dorm",
				icon: "i-lucide-brick-wall",
				to: {
					name: "hotels-dorm",
				},
				onSelect: () => {
					open.value = false
				},
				active: useRoute().name === "hotels-dorm",
			},
			{
				label: "Expenditure",
				icon: "i-lucide-indian-rupee",
				to: {
					name: "hotels-expenditures",
				},
				onSelect: () => {
					open.value = false
				},
				active:
					useRoute().name === "hotels-expenditures-id-form" ||
					useRoute().name === "hotels-expenditures",
			},
			// {
			// 	label: "Forms",
			// 	icon: "i-lucide-clipboard-list",
			// 	defaultOpen: true,
			// 	onSelect: () => {
			// 		open.value = false
			// 	},
			// 	children: [
			// 	],
			// },
		],
		[
			{
				label: "Users",
				icon: "i-lucide-user",
				to: {
					name: "hotels-users",
				},
				onSelect: () => {
					open.value = false
				},
				active:
					useRoute().name === "hotels-users" ||
					useRoute().name === "hotels-users-id-form",
			},
			{
				label: "Rooms",
				icon: "i-lucide-bed",
				to: {
					name: "hotels-rooms",
				},
				onSelect: () => {
					open.value = false
				},
				active:
					useRoute().name === "hotels-rooms-id-form" ||
					useRoute().name === "hotels-rooms",
			},
			{
				label: "Menu",
				icon: "i-lucide-utensils",
				to: {
					name: "hotels-menu-items",
				},
				onSelect: () => {
					open.value = false
				},
				active:
					useRoute().name === "hotels-menu-items-id-form" ||
					useRoute().name === "hotels-menu-items",
			},

			{
				label: "Bookings",
				icon: "i-lucide-list-todo",
				to: {
					name: "hotels-bookings",
				},
				onSelect: () => {
					open.value = false
				},
				active:
					useRoute().name === "hotels-bookings-id-form" ||
					useRoute().name === "hotels-bookings",
			},
			{
				label: "Amenities",
				icon: "i-lucide-list-todo",
				to: {
					name: "hotels-amenities",
				},
				onSelect: () => {
					open.value = false
				},
				active:
					useRoute().name === "hotels-amenities-id-form" ||
					useRoute().name === "hotels-amenities",
			},
			{
				label: "Home",
				icon: "i-lucide-house",
				to: {
					name: "index",
				},
				onSelect: () => {
					open.value = false
				},
			},
		],
	])
	onMounted(async () => {})
</script>

<template>
	<ClientOnly>
		<UDashboardGroup unit="rem">
			<UDashboardSidebar
				id="default"
				v-model:open="open"
				collapsible
				resizable
				class="bg-elevated/25"
				:ui="{footer: 'lg:border-t lg:border-default'}"
			>
				<template #header="{collapsed}">
					<NuxtLink
						class="flex w-full items-center"
						:class="{
							'justify-center': collapsed,
						}"
						to="/"
					>
						<UIcon
							name="i-lucide-chess-queen"
							class="w-12 h-12 text-red-200"
							:class="{
								'mr-6': !collapsed,
							}"
						/>
						<h3
							v-if="!collapsed"
							class="text-lg font-bold"
							style="
								font-family:
									Brush Script MT,
									cursive;
							"
						>
							HOLIDAY PALACE
						</h3>
					</NuxtLink>
				</template>
				<template #default="{collapsed}">
					<UNavigationMenu
						:collapsed="collapsed"
						:items="links[0]"
						orientation="vertical"
						tooltip
						popover
					/>

					<UNavigationMenu
						:collapsed="collapsed"
						:items="links[1]"
						orientation="vertical"
						tooltip
						class="mt-auto"
					/>
				</template>
				<template #footer="{collapsed}">
					<MainUserMenu :collapsed="collapsed" />
				</template>
			</UDashboardSidebar>

			<UDashboardPanel id="home" :ui="{body: ''}">
				<template #header>
					<UDashboardNavbar :title="`${useRoute().meta.pageTitle ?? ''}`">
						<template #leading>
							<UDashboardSidebarCollapse />
						</template>
					</UDashboardNavbar>
				</template>

				<template #body>
					<slot />
				</template>
			</UDashboardPanel>
		</UDashboardGroup>
	</ClientOnly>
</template>
