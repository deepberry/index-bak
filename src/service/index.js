import { $cms } from "@deepberry/common/js/https";

function getDashboardList() {
    return $cms().get("/api/cms/misc/dashboard");
}

export { getDashboardList };
