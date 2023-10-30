<template>
    <div class="loading" v-if="visible">
        <v-progress-circular
            indeterminate
            color="#9398FF"
        ></v-progress-circular>
    </div>
</template>
<script>
export default {
    name: "Loading",
    data() {
        return {
            visible: false,
        };
    },
    created() {
        this.$eventBus.$on("onLoading", (boolean) => {
            console.log(boolean);
            this.visible = boolean;
        });
    },
};
</script>
<style lang="scss" scoped>
.loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
