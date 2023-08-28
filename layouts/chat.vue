<template>
    <div class="wrap">
        <div class="viewport">
            <chat-header />

            <slot />

            <chat-input />
        </div>
    </div>
</template>

<script lang="ts"></script>
<style lang="scss" scoped>
.wrapper {
    width: 100%;
    padding-top: 60px;
}
</style>
