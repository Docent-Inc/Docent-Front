<template>
    <div class="modify-mbti">
        <span class="modify-mbti-title">MBTI</span>
        <div class="modify-mbti-content">
            <v-icon v-if="isE" class="ic_modify_e" @click="toggleE" />
            <v-icon v-else class="ic_modify_i" @click="toggleE" />
            <v-icon v-if="isN" class="ic_modify_n" @click="toggleN" />
            <v-icon v-else class="ic_modify_s" @click="toggleN" />
            <v-icon v-if="isT" class="ic_modify_t" @click="toggleT" />
            <v-icon v-else class="ic_modify_f" @click="toggleT" />
            <v-icon v-if="isJ" class="ic_modify_j" @click="toggleJ" />
            <v-icon v-else class="ic_modify_p" @click="toggleJ" />
        </div>
    </div>
</template>

<script>
import { mapState } from "pinia";
import { useUserStore } from "~/store/user";

export default {
    name: "ModifyMbti",
    data() {
        return {
            isE: true,
            isN: true,
            isT: true,
            isJ: true,
        };
    },
    computed: {
        ...mapState(useUserStore, ["user"]),
    },
    mounted() {
        this.isE = this.user.mbti[0] === "E";
        this.isN = this.user.mbti[1] === "N";
        this.isT = this.user.mbti[2] === "T";
        this.isJ = this.user.mbti[3] === "J";
    },
    methods: {
        toggleE() {
            this.isE = !this.isE;
            this.emitMbtiChange();
        },
        toggleN() {
            this.isN = !this.isN;
            this.emitMbtiChange();
        },
        toggleT() {
            this.isT = !this.isT;
            this.emitMbtiChange();
        },
        toggleJ() {
            this.isJ = !this.isJ;
            this.emitMbtiChange();
        },
        emitMbtiChange() {
            const mbti = `${this.isE ? "E" : "I"}${this.isN ? "N" : "S"}${
                this.isT ? "T" : "F"
            }${this.isJ ? "J" : "P"}`;
            this.$emit("mbtiSelected", mbti);
        },
    },
};
</script>

<style lang="scss" scoped>
.modify-mbti {
    margin-top: 40px;
    width: 100%;
}
.modify-mbti-title {
    color: var(--gray-700, #374151);
    font-family: "Pretendard Medium";
    font-size: 16px;
    line-height: 160%;
}
.modify-mbti-content {
    margin-top: 12px;
    height: 97px;
    gap: 20px;
    display: flex;
}
.ic_modify_e,
.ic_modify_n,
.ic_modify_t,
.ic_modify_j,
.ic_modify_i,
.ic_modify_s,
.ic_modify_f,
.ic_modify_p {
    height: 100%;
    width: 57px;
}
</style>
