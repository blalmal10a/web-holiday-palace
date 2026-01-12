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

        <table class=" mt-2">
            <thead class="text-sm">
                <tr>
                    <th
                        colspan="2"
                        class=" bg-accented"
                    >Item</th>
                    <th class="bg-accented">Unit</th>
                    <th class="bg-accented">Rate</th>
                    <th class="bg-accented">Qty.</th>
                    <th class="bg-accented text-right ">
                        <div class="-mb-1">
                            <u-button
                                variant="soft"
                                @click="onClickAddItem"
                                class="p-0"
                            >
                                <div class=" flex items-center justify-center h-full">
                                    <u-icon
                                        size="1.5rem"
                                        name="i-lucide-plus"
                                    ></u-icon>
                                </div>

                            </u-button>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody class="text-xs sm:text-default">
                <template v-for="(item, index) in store.form.items">
                    <tr>
                        <td colspan="2">
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
                                        invoiceItem.form = { ...item };
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
    border: 1px solid #ccc;
}

th {
    border: 1px solid #ccc;
    padding: 0.5rem;
}

td {
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    padding: 0.5rem;
}
</style>