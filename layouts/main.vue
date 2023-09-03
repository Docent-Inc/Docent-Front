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
    // height: calc(
    //     var(--vh, 1vh) * 100 - 9rem - env(safe-area-inset-bottom) - env(
    //             safe-area-inset-top
    //         )
    // );
    // height: calc(
    //     var(--vh, 1vh) * 100 - 9rem - constant(safe-area-inset-bottom) - constant(
    //             safe-area-inset-top
    //         )
    // );
    padding: 0;
    margin-bottom: 9rem;
    margin-bottom: calc(9rem + constant(safe-area-inset-bottom));
    margin-bottom: calc(9rem + env(safe-area-inset-bottom));
}
</style>
