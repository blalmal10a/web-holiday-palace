<script setup lang="ts">
	definePageMeta({
		layout: "main-layout",
		pageTitle: "Home",
	})
	const userStore = useUserStore()
	userStore.getUsers({}, useToast())
</script>
<template>
	<div class="">
		<UTable :data="userStore.data.data" :columns="userColumns" />
	</div>
</template>
