<script lang="ts" setup>
	const store = useMenuItemStore()
	const model = useMenuItem()
	const openCategoryMenu = ref(false)
	const openUnitMenu = ref(false)
	const imageFiles = ref<File[]>([])
	const menuItemCategoryList = ref<string[]>([])
	const menuItemUnitList = ref<string[]>([])
	onMounted(async () => {
		getCategoryList()
		if (!store.form.id && useRoute().params.id != "add") {
			await model.fetchDetail()
		}
		store.form.deleted_image_ids = []
	})
	async function getCategoryList() {
		try {
			const data = await api.get("menu-item-categories")
			menuItemCategoryList.value = data
		} catch (error) {}
	}
</script>
<template>
	<div class="flex flex-col items-center">
		<u-card style="min-width: min(400px, 90vw)">
			<u-form
				:schema="menuItemFormSchema()"
				:state="store.form"
				@submit="model.submitForm(imageFiles)"
				class="space-y-4 w-full"
			>
				<u-form-field label="Item name" name="name">
					<u-input v-model="store.form.name" icon="i-lucide-user" type="text" />
				</u-form-field>
				<u-form-field label="Unit" name="unit">
					<USelectMenu
						class="w-full"
						v-model="store.form.unit"
						:items="menuItemUnitList"
						@create="
							($event: string) => {
								store.form.unit = $event
								menuItemCategoryList.push($event)
								openUnitMenu = false
							}
						"
					/>
				</u-form-field>
				<u-form-field label="Category" name="category">
					<USelectMenu
						v-if="menuItemCategoryList.length > 0"
						class="w-full"
						v-model="store.form.category"
						v-model:open="openCategoryMenu"
						create-item
						@create="
							($event: string) => {
								store.form.category = $event
								menuItemCategoryList.push($event)
								openCategoryMenu = false
							}
						"
						:items="menuItemCategoryList"
					/>
				</u-form-field>
				<u-form-field label="Rate" name="rate">
					<u-input
						v-model="store.form.rate"
						icon="i-lucide-indian-rupee"
						type="number"
						step="0.01"
					/>
				</u-form-field>
				<u-form-field label="Description" name="description">
					<u-textarea
						v-model="store.form.description"
						icon="i-lucide-user"
						type="text"
					/>
				</u-form-field>
				<u-form-field style="max-width: 400px" label="Image" name="images">
					<UFileUpload
						accept="image/jpeg,image/png"
						v-model="imageFiles"
						multiple
					></UFileUpload>
				</u-form-field>
				<div style="max-width: 400px" class="grid grid-cols-3 gap-2 px-4">
					<template v-for="(image, index) in store.form.images">
						<div class="bg-elevated relative">
							<UButton
								@click="
									() => {
										store.form.deleted_image_ids.push(image.id)
										store.form.images.splice(index, 1)
									}
								"
								variant="outline"
								color="neutral"
								class="bg-white rounded-full absolute top-0 right-0 text-black hover:bg-white"
								style="padding: 2px"
							>
								<UIcon size="14" name="i-lucide-x" />
							</UButton>

							<NuxtImg
								:src="image.url"
								style="aspect-ratio: 1; object-fit: cover"
							/>
						</div>
					</template>
				</div>
				<div class="flex justify-end space-x-2">
					<u-button
						size="lg"
						variant="outline"
						color="neutral"
						class="h-full"
						:disabled="store.loadingSubmitMenuItemForm"
						@click="
							() => {
								if (useRoute().name == 'hotels-menu-items-id-form') {
									useRouter().push({
										name: 'hotels-menu-items',
									})
								}
								useInvoiceStore().showInvoiceFormModal = false
							}
						"
					>
						Cancel
					</u-button>
					<u-button
						size="lg"
						:loading="store.loadingSubmitMenuItemForm"
						class=""
						type="submit"
					>
						Submit
					</u-button>
				</div>
			</u-form>
		</u-card>
	</div>
</template>

<style scoped>
	.relative.inline-flex.items-center {
		width: 100%;
	}
</style>
