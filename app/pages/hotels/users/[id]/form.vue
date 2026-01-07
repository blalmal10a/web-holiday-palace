<script lang="ts" setup>
	definePageMeta({
		layout: "main-layout",
		pageTitle: "Users",
		ancestors: [],
	})
	const userStore = useUserStore()
	onMounted(() => {
		if (!userStore.form.id && useRoute().params.id != "add") {
			userStore.getDetail()
		}
	})
</script>
<template>
	<div>
		<FormsUserForm />
	</div>
</template>

<style></style>
