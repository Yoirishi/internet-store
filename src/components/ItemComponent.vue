<style scoped lang="scss">
  .v--item{
    flex-basis: 25%;
    box-shadow: 0 0 8px 0 #e0e0e0;
    padding: 12px;
    margin: 12px;
    height: 350px;
    background: white;
  }

  .v--item--button {
    border-radius: 4px;
    background: #9afbe9;
    width: 164px;
    height: 32px;

    &:hover {
      background: #28f1cc;
    }
  }

  .v--item--image {
    height: 150px;
  }
</style>


<template>
  <div class="v--item">
    <img
        :src="require('../assets/images/nomenclatures/'+nomenclature.id+'.jpg')"
        :alt="nomenclature.article"
        class="v--item--image"
    >
    <p>{{ nomenclature.name }}</p>
    <p>Price: {{ nomenclature.price }}</p>
    <p>Article : {{nomenclature.article}}</p>
    <slot></slot>
    <button class="v--item--button" v-if="!isBtnDisabled" @click="addItemToCart(nomenclature)">
      <slot name="btn"></slot>
    </button>
  </div>
</template>

<script>
import {Options, Vue} from "vue-class-component"

const Component = Options;
@Component({
  props: {
    nomenclature: Object,
    isBtnDisabled: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  emits: ["selectItem"]
})

export default class ItemComponent extends Vue {

  addItemToCart(object) {
    this.$emit("selectItem", object)
  }
}
</script>
