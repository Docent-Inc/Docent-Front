<template>
    <div class="viewport">
        <div class="layout">
            <slot />
        </div>
    </div>
</template>

<script lang="ts"></script>
<style lang="scss" scoped>
.layout {
    height: 100%;
    background: linear-gradient(
        0deg,
        #000 -2.78%,
        #1e1538 81.7%,
        #151d38 112.23%
    );
}
</style>
