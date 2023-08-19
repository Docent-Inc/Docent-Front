<template>
    <div class="navigation">
        <v-btn value="home" @click="this.$router.push(`/home`)" flat>
            <v-icon>mdi-home</v-icon>
        </v-btn>

        <v-btn value="record" @click="this.$router.push(`/record`)" flat>
            <v-icon>mdi-history</v-icon>
        </v-btn>

        <v-btn value="my" @click="this.$router.push(`/my`)" flat>
            <v-icon>mdi-account-circle</v-icon>
        </v-btn>
    </div>
</template>

<script setup></script>
<style lang="scss" scoped>
.v-btn {
    flex: 1;
    width: 100%;
    height: 100%;
    font-size: medium;
}
</style>
