Vue.component("output-data", {
  props: ["info"],
  template: `
        <div class="container">
            <div class="row" v-for="item of info">
                <div class="row-item" v-for="i in item">{{i}}</div>
            </div>
        </div>
    `
});
