<script setup lang="ts">

useHead({
	title: "HOLIDAY PALACE",
})
</script>
<template>
	<NuxtLoadingIndicator />
	<UApp>
		<NuxtLayout>
			<NuxtPage />
			<MainConfirmDeleteDialog />
		</NuxtLayout>
	</UApp>
</template>
