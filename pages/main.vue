<template>
    <div>Main</div>
</template>

<script setup>
import axios from "axios";

definePageMeta({
    layout: "default",
});

onMounted(() => {
    console.log("onMounted");
    callAPI();
});

const callAPI = async () => {
    const res = await axios.get("/health");
    console.log(res.data);
};
</script>

<style lang="scss" scoped>
div {
    border: 1px solid red;
}
</style>
