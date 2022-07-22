<template>
    <div class="container">
        <img class="logo" src="./assets/img/logo.svg" alt="深莓智能" />
        <h1 class="title">DeepBerry Dashboard</h1>
        <ul class="applications">
            <li class="item" v-for="item in data" :key="item.name">
                <a class="link" :href="item.homepage" target="_blank">
                    <img class="icon" :src="getIcon(item.icon)" />
                    <span class="desc">
                        {{ item.description }}
                        <em>{{ item.name }}</em>
                    </span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
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
        getIcon(name) {
            return require(`./assets/img/${name}.svg`);
        },
    },
    mounted: function () {
        this.load();
    },
};
</script>

<style lang="less">
@import "@/assets/css/app.less";
</style>
