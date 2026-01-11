<script setup lang="ts">
const store = useInvoiceStore()
function onClickAddItem() {
    store.showInvoiceItemFormModal = true;
    // store.form.items.push({
    //     invoice_id: store.form.id,
    //     booking_id: store.form.booking_id,
    // } as InvoiceItemForm)
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
        <table class="w-full mt-2">
            <thead>
                <tr>
                    <th class=" bg-accented">Description</th>
                    <th class="bg-accented">Unit</th>
                    <th class="bg-accented">Rate</th>
                    <th class="bg-accented">Quantity</th>
                    <th class="bg-accented"></th>
                </tr>
            </thead>
            <tbody>
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
                            <u-button
                                icon="i-lucide-trash"
                                variant="ghost"
                                color="error"
                                @click="store.form.items.splice(index, 1)"
                            ></u-button>
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