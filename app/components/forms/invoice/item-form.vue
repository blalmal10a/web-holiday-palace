<script setup lang="ts">
	const invoiceStore = useInvoiceStore()
	const inputMenuRefs = ref<HTMLInputElement>()
	const inputMenuOpen = ref<boolean>()
	const menuItemStore = useMenuItemStore()

	const menuItemOptions = computed(() => {
		return menuItemStore.data.data.map((mi) => mi.name)
	})
	onMounted(() => {
		invoiceItem.form.invoice_id = invoiceStore.form.id as string
	})
</script>
<template>
	<div class="flex flex-col items-center">
		<u-card style="max-width: 400px; min-width: min(90vw, 400px)">
			<UForm
				:schema="invoiceItemFormSchema()"
				:state="invoiceItem.form"
				@submit="invoiceItem.onAddInvoiceItem(invoiceItem.form)"
				@error="
					($event: any) => {
						console.log($event)
					}
				"
			>
				<UFieldGroup class="grid sm:grid-cols-2 gap-2">
					<UFormField name="description">
						<u-input-menu
							open-on-click
							v-model:open="inputMenuOpen"
							:ref="() => inputMenuRefs"
							placeholder="Item"
							@focus="
								($event: FocusEvent) => {
									if ($event.target) {
										;($event.target as HTMLInputElement).select()
									}
								}
							"
							class="w-full"
							v-model="invoiceItem.form.description"
							:items="menuItemOptions"
							create-item
							@create="
								($event: string) => {
									invoiceItem.form.description = $event
									inputMenuOpen = false
								}
							"
							@update:model-value="
								($event: string) => {
									const menuItem = menuItemStore.data.data.find(
										(mi) => mi.name === $event,
									)
									if (menuItem) {
										invoiceItem.form.unit = menuItem.unit
										invoiceItem.form.rate = menuItem.rate
										invoiceItem.form.quantity = 1
									}
								}
							"
						/>
					</UFormField>

					<UFormField name="unit">
						<u-input-menu
							placeholder="Unit"
							@focus="
								($event: FocusEvent) => {
									if ($event.target) {
										;($event.target as HTMLInputElement).select()
									}
								}
							"
							open-on-click
							class="w-full"
							v-model="invoiceItem.form.unit"
							value-key="value"
							label-key="label"
						/>
					</UFormField>
					<UFormField name="rate">
						<UInput
							class="w-full"
							placeholder="Rate"
							v-model="invoiceItem.form.rate"
							icon="i-lucide-indian-rupee"
							type="number"
						/>
					</UFormField>
					<UFormField name="quantity">
						<UInput
							class="w-full"
							placeholder="Quantity"
							v-model="invoiceItem.form.quantity"
							icon="i-lucide-layers"
							type="number"
						/>
					</UFormField>
				</UFieldGroup>
				<div class="flex justify-end mt-4">
					<UButton type="submit" label="Add item"></UButton>
				</div>
			</UForm>
		</u-card>
	</div>
</template>
