import { $cms } from "@deepberry/common/js/https";

function getDashboardList() {
    let isDev = process.env.NODE_ENV === "development";
    return $cms().get("/api/cms/misc/dashboard", {
        params: {
            __no_cache: isDev ? 1 : 0,
        },
    });
}

export { getDashboardList };
