<template>
    <div class="viewport">
        <v-icon class="ic_close" @click="close" />

        <img
            class="image"
            src="	https://storage.googleapis.com/docent/f974e3e8-a7ce-4775-9a1a-b770cca7978d.png"
            @click="open"
        />

        <bottom-sheet ref="myBottomSheet">
            <h1>Lorem Ipsum</h1>
            <h2>What is Lorem Ipsum?</h2>
            <p><strong>Lorem Ipsum</strong> is simply dummy text</p>
            <h1>Lorem Ipsum</h1>
            <h2>What is Lorem Ipsum?</h2>
            <p><strong>Lorem Ipsum</strong> is simply dummy text</p>
            <h1>Lorem Ipsum</h1>
            <h2>What is Lorem Ipsum?</h2>
            <p><strong>Lorem Ipsum</strong> is simply dummy text</p>
            <h1>Lorem Ipsum</h1>
            <h2>What is Lorem Ipsum?</h2>
            <p><strong>Lorem Ipsum</strong> is simply dummy text</p>
            <h1>Lorem Ipsum</h1>
            <h2>What is Lorem Ipsum?</h2>
            <p><strong>Lorem Ipsum</strong> is simply dummy text</p>
            <h1>Lorem Ipsum</h1>
            <h2>What is Lorem Ipsum?</h2>
            <p><strong>Lorem Ipsum</strong> is simply dummy text</p>
            <h1>Lorem Ipsum</h1>
            <h2>What is Lorem Ipsum?</h2>
            <p><strong>Lorem Ipsum</strong> is simply dummy text</p>
            <h1>Lorem Ipsum</h1>
            <h2>What is Lorem Ipsum?</h2>
            <p><strong>Lorem Ipsum</strong> is simply dummy text</p>
            <hr />
            <p><strong>Lorem Ipsum</strong> is simply dummy text</p>
            <h1>Lorem Ipsum</h1>
            <h2>What is Lorem Ipsum?</h2>
            <p><strong>Lorem Ipsum</strong> is simply dummy text</p>
            <h1>Lorem Ipsum</h1>
            <h2>What is Lorem Ipsum?</h2>
            <p><strong>Lorem Ipsum</strong> is simply dummy text</p>
            <p><strong>Lorem Ipsum</strong> is simply dummy text</p>
            <h1>Lorem Ipsum</h1>
            <h2>What is Lorem Ipsum?</h2>
            <p><strong>Lorem Ipsum</strong> is simply dummy text</p>
            <h1>Lorem Ipsum</h1>
            <h2>What is Lorem Ipsum?</h2>
            <p><strong>Lorem Ipsum</strong> is simply dummy text</p>
            <p><strong>Lorem Ipsum</strong> is simply dummy text</p>
            <h1>Lorem Ipsum</h1>
            <h2>What is Lorem Ipsum?</h2>
            <p><strong>Lorem Ipsum</strong> is simply dummy text</p>
            <h1>Lorem Ipsum</h1>
            <h2>What is Lorem Ipsum?</h2>
            <p><strong>Lorem Ipsum</strong> is simply dummy text</p>
        </bottom-sheet>
    </div>
</template>
<script setup>
// import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
// export default {
//     name: "Diary",
//     components: { VueBottomSheet },
//     setup(){
//         const myBottomSheet = ref(null)

//         return {
//             myBottomSheet
//         }
//     },
//     methods: {
//         open() {
//             myBottomSheet.value.open();
//         },
//         close() {
//             myBottomSheet.value.close();
//         },
//     },
// };

// import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import BottomSheet from "../../components/BottonSheet.vue";
import { ref } from "vue";

const myBottomSheet = ref(null);

const open = () => {
    myBottomSheet.value.open();
};

const close = () => {
    myBottomSheet.value.close();
};
</script>
<style lang="scss" scoped>
.viewport {
    background-color: rgba(0, 0, 0, 0.4);
    position: relative;
    align-items: center;
    justify-content: center;
}

.ic_close {
    font-size: 14px;

    margin: 2.5rem;
    position: absolute;
    left: 0;
    top: 0;
}

.image {
    width: 80%;
    border-radius: 0.94rem;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    margin-bottom: 5rem;
}
</style>
