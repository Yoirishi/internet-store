<style scoped lang="scss">
  .v--catalog {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
</style>


<template>
  <div class="v--catalog">
    <item-component
        v-for="item in nomenclatures"
        :key="item.id"
        :nomenclature="item"
        @selectItem = "addItemToCart"
    >
      <template v-slot:btn>Add to cart</template>
    </item-component>
  </div>
</template>

<script>
import ItemComponent from "./ItemComponent"
import {Options, Vue} from "vue-class-component"
import axios from "axios";
import {inject} from "vue";

const Component = Options;
@Component({
  props: {},
  components: {
    ItemComponent
  }

})

export default class Catalog extends Vue
{
 cart = inject('cart');

  nomenclatures = [];

  addItemToCart(arg)
  {
    const id = arg.id
    if (this.cart.items[id])
    {
      this.cart.items[id].count++;
    } else
    {
      arg.count = 1;
      this.cart.items[id] = arg;
    }
    this.cart.total+=Math.floor(arg.price)
  }



  beforeMount() {
    axios('http://localhost:3000/Nomenclatures', {
      method: "GET"
    }).then((items) => {
      console.log("200 OK")
      this.nomenclatures = items.data;
    }).catch((error) => {
      console.log("An error occurred while processing the request: ", error)
    });
  }
}
</script>
