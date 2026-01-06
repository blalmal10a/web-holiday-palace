export const nav = reactive({
    items: [
        {
            "name": "index",
            "path": "/",
            "meta": {
                "layout": "main-layout"
            }
        },
        {
            "name": "profile",
            "path": "/profile"
        },
        {
            "name": "settings",
            "path": "/settings"
        },
        {
            "name": "dashboard",
            "path": "/dashboard"
        },
        {
            "name": "auth-login",
            "path": "/auth/login",
            "meta": {
                "layout": "auth-layout"
            }
        },
        {
            "name": "guest-only",
            "path": "/guest-only",
            "meta": {
                "layout": "main-layout",
                "sanctum": {
                    "guestOnly": true
                }
            }
        }
    ]
})