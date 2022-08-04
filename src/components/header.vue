<template>
    <div class="c-header">
        <img class="m-logo" :src="logo" alt="深莓智能" />
        <h1 class="m-title">DeepBerry Dashboard</h1>
    </div>
</template>

<script>
import { getCdnLink } from "@deepberry/common/js/utils";
export default {
    name: "CommonHeader",
    props: [],
    components: {},
    data: function () {
        return {};
    },
    computed: {
        logo: function () {
            return getCdnLink("img/common/logo/blue.svg");
        },
    },
    watch: {},
    methods: {},
    created: function () {},
    mounted: function () {},
};
</script>
