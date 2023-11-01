<template>
    <span :class="class" />
</template>

<script>
export default {
    name: "Icon",
    props: {
        class: {
            type: String,
            required: true,
        },
    },
};
</script>
<style lang="scss" scoped></style>
