<template lang="">
    <div>
        <div class="top">Default Layout</div>

        <slot />
    </div>
</template>
<script setup></script>

<style lang="scss" scoped>
.top {
    border: 1px solid green;
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    padding: 5px;
    margin-bottom: 20px;
}
</style>
