<style scoped lang="scss">
  .cart-wrapper{
    display: grid;
    grid-template-columns: 66fr 34fr;
  }


  .cart-items-wrapper
  {
  }

  .v-control-panel
  {

  }

  .v-register{
    display: block;
    width: calc(100% - 24px);
    outline: none;
    border: none;
    box-shadow: 0 0 8px 0 darkcyan;
    padding: 12px;
    margin: 12px;
    background-color: white;

    &:hover{
      background-color: #9afbe9;
    }

    &:active{
      background-color: #28f1cc;
    }
  }

  .v-reset {
    display: block;
    width: calc(100% - 24px);
    outline: none;
    border: none;
    box-shadow: 0 0 8px 0 lightcoral;
    padding: 12px;
    margin: 12px;
    background-color: white;

    &:hover{
      background-color: lightsalmon;
    }

    &:active{
      background-color: coral;

    }
  }

  .v-btn-decrease
  {
    position: relative;
    border-radius: 8px;
    display: inline-block;
    outline: none;
    border: none;
    box-shadow: 0 0 8px 0 lightcoral;
    padding: 12px;
    margin: 12px;
    background-color: white;
    width: 16px;
    height: 16px;

    justify-items: center;
    justify-self: center;

    &:hover{
      background-color: lightsalmon;
    }

    &:active{
      background-color: coral;

    }

    &:disabled{
      background-color: #efe9e9;
      box-shadow: none;
    }

    span
    {
      position: absolute;
      top: 5px;
      left: 9px;
    }
  }

  .v-btn-increase
  {
    position: relative;
    border-radius: 8px;
    display: inline-block;
    outline: none;
    border: none;
    box-shadow: 0 0 8px 0 darkcyan;
    padding: 12px;
    margin: 12px;
    background-color: white;
    width: 16px;
    height: 16px;

    justify-items: center;
    justify-self: center;

    &:hover
    {
      background-color: #9afbe9;
    }

    &:active
    {
      background-color: #28f1cc;
    }

    span
    {
      position: absolute;
      top: 5px;
      left: 8px;
    }
  }

  .v-total
  {
    box-shadow: 0 0 8px 0 #e0e0e0;
    padding: 12px;
    margin: 12px;
  }

  .v-cart-view
  {
    overflow: scroll;
    &::-webkit-scrollbar
    { /* Hide scrollbar for Chrome, Safari and Opera */
      display: none;
    }

    height: 720px;

    -ms-overflow-style: none;  /* Hide scrollbar for IE and Edge */
    scrollbar-width: none;  /* Hide scrollbar for Firefox */

  }

  .v-cart-view-items {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .v-count-wrapper {
    display: flex;
    justify-content: center;
  }
</style>


<template>
  <div class="cart-wrapper">
    <div class="v-cart-view">
      <div
          class="cart-items-wrapper"
          v-for="(item, id) in cart.items"
          :key="id"
      >
        <item-component
            v-if="item != null"
            :nomenclature="item"
            @selectItem = "deleteItemFromCart"
        >
          <div class="v-count-wrapper">
            <button
                class="v-btn-decrease"
                @click="decreaseCountForItem(item)"
                :disabled="item.count === 1"
            >
              <span>-</span>
            </button>
            <p>Count: {{item.count}}</p>
            <button
                class="v-btn-increase"
                @click="increaseCountForItem(item)"
            >
             <span>+</span>
            </button>
          </div>
          <template v-slot:btn>Remove from cart</template>
        </item-component>
      </div>
    </div>
    <div class="v-control-panel">
      <div class="v-total">
        Total payment: {{cart.total}}
      </div>
      <button
          class="v-register"
          @click="registerOrder"
      >
        Register!
      </button>
      <button
          class="v-reset"
          @click="clearCart"
      >
        Clear cart
      </button>
    </div>
  </div>
</template>

<script>
import {Options, Vue} from "vue-class-component"
import ItemComponent from "./ItemComponent"
import axios from "axios";

import {inject} from "vue";

const Component = Options;
@Component({
  props: {},
  components: {
    ItemComponent
  }
})

export default class Cart extends Vue {
  cart = inject('cart');

  deleteItemFromCart(arg)
  {
    const id = arg.id;
    this.cart.items[id] = null;
    this.cart.total -= Math.floor(arg.price)*arg.count;
  }

  decreaseCountForItem(arg)
  {
    const id = arg.id;
    if (this.cart.items[id].count > 1)
    {
      this.cart.items[id].count--;
    } else
    {
      this.cart.items[id] = null;
      //TODO add handler for block decrease btn
    }
    this.cart.total -= Math.floor(arg.price);
  }

  increaseCountForItem(arg)
  {
    const id = arg.id;
    this.cart.items[id].count++;
    this.cart.total += Math.floor(arg.price);
  }

  clearCart()
  {
    for (let i = 0; i < this.cart.items.length; i++)
    {
      this.cart.items[i] = null
    }
    this.cart.total = 0;
  }

  registerOrder()
  {
    if (this.cart.items.length > 0) {
      const date = new Date();
      axios.post('http://localhost:3000/Orders', {
        date: date,
        order: this.cart
      })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      this.clearCart();
    }
  }
}
</script>
