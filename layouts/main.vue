<template>
    <div class="viewport">
        <div class="layout">
            <slot />
        </div>
<!--        <Navigation />-->
    </div>
</template>

<script lang="ts"></script>
<style lang="scss" scoped>
.layout {
    height: calc(100%);
    height: calc(100% - constant(safe-area-inset-bottom));
    height: calc(100% - env(safe-area-inset-bottom));

    //margin-bottom: 9rem;
    //margin-bottom: calc(9rem + constant(safe-area-inset-bottom));
    //margin-bottom: calc(9rem + env(safe-area-inset-bottom));

    // 231215 - Toast 중앙정렬 이슈로 추가
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
