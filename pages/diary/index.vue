<template>
    <div class="viewport">
        <v-icon class="ic_close" />

        <img
            class="image"
            src="	https://storage.googleapis.com/docent/f974e3e8-a7ce-4775-9a1a-b770cca7978d.png"
        />
    </div>
</template>
<script>
export default {
    name: "Diary",
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
