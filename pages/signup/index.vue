<template>
    <div class="wrap">
        <div>Signup</div>
        <input type="text" v-model="name" />
        <input type="text" v-model="mbti" />
        <div class="button" @click="save">버튼</div>
    </div>
</template>

<script setup>
import { useAuthService } from "../../services/auth";

const { changeNickname, changeMBTI } = useAuthService();
const router = useRouter();
const name = ref("");
const mbti = ref("");

const save = async () => {
    // Validation
    // API 호출
    console.log("name: ", name.value);
    console.log("mbti: ", mbti.value);

    const res1 = await changeNickname(name.value);
    const res2 = await changeMBTI(mbti.value);

    if (res1.success && res2.success) {
        router.push(`/home`);
    } else {
        const message = !res1.success ? res1.message : res2.message;
        alert(message);
    }

    console.log(res1);
    console.log(res2);
};
</script>

<style lang="scss" scoped></style>
