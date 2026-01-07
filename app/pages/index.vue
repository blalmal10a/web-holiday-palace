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
		<UTable
			:data="userStore.data.data"
			:columns="userColumns"
			@update:pagination="
				(e) => {
					console.log(e)
				}
			"
			@select="
				(val, {original}) => {
					userStore.form = {
						...original,
						password: '',
						password_confirmation: '',
						roles: undefined,
					}
					useRouter().push({
						name: 'hotels-users-id-form',
						params: {
							id: original.id,
						},
					})
				}
			"
		/>
	</div>
</template>
