<script setup lang="ts">
const store = useExpenditureStore()
const model = useExpenditure();
store.setPagination({
	page: Number(useRoute().query.page) || 1,
	pageSize: Number(useRoute().query.pageSize) || 10,
})
model.fetchData();
</script>
<template>
	<div class="">
		<div class="flex justify-between px-3">
			<div class="text-xl">

			</div>
			<div>
				<u-button
					:to="{
						name: 'hotels-expenditures-id-form',
						params: {
							id: 'add'
						}
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
		<UTable
			title="Expenditures"
			:data="store.data.data"
			:columns="expenditureColumns"
		>
			<!-- <template #actions-header>
				<div class="text-right">
					<u-button
						icon="i-lucide-plus"
						size="sm"
						variant="soft"
						color="neutral"
					></u-button>
				</div>
			</template> -->
			<template #actions-cell="{ row }">
				<div class="flex space-x-2 justify-end">
					<u-button
						variant="outline"
						size="sm"
						color="neutral"
						@click="
							() => {
								useExpenditureStore().setForm(row.original);
								useRouter().push({
									name: 'hotels-expenditures-id-form',
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
						@click="useConfirmDeleteStore().open(row.original.name as string, '/expenditures', row.original.id, 'Expenditure', useExpenditureStore())"
					>
						<!-- @click="expenditure.deleteExpenditure(row.original.id)" -->
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
						name: 'hotels-expenditures',
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
				@update:page="async ($event: number) => {
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