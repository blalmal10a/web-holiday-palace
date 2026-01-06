<script setup lang="ts">
	import type {NavigationMenuItem} from "@nuxt/ui"

	const route = useRoute()
	const toast = useToast()

	const open = ref(false)
	const links = [
		[
			{
				label: "Home",
				icon: "i-lucide-house",
				to: "/",
				onSelect: () => {
					open.value = false
				},
			},
		],
		[
			{
				label: "Forms",
				icon: "i-lucide-clipboard-list",
				defaultOpen: true,
				onSelect: () => {
					open.value = false
				},
				children: [
		
				],
			},
		],
	] satisfies NavigationMenuItem[][]
	onMounted(async () => {

	})
</script>

<template>
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
					<Logo class="w-16 dark:text-white text-black" />
					<h3 v-if="!collapsed" class="text-3xl">HOLIDAY PALACE</h3>
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
</template>
