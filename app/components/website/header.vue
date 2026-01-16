<script setup>
const isOpen = ref(false)

const navLinks = [
    { label: 'Rooms', to: '#rooms' },
    { label: 'Dining', to: '#dining' },
    { label: 'Contact', to: '#contact' }
]
</script>

<template>
    <header
        class="fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 dark:bg-neutral-900/70 border-b border-neutral-200 dark:border-neutral-800"
    >
        <nav class="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
            <NuxtLink href="/">
                <div class="flex items-center gap-2">
                    <UIcon
                        name="i-lucide-palmtree"
                        class="w-8 h-8 text-primary-600"
                    />
                    <span class="text-2xl font-serif font-bold tracking-tight">Holiday Palace</span>
                </div>
            </NuxtLink>

            <div class="hidden md:flex items-center gap-8">
                <UButton
                    v-for="link in navLinks"
                    :key="link.label"
                    variant="ghost"
                    color="neutral"
                    :label="link.label"
                    :to="link.to"
                />
                <UButton
                    color="primary"
                    label="Book Now"
                    size="lg"
                    @click="useCalendarStore().showWebsiteCalendar = true"
                />
            </div>

            <UButton
                icon="i-heroicons-bars-3"
                variant="ghost"
                color="neutral"
                class="md:hidden"
                @click="isOpen = true"
            />

            <USlideover
                class="md:hidden"
                v-model:open="isOpen"
                title="Holiday Palace"
            >
                <template #body>
                    <div class="flex flex-col gap-4">
                        <UButton
                            v-for="link in navLinks"
                            :key="link.label"
                            :label="link.label"
                            :to="link.to"
                            variant="ghost"
                            color="neutral"
                            block
                            class="justify-start text-lg"
                            @click="isOpen = false"
                        />

                        <!-- <USeparator class="my-2" />
                        <UButton
                            color="primary"
                            label="Book Now"
                            size="xl"
                            block
                            @click="isOpen = false"
                        /> -->
                    </div>
                </template>
            </USlideover>
        </nav>
    </header>
</template>