<template>
    <span :class="class" class="icon" />
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
