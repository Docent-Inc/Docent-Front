<template>
    <div class="viewport">
        <div class="layout">
            <slot />
        </div>
        <Navigation />
    </div>
</template>

<script lang="ts"></script>
<style lang="scss" scoped>
.layout {
    width: 100%;
    height: calc(100% - 6rem);
    height: calc(100% - (6rem + constant(safe-area-inset-bottom)));
    height: calc(100% - (6rem + env(safe-area-inset-bottom)));

    margin-bottom: 6rem;
    margin-bottom: calc(6rem + constant(safe-area-inset-bottom));
    margin-bottom: calc(6rem + env(safe-area-inset-bottom));
}
</style>
