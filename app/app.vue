<script setup lang="ts">
import z from 'zod';

z.config({
	customError: (iss) => {
		if (iss.input === undefined) {
			return 'Field is required';
		}
	}
})
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
<style>
html {
	scrollbar-gutter: stable;
}
</style>