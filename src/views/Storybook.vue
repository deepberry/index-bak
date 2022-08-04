<template>
    <div class="p-storybook">
        <Header />

        <div class="m-box wp">
            <ul class="m-storybook-list u-list">
                <li class="u-item">
                    <b>vue3-element-extend</b>
                    <em>公共扩展组件库</em>
                    <a href="https://github.com/deepberry/vue3-element-extend" target="_blank">README</a>
                    <a href="https://admin.deepberry.cn/vue3-element-extend" target="_blank">API REFERENCE</a>
                </li>
                <li class="u-item">
                    <b>titan-web-components</b>
                    <em>泰坦业务组件库</em>
                    <a href="https://github.com/deepberry/titan-web-components" target="_blank">README</a>
                    <a href="https://admin.deepberry.cn/titan-web-components" target="_blank">API REFERENCE</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Header from "@/components/header.vue";
export default {
    name: "StorybookPage",
    props: [],
    components: { Header },
    data: function () {
        return {};
    },
    computed: {},
    watch: {},
    methods: {},
    created: function () {},
    mounted: function () {},
};
</script>

<style lang="less">
@import "@/assets/css/storybook.less";
</style>
