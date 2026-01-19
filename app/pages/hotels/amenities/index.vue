<script setup lang="ts">
	definePageMeta({
		layout: "main-layout",
		pageTitle: "Menu",
	})
	const store = useMenuItemStore()
	const model = useMenuItem()
	store.pagination.only_accommodations = true
	onMounted(() => {})
	onBeforeUnmount(() => {
		store.pagination.only_accommodations = false
	})
</script>
<template>
	<AmenitiesListTable />
</template>
