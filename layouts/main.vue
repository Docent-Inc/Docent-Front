<template>
    <div class="contents">
        <slot />
    </div>
    <Navigation />
</template>

<script lang="ts"></script>
<style lang="scss" scoped>
.contents {
    width: 100%;
    height: calc(var(--vh, 1vh) * 100 - 9rem); // calc(100% - 9rem);
    padding: 0;
    margin-bottom: 9rem;
}
</style>
