<script setup lang="ts">
	const store = useMenuItemStore()
	const model = useMenuItem()
	store.setPagination({
		page: Number(useRoute().query.page) || 1,
		pageSize: Number(useRoute().query.pageSize) || 10,
	})
	model.fetchData()
</script>
<template>
	<div class="">
		<div class="flex justify-between px-3">
			<div class="text-xl"></div>
			<div>
				<u-button
					:to="{
						name: 'hotels-menu-items-id-form',
						params: {
							id: 'add',
						},
					}"
					icon="i-lucide-plus"
					size="sm"
					variant="soft"
					color="info"
				>
					Add expense
				</u-button>
			</div>
		</div>
		<UTable :data="store.data.data" :columns="menuItemColumns">
			<template #actions-cell="{row}">
				<div class="flex space-x-2 justify-end">
					<u-button
						variant="outline"
						size="sm"
						color="neutral"
						@click="
							() => {
								useMenuItemStore().setForm(row.original)
								useRouter().push({
									name: 'hotels-menu-items-id-form',
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
						variant="outline"
						size="sm"
						color="error"
						icon="i-lucide-trash"
						@click="
							useConfirmDeleteStore().open(
								row.original.name,
								'/menu-items',
								row.original.id,
								'MenuItem',
								useMenuItemStore(),
							)
						"
					>
						<!-- @click="menuItem.deleteMenuItem(row.original.id)" -->
					</u-button>
				</div>
			</template>
		</UTable>
		<div class="flex justify-end border-t border-default pt-4 px-4">
			<USelect
				v-if="store.data.total > 1"
				v-model="store.pagination.pageSize"
				:items="[10, 15, 50, 100]"
				@update:model-value="($event: number) => {
					store.setPagination({
						page: store.pagination.page,
						pageSize: $event,
					})
					model.fetchData();
					useRouter().push({
						name: 'menu-items',
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
				@update:page="
					;async ($event: number) => {
						store.pagination.page = $event
						model.fetchData()
						useRouter().push({
							name: 'hotels-menu-items',
							query: {
								page: $event,
								pageSize: store.pagination.pageSize,
							},
						})
					}
				"
			/>
		</div>
	</div>
</template>
