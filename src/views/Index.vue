<template>
    <div class="p-index">
        <img class="index-logo" :src="logo" alt="深莓智能" />
        <h1 class="index-title">DeepBerry Dashboard</h1>

        <div class="index-box wp">
            <div class="index-panel">
                <div class="u-msg">🌀 全局公告</div>
                <div class="u-setting"></div>
            </div>
            <ul class="index-applications">
                <li class="u-item" v-for="item in data" :key="item.name">
                    <a class="u-link" :href="item.homepage" target="_blank">
                        <img class="u-icon" :src="getAppIcon(item.icon)" />
                        <span class="u-desc">
                            {{ item.description }}
                            <em>{{ item.name }}</em>
                        </span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { getCdnLink } from "@deepberry/common/js/utils";
const api = "https://api.github.com/orgs/deepberry/repos";
export default {
    name: "App",
    props: [],
    components: {},
    data: function () {
        return {
            list: [],
            misc: [
                {
                    homepage: "http://office.deepberry.cn:8888",
                    description: "Jenkins",
                    name: "Jenkins",
                    icon: "jenkins",
                },
                {
                    homepage: "http://39.103.226.204:8888/ospanel",
                    description: "FE运维面板",
                    name: "Bt-Panel",
                    icon: "bt",
                },
                {
                    homepage: "https://github.com/deepberry",
                    description: "GitHub仓库",
                    name: "GitHub",
                    icon: "github",
                },
                {
                    homepage: "https://admin.deepberry.cn/vue3-element-extend",
                    description: "拓展组件库",
                    name: "vue3-element-extend",
                    icon: "element",
                },
            ],
        };
    },
    computed: {
        data: function () {
            return this.list.concat(this.misc);
        },
        logo: function () {
            return getCdnLink("img/common/logo/blue.svg");
        },
    },
    watch: {},
    methods: {
        load() {
            fetch(api, {
                headers: {
                    Authorization: "token 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",
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    let list = [];
                    for (let item of data) {
                        if (item.homepage && item.name != "FE-index") {
                            let _name = item.name.startsWith("FE-") ? item.name.split("-")[1] : item.name;
                            item.icon = _name.toLowerCase();
                            list.push(item);
                        }
                    }
                    this.list = list;
                });
        },
        getAppIcon(slug) {
            return getCdnLink(`img/common/apps/${slug}.svg`);
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
