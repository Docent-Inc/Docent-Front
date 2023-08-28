<template>
    <div class="viewport">
        <div class="header">
            <v-icon class="ic_back" @click="router.back()" />
        </div>

        <div class="contents" di>
            <slot />
        </div>
    </div>
</template>

<script setup>
const router = useRouter();
</script>
<style lang="scss">
.contents {
    width: 100%;
    margin-top: 60px;
    padding: 3rem 2rem 0 2rem;
}
</style>
