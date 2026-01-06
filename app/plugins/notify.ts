// plugins/notify.ts

/**
 * Nuxt UI Toast/Notification Plugin (TypeScript Version)
 * * This plugin globally injects a $notify helper function that wraps the 
 * Nuxt UI useToast() composable. This allows the notification function 
 * to be called from anywhere in the application, including Options API 
 * components (via 'this.$notify') and custom composables (via 'useNuxtApp().$notify').
 */

import { defineNuxtPlugin } from '#app';
// import type { _NuxtApp } from '#app';
// Define the expected structure for toast options
interface ToastMethodOptions {
    title?: string;
    description?: string;
    timeout?: number;
}

// Define the expected methods available on Nuxt UI's useToast() return value ($toast)
interface ToastInstance {
    add: (options: ToastMethodOptions) => void;
    success: (options: ToastMethodOptions) => void;
    error: (options: ToastMethodOptions) => void;
    warning: (options: ToastMethodOptions) => void;
    // Index signature for dynamic access via [type]
    [key: string]: (options: ToastMethodOptions) => void;
}

// Define the structure of the injected helper ($notify)
interface NotifyHelper {
    add: (title?: string, description?: string) => void;
    success: (title?: string, description?: string) => void;
    error: (title?: string, description?: string) => void;
    warning: (title?: string, description?: string) => void;
}


// Helper function to show a toast (used internally)
function showToast(nuxtApp, type: keyof ToastInstance | 'add', title?: string, description?: string): void {
    // We explicitly cast $toast to ToastInstance | undefined because $toast is injected 
    // by the Nuxt UI module and is not automatically typed on the NuxtApp interface.
    const toast = nuxtApp.$toast as ToastInstance | undefined;

    if (!toast) {
        // eslint-disable-next-line no-console
        console.error("Nuxt UI Toast service is not available. Did you install and configure Nuxt UI correctly?");
        return;
    }

    // FIX: Cast 'type' to string before using string methods (charAt, slice) 
    // to resolve the TypeScript error related to accessing these methods on a union type.
    const typeString = type as string;

    const options: ToastMethodOptions = {
        title: title || `${typeString.charAt(0).toUpperCase() + typeString.slice(1)} Notification`,
        description: description || `This is a global ${typeString} message.`,
        timeout: 3000,
    };

    // Use the toast composable to show the notification
    if (toast[type]) {
        toast[type](options);
    } else {
        // eslint-disable-next-line no-console
        console.warn(`Invalid notification type: ${type}. Defaulting to basic toast.`);
        toast.add(options);
    }
}

// FIX: To resolve the 'default' implicitly has type 'any' error (TS7022), 
// we explicitly define the plugin first and then export it. This helps TypeScript
// correctly infer the full type signature of the default export.
const notificationPlugin: any = defineNuxtPlugin((nuxtApp) => {
    const notify: NotifyHelper = {
        // Basic toast
        add: (title, description) => showToast(nuxtApp, 'add', title, description),

        // Success notification
        success: (title, description) => showToast(nuxtApp, 'success', title, description),

        // Error notification
        error: (title, description) => showToast(nuxtApp, 'error', title, description),

        // Warning notification
        warning: (title, description) => showToast(nuxtApp, 'warning', title, description),
    };

    // Inject the 'notify' object globally onto the NuxtApp instance
    // It will be available as $notify
    return {
        provide: {
            notify: notify,
        },
    };
});

export default notificationPlugin;