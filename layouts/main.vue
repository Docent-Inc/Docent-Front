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
    margin-bottom: 8.5rem;
    overflow-y: scroll;
}
</style>
