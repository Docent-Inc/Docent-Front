<template>
    <div class="viewport">
        <v-icon class="ic_close" @click="close" />

        <img
            class="image"
            src="https://storage.googleapis.com/docent/f974e3e8-a7ce-4775-9a1a-b770cca7978d.png"
            @click="open"
        />

        <bottom-sheet ref="myBottomSheet" :overlay="false">
            <div>
                <div class="diary-title">The Garden</div>
                <div class="diary-date">2023.08.26</div>

                <div class="diary-tags">
                    <div class="tag">tags</div>
                    <div class="tag">tags</div>
                    <div class="tag">tags</div>
                    <div class="tag">tags</div>
                </div>

                <div class="diary-subtitle">Artist Note</div>
                <div class="diary-content">
                    Lorem ipsum dolor sit amet consectetur. Vestibulum tellus eu
                    at praesent risus velit lectus ut risus. Eget cras dui proin
                    fames at amet. Viverra sed etiam donec at nibh amet vel
                    morbi iaculis. Convallis mauris integer proin eget pretium
                    at. Sit venenatis risus lorem sit non. Aliquam semper ut eu
                    amet amet eget phasellus fringilla quisque. Bibendum
                    molestie dui ac lacus massa. Commodo blandit nam praesent
                    vitae ut aenean magna justo nibh. Consectetur nisl lacus sed
                    rhoncus nunc.
                </div>

                <hr />
                <div class="diary-subtitle">Detail</div>
                <div class="diary-content">
                    Lorem ipsum dolor sit amet consectetur. Vestibulum tellus eu
                    at praesent risus velit lectus ut risus. Eget cras dui proin
                    fames at amet. Viverra sed etiam donec at nibh amet vel
                    morbi iaculis. Convallis mauris integer proin eget pretium
                    at. Sit venenatis risus lorem sit non. Aliquam semper ut eu
                    amet amet eget phasellus fringilla quisque. Bibendum
                    molestie dui ac lacus massa. Commodo blandit nam praesent
                    vitae ut aenean magna justo nibh. Consectetur nisl lacus sed
                    rhoncus nunc.
                </div>
            </div>
        </bottom-sheet>
    </div>
</template>
<script setup>
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
    margin-bottom: 10rem;
}

.diary-tags {
    display: flex;
    width: 100%;
    overflow-x: scroll;
    margin: 1.61rem 0 2.97rem 0;

    .tag {
        border-radius: 20px;
        border: 1px solid #000;

        color: #000;
        font-family: Pretendard;
        font-size: 14px;

        line-height: 21px; /* 150% */
        padding: 0.3rem 0.8rem;
        margin-right: 0.5rem;
    }
}

hr {
    width: 100%;
    height: 1px;
    background: #757575;
    margin: 2rem 0;
}
</style>
