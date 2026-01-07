<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui"

const route = useRoute()
const toast = useToast()

const open = ref(false)

const links = computed(() => [
	[
		{
			label: "Home",
			icon: "i-lucide-house",
			to: {
				name: 'index'
			},
			onSelect: () => {
				open.value = false
			},
			active: useRoute().name === 'index' || useRoute().name === 'hotels-users-id-form',
		},
		{
			label: "Rooms",
			icon: "i-lucide-bed",
			to: {
				name: 'hotels-rooms'
			},
			onSelect: () => {
				open.value = false
			},
			active: useRoute().name === 'hotels-rooms-id-form' || useRoute().name === 'hotels-rooms',

		},
		{
			label: "Menu",
			icon: "i-lucide-utensils",
			to: {
				name: 'hotels-menu-items'
			},
			onSelect: () => {
				open.value = false
			},
			active: useRoute().name === 'hotels-menu-items-id-form' || useRoute().name === 'hotels-menu-items',

		},
		{
			label: "Expenditure",
			icon: "i-lucide-indian-rupee",
			to: {
				name: 'hotels-expenditures'
			},
			onSelect: () => {
				open.value = false
			},
			active: useRoute().name === 'hotels-expenditures-id-form' || useRoute().name === 'hotels-expenditures',

		},
	],
	[
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
])
onMounted(async () => {

})
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
				:ui="{ footer: 'lg:border-t lg:border-default' }"
			>
				<template #header="{ collapsed }">
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
								'mr-6': !collapsed
							}"
						/>
						<h3
							v-if="!collapsed"
							class="text-lg font-bold"
							style="font-family: 'Brush Script MT', cursive;"
						>HOLIDAY PALACE</h3>
					</NuxtLink>
				</template>
				<template #default="{ collapsed }">
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
				<template #footer="{ collapsed }">
					<MainUserMenu :collapsed="collapsed" />
				</template>
			</UDashboardSidebar>

			<UDashboardPanel
				id="home"
				:ui="{ body: '' }"
			>
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
