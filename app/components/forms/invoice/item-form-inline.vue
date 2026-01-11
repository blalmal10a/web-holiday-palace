<script setup lang="ts">
const store = useInvoiceStore();
const inputMenuRefs = ref<HTMLInputElement[]>([])
const inputMenuOpen = ref<boolean[]>([])
const menuItemStore = useMenuItemStore();

const menuItemOptions = computed(() => {
    return menuItemStore.data.data.map(mi => mi.name)
})

</script>
<template>
    <template v-for="(item, index) in store.form.items">
        <div class="grid grid-cols-2  gap-3">

            <div class="col-span-full">
                <USeparator size="lg" />
            </div>
            <div class="">
                <u-form-field :name="`items.${index}.description`">
                    <u-input-menu
                        open-on-click
                        v-model:open="inputMenuOpen[index]"
                        :ref="() => inputMenuRefs[index]"
                        placeholder="Item"
                        @focus="($event: FocusEvent) => {
                            if ($event.target) {
                                ($event.target as HTMLInputElement).select();
                            }
                        }"
                        class="w-full"
                        v-model="item.description"
                        :items="menuItemOptions"
                        create-item
                        @create="($event: string) => {
                            item.description = $event;
                            inputMenuOpen[index] = false;
                        }"
                        @update:model-value="($event: string) => {
                            const menuItem = menuItemStore.data.data.find(mi => mi.name === $event)
                            if (menuItem) {
                                item.unit = menuItem.unit;
                                item.rate = menuItem.rate;
                                item.quantity = 1;
                            }
                        }"
                    />
                </u-form-field>
            </div>
            <div class="">
                <u-form-field :name="`items.${index}.unit`">
                    <u-input-menu
                        placeholder="Unit"
                        @focus="($event: FocusEvent) => {
                            if ($event.target) {
                                ($event.target as HTMLInputElement).select();
                            }
                        }"
                        class="w-full"
                        v-model="item.unit"
                        value-key="value"
                        label-key="label"
                        :items="menuItemUnitsList"
                    />
                </u-form-field>
            </div>
            <div class="">
                <u-form-field
                    class="flex-1"
                    :name="`items.${index}.rate`"
                >
                    <u-input
                        placeholder="Rate"
                        v-model="item.rate"
                        icon="i-lucide-indian-rupee"
                        type="number"
                    />
                </u-form-field>
            </div>

            <div class="">
                <u-form-field
                    class="flex-1"
                    :name="`items.${index}.quantity`"
                >
                    <u-input
                        placeholder="Quantity"
                        v-model="item.quantity"
                        icon="i-lucide-layers"
                        type="number"
                    />
                </u-form-field>

            </div>
        </div>
    </template>
</template>