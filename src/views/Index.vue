<template>
    <div class="p-index">
        <img class="m-logo" :src="logo" alt="深莓智能" />
        <h1 class="m-title">DeepBerry Dashboard</h1>

        <div class="m-sso wp">
            <el-button type="primary" size="large" disabled>SSO一键全平台登录</el-button>
        </div>

        <div class="m-box wp">
            <div class="m-panel">
                <div class="u-msg">🌀 全局公告</div>
                <div class="u-setting">
                    <el-popover placement="bottom" trigger="hover" popper-class="m-filter">
                        <template #reference
                            ><span class="u-filter"
                                ><img src="@/assets/img/filter.svg" alt="过滤" />筛选</span
                            ></template
                        >
                        <el-checkbox-group v-model="groups" label="key" @change="customGroup">
                            <el-checkbox :label="key" v-for="(label, key) in groupOptions" :key="key">
                                {{ label }} <em>({{ key }})</em>
                            </el-checkbox>
                        </el-checkbox-group>
                    </el-popover>
                </div>
            </div>
            <ul class="m-applications">
                <li class="u-item" v-for="(item, i) in data" :key="i" v-show="isMatched(item)">
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
import { toRaw } from "vue";
export default {
    name: "App",
    props: [],
    components: {},
    data: function () {
        return {
            data: [],
            isDev: process.env.NODE_ENV === "development",
            groups: ["common", "developer", "operator"],
            groupOptions: {
                common: "默认",
                developer: "开发",
                // production: "产品",
                operator: "运营",
            },
        };
    },
    computed: {
        logo: function () {
            return getCdnLink("img/common/logo/blue.svg");
        },
    },
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
        isMatched(item) {
            return this.groups.includes(item.group);
        },
        customGroup() {
            localStorage.setItem("dashboard_active", toRaw(this.groups));
        },
        init() {
            let customFilterGroups = localStorage.getItem("dashboard_active");
            if (customFilterGroups) {
                this.groups = customFilterGroups.split(",");
            }
        },
    },
    mounted: function () {
        this.load();
        this.init();
    },
};
</script>

<style lang="less">
@import "@/assets/css/index.less";
</style>
