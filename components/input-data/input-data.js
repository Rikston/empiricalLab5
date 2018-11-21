Vue.component("input-data", {
  props: ["c_data"],
  template: `
        <div class="input-data-box" v-bind:class={hide:!visible} v-on:mouseover="over" v-on:mouseleave="leave">
            <div class="input-data" contenteditable="true">{{c_data.join(" ")}}</div>
            <button class="confirm-data" v-on:click="confirm">confirm</button>
        </div>
    `,
  data: function() {
    return {
      visible: false
    };
  },
  methods: {
    confirm: function(e) {
      console.log(this.$el.querySelector(".input-data").textContent.split(" "));
      this.c_data.length = 0; // this.c_data.splice(0, this.c_data.length);
      let input_data = this.$el.querySelector(".input-data");
      input_data.textContent.split(" ").forEach(i => {
        this.c_data.push(Number(i));
      });
      input_data.textContent = this.c_data.join(" ");
      console.log(this.c_data);
    },
    over: function() {
      this.visible = true;
    },
    leave: function() {
      this.visible = false;
    }
  }
});
