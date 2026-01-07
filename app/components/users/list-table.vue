<script setup lang="ts">
const store = useUserStore()
const model = useUser();

store.setPagination({
	page: Number(useRoute().query.page) || 1,
	pageSize: Number(useRoute().query.pageSize) || 10,
	staff_only: false,
})
model.fetchData();

</script>
<template>
	<div class="">
		<UTable
			:loading="store.loadingGetUsers"
			:data="store.data.data"
			:columns="userColumns"
			@update:pagination="
				(e) => {
					console.log(e)
				}
			"
		>
			<template #actions-cell="{ row }">
				<div class="flex space-x-2 justify-end">
					<u-button
						variant="outline"
						size="sm"
						color="neutral"
						@click="
							() => {
								useUserStore().setForm(row.original);
								useRouter().push({
									name: 'hotels-users-id-form',
									params: {
										id: row.original.id,
									},
								})
							}
						"
						icon="i-lucide-edit"
					>
					</u-button>
					<u-button
						:disabled="row.original.id === useAuth().user?.id"
						variant="outline"
						size="sm"
						color="error"
						icon="i-lucide-trash"
						@click="useConfirmDeleteStore().open(row.original.name, '/users', row.original.id, 'User', useUserStore())"
					>
						<!-- @click="user.deleteUser(row.original.id)" -->
					</u-button>
				</div>
			</template>
		</UTable>
		<div class="flex justify-end border-t border-default pt-4 px-4 space-x-2">
			<USelect
				v-if="store.data.total > 1"
				v-model="store.pagination.pageSize"
				:items="[10, 15, 50, 100]"
				@update:model-value="($event) => {
					store.setPagination({
						...store.pagination,
						pageSize: $event,
					})
					model.fetchData();
					useRouter().push({
						name: 'index',
						query: {
							page: store.pagination.page,
							pageSize: $event,
						}
					})
				}"
			>

			</USelect>

			<UPagination
				v-if="store.data.total > store.pagination.pageSize"
				:page="store.pagination.page"
				:items-per-page="store.pagination.pageSize"
				:total="store.data.total"
				@update:page="async ($event) => {
					store.pagination.page = $event;
					model.fetchData();
					useRouter().push({
						name: 'index',
						query: {
							page: $event,
							pageSize: store.pagination.pageSize,
						}
					})
				}"
			/>
		</div>
	</div>
</template>