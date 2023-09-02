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
    height: calc(100vh - 8.5rem);
    padding: 0;
    margin-bottom: 8.5rem;
}
</style>
