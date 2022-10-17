import { $cms } from "@deepberry/common/js/https";

function getDashboardList() {
    return $cms().get("/api/cms/misc/dashboard");
}

function getAnnouncement(key) {
    return $cms().get(`/api/cms/misc/announcement`, {
        params: {
            key,
        },
    });
}

export { getDashboardList, getAnnouncement };
