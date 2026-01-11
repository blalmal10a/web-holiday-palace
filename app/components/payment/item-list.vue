<script setup lang="ts">
import { format } from 'date-fns';

const store = useInvoiceStore()
function onClickAddItem() {
    store.showInvoicePaymentFormModal = true;
}
</script>
<template>
    <u-separator
        label="Payments"
        size="lg"
    />
    <template v-if="store.form.payments?.length">
        <div class="justify-end flex">
            <u-button
                @click="onClickAddItem"
                size="sm"
                label="Add payment"
                icon="i-lucide-plus"
            ></u-button>
        </div>
        <table class=" mt-2">
            <thead class="text-sm">
                <tr>
                    <th class=" bg-accented">Date</th>
                    <th class="bg-accented">Amount</th>
                    <th class="bg-accented">Mode</th>
                    <th class="bg-accented"></th>
                </tr>
            </thead>
            <tbody class="text-xs sm:text-default">

                <template v-for="(item, index) in store.form.payments">
                    <tr>
                        <td>
                            {{ format(item.date, 'Do MMM, yyyy') }}
                        </td>
                        <td>
                            {{ item.amount }}
                        </td>
                        <td>
                            {{ item.mode }}
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
                                        usePaymentStore().form = item;
                                        store.showInvoicePaymentFormModal = true;
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
                                        if (!store.form.deleted_payment_ids) {
                                            store.form.deleted_payment_ids = []
                                        }
                                        if (item.id)
                                            store.form.deleted_payment_ids.push(item.id)
                                        store.form.payments.splice(index, 1)
                                    }"
                                ></u-button>
                            </div>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </template>
    <template v-if="!store.form.payments?.length">
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