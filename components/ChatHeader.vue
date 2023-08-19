<template>
    <div class="header">
        <v-icon @click="router.back()">mdi-chevron-left</v-icon>

        <div>
            <v-icon>mdi-help-circle-outline</v-icon>
            <v-icon>mdi-dots-horizontal-circle-outline</v-icon>
        </div>
    </div>
</template>

<script lang="ts" setup>
const router = useRouter();
</script>

<style lang="scss" scoped>
.v-icon {
    font-size: 28px;
}

.v-icon:nth-child(2) {
    margin-left: 10px;
}
</style>
