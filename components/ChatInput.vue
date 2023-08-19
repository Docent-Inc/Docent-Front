<template>
    <div class="input">
        <input type="text" v-model="data" @keydown.enter="send" />
        <v-icon @click="send">mdi-send-circle-outline</v-icon>
    </div>
</template>
<script lang="ts" setup>
const data = ref("");
const send = () => {
    console.log("data", data.value);
};
</script>
<style lang="scss" scoped>
.input {
    width: 100%;
    max-width: 500px;
    background: #fff;
    border-top: 1px solid #f6f6f6;

    padding: 1.3rem 0rem 1.5rem 2.5rem;
    z-index: 10;
    position: fixed;
    bottom: 0;

    display: flex;
    justify-content: right;
    align-items: center;

    input {
        height: 100%;
        width: 90%;
        border: 1px solid #efefef;
        border-radius: 20px;
        padding: 0.5em 2.5em 0.5em 1em;
        margin-right: 10px;
    }

    .v-icon {
        position: absolute;
        right: 0;
        margin-right: 20px;
    }
}
</style>
