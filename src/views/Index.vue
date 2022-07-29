<template>
    <div class="p-index">
        <img class="m-logo" :src="logo" alt="深莓智能" />
        <h1 class="m-title">DeepBerry Dashboard</h1>

        <div class="m-box wp">
            <div class="m-panel">
                <div class="u-msg">🌀 全局公告</div>
                <div class="u-setting"></div>
            </div>
            <ul class="m-applications">
                <li class="u-item" v-for="(item, i) in data" :key="i">
                    <a class="u-link" :href="item.link" target="_blank">
                        <img class="u-icon" :src="getAppIcon(item)" />
                        <span class="u-desc">
                            {{ item.name }}
                            <em>{{ item.desc }}</em>
                        </span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { getCdnLink } from "@deepberry/common/js/utils";
import { getDashboardList } from "@/service/index";
export default {
    name: "App",
    props: [],
    components: {},
    data: function () {
        return {
            data: [],
            isDev: process.env.NODE_ENV === "development",
        };
    },
    computed: {
        logo: function () {
            return getCdnLink("img/common/logo/blue.svg");
        },
    },
    watch: {},
    methods: {
        async load() {
            getDashboardList().then((res) => {
                this.data = res.data?.data || [];
            });
        },
        getAppIcon(item) {
            if (this.isDev) {
                return `/temp/${item.slug}.svg`;
            } else {
                if (item.icon) {
                    return getCdnLink(item.icon);
                } else {
                    return getCdnLink(`img/common/apps/${item.slug}.svg`);
                }
            }
        },
    },
    mounted: function () {
        this.load();
    },
};
</script>

<style lang="less">
@import "@/assets/css/index.less";
</style>
