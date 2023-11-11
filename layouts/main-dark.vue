<template>
    <div class="viewport">
        <div class="layout">
            <slot />
        </div>
        <Navigation :isDark="true" />
    </div>
</template>

<script lang="ts"></script>
<style lang="scss" scoped>
.layout {
    height: 100%;

    padding-bottom: 9rem;
    padding-bottom: calc(9rem + constant(safe-area-inset-bottom));
    padding-bottom: calc(9rem + env(safe-area-inset-bottom));

    background: linear-gradient(
        0deg,
        #000 -2.78%,
        #1e1538 81.7%,
        #151d38 112.23%
    );
}

.navigation {
    border: none;
}
</style>
