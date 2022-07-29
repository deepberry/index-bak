<template>
    <div class="p-index">
        <img class="m-logo" :src="logo" alt="深莓智能" />
        <h1 class="m-title">DeepBerry Dashboard</h1>

        <div class="m-box wp">
            <div class="m-panel">
                <div class="u-msg">🌀 全局公告</div>
                <div class="u-setting">
                    <el-popover placement="bottom" trigger="hover" popper-class="m-groupList">
                        <template #reference>筛选组别 ⇅</template>
                        <el-checkbox-group v-model="groupList">
                            <el-checkbox :label="item" v-for="(item, key) in groups" :key="key" />
                        </el-checkbox-group>
                    </el-popover>
                </div>
            </div>
            <ul class="m-applications">
                <li class="u-item" v-for="(item, i) in list" :key="i">
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
            group_list: [],
            groupList: [],
            groups: {
                common: "默认",
                developer: "开发",
                production: "产品",
                operator: "运营",
            },
        };
    },
    computed: {
        logo: function () {
            return getCdnLink("img/common/logo/blue.svg");
        },
        list: function () {
            return this.groupList.length ? this.group_list : this.data;
        },
    },
    watch: {
        groupList: {
            depp: true,
            immediate: true,
            handler: function (arr) {
                arr.length
                    ? localStorage.setItem("dashboard_active", JSON.stringify(arr))
                    : localStorage.removeItem('"dashboard_active"');
                if (this.data) this.group_list = this.data.filter((item) => arr.includes(this.groups[item.group]));
            },
        },
    },
    methods: {
        async load() {
            getDashboardList().then((res) => {
                this.data = res.data?.data || [];
                const list = JSON.parse(localStorage.getItem("dashboard_active"));
                if (list.length) this.groupList = list;
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