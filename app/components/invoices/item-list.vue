<script setup lang="ts">
const store = useInvoiceStore()
function onClickAddItem() {
    store.showInvoiceItemFormModal = true;
}
</script>
<template>
    <u-separator
        label="Invoice items"
        size="lg"
    />
    <template v-if="store.form.items?.length">
        <div class="justify-end flex">
            <u-button
                @click="onClickAddItem"
                size="sm"
                label="Add item"
                icon="i-lucide-plus"
            ></u-button>
        </div>
        <table class=" mt-2">
            <thead>
                <tr>
                    <th class=" bg-accented">Item</th>
                    <th class="bg-accented">Unit</th>
                    <th class="bg-accented">Rate</th>
                    <th class="bg-accented">Qty.</th>
                    <th class="bg-accented"></th>
                </tr>
            </thead>
            <tbody class="text-sm">
                <template v-for="(item, index) in store.form.items">
                    <tr>
                        <td>
                            {{ item.description }}
                        </td>
                        <td>
                            {{ item.unit }}
                        </td>
                        <td>
                            {{ item.rate }}
                        </td>
                        <td>
                            {{ item.quantity }}
                        </td>
                        <td style="width: 0.01%;">
                            <div class=" flex flex-nowrap">
                                <u-button
                                    :style="{
                                        opacity: !!item.booking_id ? 0.5 : 1,
                                    }"
                                    icon="i-lucide-edit"
                                    :disabled="!!item.booking_id"
                                    variant="ghost"
                                    color="neutral"
                                    @click="() => {
                                        invoiceItem.form = item;
                                        store.showInvoiceItemFormModal = true;
                                    }"
                                ></u-button>
                                <u-button
                                    :style="{
                                        opacity: !!item.booking_id ? 0.5 : 1,
                                    }"
                                    :disabled="!!item.booking_id"
                                    icon="i-lucide-trash"
                                    variant="ghost"
                                    color="error"
                                    @click="() => {
                                        if (!store.form.deleted_item_ids) {
                                            store.form.deleted_item_ids = []
                                        }
                                        if (item.id)
                                            store.form.deleted_item_ids.push(item.id)
                                        store.form.items.splice(index, 1)
                                    }"
                                ></u-button>
                            </div>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </template>
    <template v-if="!store.form.items?.length">
        <div class="flex justify-center mt-2">
            <u-button
                @click="onClickAddItem"
                size="sm"
                label="Add item"
                icon="i-lucide-plus"
            ></u-button>
        </div>
    </template>
</template>
<style scoped>
table {
    text-align: left;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #ccc;
    padding: 0.5rem;

}
</style>