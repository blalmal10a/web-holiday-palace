<script setup lang="ts">
	import {format} from "date-fns"

	const booking = useBooking()
	const bookingStore = useBookingStore()

	await booking.fetchDetail()
	const invoice = computed(() => bookingStore.detail.invoice)
	type WidthProp = 80 | 57
	const props = defineProps({
		width: {
			type: Number as PropType<WidthProp>,
			default: 80,
		},
	})
</script>

<template>
	<div
		class="thermal-wrapper font-mono text-xs text-black bg-white"
		:style="{
			width: `${props.width}mm`,
		}"
	>
		<div class="text-center border-b border-dashed pb-2 mb-2">
			<div class="font-bold text-sm">BILL</div>
			<h1 class="text-xl font-bold uppercase">Holiday Palace</h1>
			<div class="leading-tight">
				<p>Sihhmui, Sairang</p>
				<p>GSTIN: 15DSGPS2599K1ZZ</p>
				<p>Reg: MSE/281/2012</p>
				<p>Ph: 9436154813</p>
			</div>
		</div>

		<div class="flex justify-between">
			<div>Invoice no:</div>
			<div>
				{{ invoice.invoice_no }}
			</div>
		</div>
		<div class="flex justify-between mb-2">
			<div>Invoice date:</div>
			<div>{{ format(new Date(), "d/MM/yy") }}</div>
		</div>
		<div class="border-b border-dashed pb-2 mb-2">
			<div class="font-bold">CUSTOMER:</div>
			<div>{{ bookingStore.detail.client.name }}</div>
			<div class="text-[10px]">
				{{ format(bookingStore.detail.check_in_date, "dd/MM/yy") }} -
				{{ format(bookingStore.detail.checkout_date, "dd/MM/yy") }}
			</div>
		</div>

		<table class="w-full mb-2">
			<thead>
				<tr class="border-b border-black">
					<th class="text-left py-1">Item</th>
					<th class="text-right py-1">Qty</th>
					<th class="text-right py-1">Amt</th>
				</tr>
			</thead>
			<tbody style="word-spacing: -5px">
				<tr v-for="(item, index) in invoice.items" :key="index">
					<td class="py-1">
						<div class="font-medium">{{ item.description }}</div>
						<div class="text-[10px] text-gray-600">@ {{ item.rate }}</div>
					</td>
					<td class="text-right align-top py-1">
						{{ item.quantity }} {{ item.unit }}
					</td>

					<td class="text-right align-top py-1">
						{{ item.rate * item.quantity }}
					</td>
				</tr>
			</tbody>
		</table>

		<div class="border-t border-black pt-1">
			<div class="flex justify-between font-bold text-base">
				<span>TOTAL:</span>
				<span>{{ invoice?.total_amount }}</span>
			</div>
		</div>

		<div class="text-center mt-6 pt-4 border-t border-dotted">
			<p>Thank You!</p>
			<p class="text-[9px]">Please keep this receipt.</p>
		</div>
	</div>
</template>

<style scoped>
	.thermal-wrapper {
		max-width: 100%;
		padding: 4mm;
		margin: 0 auto;
		line-height: 1.2;
	}

	table {
		border-collapse: collapse;
	}

	th,
	td {
		border: none;
	}

	@media print {
		@page {
			margin: 0;
		}
		body {
			margin: 0;
		}
		.thermal-wrapper {
			width: 100%;
			padding: 2mm;
		}
	}

	.font-mono {
		font-family: "Courier New", Courier, monospace;
	}
</style>
