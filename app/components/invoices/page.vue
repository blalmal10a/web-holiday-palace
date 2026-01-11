<script setup lang="ts">
import { format } from 'date-fns';

const minRows = ref(20)

const booking = useBooking();
const bookingStore = useBookingStore();
onMounted(() => {
})
await booking.fetchDetail();
minRows.value = (minRows.value - bookingStore.detail.invoice.items?.length);
const invoice = ref<Invoice>(bookingStore.detail.invoice);
</script>
<template>
    <div class="min-h-dvh bg-white text-black font-new-roman">
        <div
            class="border border-gray-200 rounded-xl invoice-container p-8"
            style=""
        >
            <div class="text-center font-semibold text-lg">
                BILL
            </div>
            <h1
                class="text-3xl text-center "
                style="font-family: 'Arial'; font-weight: bolder;"
            >
                HOLIDAY PALACE
            </h1>
            <div
                class="
                text-center
                relative"
                style="font-family: 'Times New Roman', Times, serif;"
            >
                <div
                    class=" left-0 absolute  text-lg"
                    style="top: 11pt;"
                >
                    GSTIN: 15DSGPS2599K1ZZ
                </div>
                <h3 class="text-xl font-semibold">
                    <div>
                        Sihhmui, Sairang
                    </div>
                    <div>
                        Regn. No. MSE/281/2012
                    </div>
                    <div>
                        Ph. No. 9436154813/8837382366
                    </div>
                </h3>

            </div>
            <div class="flex justify-between">
                <div>
                    No.: {{ bookingStore.detail.invoice.invoice_no }}
                </div>
                <div>
                    Date: {{ format(new Date(), 'd/MM/yyyy') }}
                </div>
            </div>
            <div class="flex justify-center">
                <div class="w-96 flex">
                    <div>To,</div>
                    <div class="flex-1 pl-2">
                        <div class="border-b">{{ bookingStore.detail.client.name }}
                        </div>
                        <div class="border-b mt-2">{{ format(bookingStore.detail.check_in_date, 'Do MMM, yyyy') }} to {{
                            format(bookingStore.detail.checkout_date, 'Do MMM, yyyy') }}</div>
                    </div>
                </div>
            </div>
            <table class="mt-2 w-full">
                <thead>
                    <tr>
                        <th style="width: 18mm">
                            Sl. No.
                        </th>
                        <th colspan="3">
                            Description
                        </th>
                        <th style="width: 20mm;">
                            Rate.
                        </th>
                        <th style="width: 18mm;">
                            Qty.
                        </th>
                        <th style="width: 25mm;">
                            Amount
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in bookingStore.detail.invoice.items">
                        <td>{{ index + 1 }}</td>
                        <td colspan="3">
                            {{ item.description }}
                        </td>
                        <td>{{ item.rate }}</td>
                        <td>{{ item.quantity }}</td>
                        <td>{{ item.rate * item.quantity }}</td>
                    </tr>
                    <tr v-for="value in minRows">
                        <td></td>
                        <td colspan="3"></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr class="font-bold">
                        <td
                            style="border-left: none;"
                            colspan="6"
                            class="text-right"
                        >TOTAL</td>
                        <td style="border-bottom: 1px solid black;">
                            {{ invoice?.total_amount }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>


    </div>
</template>
<style scoped>
.invoice-container {
    width: 210mm;
    margin: auto;
}

table {
    border-collapse: collapse;
}

th {
    text-align: left;
    border: 1px solid black;
    padding: 5px;
}

td {
    border-left: 1px solid black;
    border-right: 1px solid black;
    height: 35px;
    padding: 5px;
}

/* last table row */
tbody tr:nth-last-child(2) {
    border-bottom: 1px solid black;
}

.font-new-roman {
    font-family: 'Times New Roman', Times, serif;
}
</style>