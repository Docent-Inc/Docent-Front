<template>
    <div>
        <div class="term-all-box" :class="{ checked: checkboxes[0].isChecked }">
            <input
                type="checkbox"
                :id="checkboxes[0].id"
                v-model="checkboxes[0].isChecked"
                @change="toggleAllCheckboxes"
            />
            <label :for="checkboxes[0].id">{{ checkboxes[0].label }}</label>
        </div>

        <div
            v-for="(checkbox, index) in checkboxes.slice(1)"
            :key="index"
            class="term-each-box"
            :class="{ checked: checkbox.isChecked }"
        >
            <div>
                <input
                    type="checkbox"
                    :id="checkbox.id"
                    v-model="checkbox.isChecked"
                    @change="emitCheckedInfo"
                />
                <label :for="checkbox.id">
                    <span v-html="formatLabel(checkbox.label)"></span>
                    <span class="required"> (필수) </span>
                </label>
            </div>
            <button
                v-if="checkbox.content"
                type="button"
                class="term-contents-btn"
                @click="() => handleMoveToBrowser(checkbox.content)"
            >
                <v-icon />
            </button>
        </div>
    </div>
</template>

<script>
export default {
    emits: ["all-checkboxes-checked"],
    data() {
        return {
            step: 0,
            checkboxes: [
                {
                    id: "all",
                    isChecked: false,
                    label: "약관을 모두 확인하였으며 동의합니다.",
                },
                {
                    id: "age",
                    isChecked: false,
                    label: "저는 /만 14세/ 이상입니다. ",
                },
                {
                    id: "service",
                    isChecked: false,
                    label: "/서비스 이용약관/에 동의합니다. ",
                    content:
                        "https://docent-ai.notion.site/53a465da1ef04985aabba86fdfb5d388",
                },
                {
                    id: "location",
                    isChecked: false,
                    label: "/위치정보 이용약관/에 동의합니다. ",
                    content:
                        "https://docent-ai.notion.site/bdd51533f0424658ac5c52b4cc067cad",
                },
                {
                    id: "privacy",
                    isChecked: false,
                    label: "/개인정보 처리방침/에 동의합니다. ",
                    content:
                        "https://plip.kr/pcc/8b1e0260-0825-4ad2-9c76-ffb19900885b/privacy/4.html",
                },
            ],
            showIframe: false,
        };
    },

    methods: {
        toggleAllCheckboxes() {
            const isChecked = this.checkboxes[0].isChecked;

            this.checkboxes.slice(1).forEach((checkbox) => {
                checkbox.isChecked = isChecked;
            });
            this.emitCheckedInfo();
        },
        emitCheckedInfo() {
            this.$emit("all-checkboxes-checked", this.allChecked);
        },
        allChecked() {
            const isAllChecked = this.checkboxes
                .slice(1)
                .every((checkbox) => checkbox.isChecked);

            if (isAllChecked) {
                this.checkboxes[0].isChecked = true;
            } else {
                this.checkboxes[0].isChecked = false;
            }

            return isAllChecked;
        },
        formatLabel(label) {
            const parts = label.split("/");
            return parts
                .map((part, index) => {
                    if (index % 2 === 1) {
                        return `<strong>${part}</strong>`;
                    }
                    return part;
                })
                .join("");
        },
        handleMoveToBrowser(link) {
            const newTab = window.open(link, "_blank");
            if (newTab) {
                newTab.opener = null;
                newTab.referrerPolicy = "no-referrer";
                newTab.location.href = serviceCheckbox.content;
            }
        },
    },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/mixins.scss";

.term-all-box {
    border: 1px solid $vc-indigo-500;
    color: $vc-indigo-500;
    font-family: $font-medium;
    height: 60px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    margin-bottom: 2.4rem;
    transition: background-color 0.3s ease;

    &.checked {
        background: $vc-indigo-50;
        border: none;
    }
}

.term-each-box {
    color: $vc-gray-700;
    font-family: $font-medium;
    height: 28px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.4rem;
    font-size: 1.5rem;

    .required {
        font-size: 1.4rem;
        color: $vc-indigo-500;
    }

    &:last-child {
        margin-bottom: 6rem;
    }

    .term-contents-btn {
        i {
            background: url("../../assets/images/commons/ic_arrow_small_right.svg")
                no-repeat center/cover;
        }
    }
}

input[type="checkbox"] {
    width: 22px;
    height: 22px;
    border-radius: 6px;
    margin: 0 1.2rem;

    &:before {
        content: "\2713";
        display: block;
        color: $vc-gray-400;
        text-align: center;
        line-height: 22px;
        font-size: 2.3rem;
    }

    &:checked {
        background: $vc-indigo-100;

        &:before {
            color: $vc-indigo-500;
        }
    }
}
</style>
