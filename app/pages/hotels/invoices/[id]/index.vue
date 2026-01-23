<template>
	<div class="">
		<InvoicesPrint80mm />
		<div id="invoice-image-container" class="mt-8 rounded-xl overflow-hidden">
			<!--  -->
		</div>
		<div class="mt-8">
			<InvoicesPage />
		</div>
	</div>
</template>
<script setup lang="ts">
	import html2canvas from "html2canvas-pro"
	definePageMeta({
		layout: "main-layout",
	})
	onMounted(() => {
		const invoicePage = document.getElementById("invoice-a4")
		if (invoicePage) {
			html2canvas(invoicePage).then((canvas) => {
				const invoiceImageContainer = document.getElementById(
					"invoice-image-container",
				)
				if (invoiceImageContainer) {
					canvas.style.width = "100%"
					canvas.style.maxWidth = "210mm"
					canvas.style.height = "auto"
					canvas.style.margin = "auto"

					invoiceImageContainer.appendChild(canvas)
				}
			})
		}
	})
</script>
