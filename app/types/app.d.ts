// types/app.d.ts (or nuxt.d.ts)

import 'nuxt/app'

declare module 'nuxt/app' {
    interface PageMeta {
        pageTitle?: string;
    }
}