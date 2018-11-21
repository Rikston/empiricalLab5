let _root = new Vue({
  el: "#root",
  data: {
    currentData: MyVersion_20,
    title: "Lab 4",
    matrix: null,
    averageRow: [],
    averageCol: [],
    average: 0,
    estimates: null,
    n: 9,
    m: 4
  },
  computed: {
    Name: function() {
      return this.title + this.currentData.join(" ");
    },
    tableData: function() {
      let s = this.currentData.length;
      let result = [
        ["", "Напрямок", "Середнє"],
        ["Час", "1             2             3              4", ""]
      ];
      let estimates = null;

      this.averageRow.splice(0, this.averageRow.length);
      this.average = 0;
      this.matrix = this.parseData(this.n, this.m);
      this.matrix.forEach((it, ind) => {
        let temp = it.reduce((pre, cur) => pre + cur, 0) / it.length;
        this.average += temp;
        this.averageRow.push(temp);
        result.push([ind + 1, it.join("      "), temp]);
      });
      this.averageCol = this.AverageCol(4);
      this.average /= this.averageRow.length;
      result.push(["Середнє", this.averageCol.join("      "), ""]);
      return result;
    },
    information: function() {
      this.estimates = this.Estimates();
      let result = [];
      let Fa = this.estimates.S1 / this.estimates.S3;
      let Fb = this.estimates.S2 / this.estimates.S3;
      result.push([
        `Середнє значення - x = ${this.average.toFixed(2)}`,
        `Q = Q1 + Q2 + Q3 = ${this.estimates.Q1.toFixed(
          3
        )} + ${this.estimates.Q2.toFixed(3)} + ${this.estimates.Q3.toFixed(
          3
        )} = ${(
          this.estimates.Q1 +
          this.estimates.Q2 +
          this.estimates.Q3
        ).toFixed(2)}`
      ]);
      result.push([`Незмінні оцінки`]);
      result.push([
        `S^2 = Q/(mn - 1) = ${(
          this.estimates.Q /
          (this.m * this.n - 1)
        ).toFixed(2)}`,
        `S1^2 = Q1/(m - 1) = ${this.estimates.S1.toFixed(2)}`,
        `S2^2 = Q2/m*(n - 1) = ${this.estimates.S2.toFixed(3)}`,
        `S3^2 = Q3/(m - 1)*(n - 1) = ${this.estimates.S3.toFixed(3)}`
      ]);
      result.push(["Оцінка фактора"]);
      if (Fa <= 5.6136)
        result.push([
          `${Fa.toFixed(
            4
          )} <= 5.6136, α = 0.01 (фактор не впливає на результати вимірювань)`
        ]);
      else
        result.push([
          `${Fa.toFixed(
            4
          )} > 5.6136, α = 0.01 (фактор суттєво впливає на результати вимірювань)`
        ]);
      if (Fa <= 3.0088)
        result.push([
          `${Fa.toFixed(
            4
          )} <=  3.0088, α = 0.05 (фактор не впливає на результати вимірювань)`
        ]);
      else
        result.push([
          `${Fa.toFixed(
            4
          )} >  3.0088, α = 0.05 (фактор суттєво впливає на результати вимірювань)`
        ]);
      /* ------------------------------------------------------------------------------------------------------*/
      if (Fb <= 3.3629)
        result.push([
          `${Fb.toFixed(
            4
          )} <= 3.3629, α = 0.01 (фактор не впливає на результати вимірювань)`
        ]);
      else
        result.push([
          `${Fb.toFixed(
            4
          )} > 3.3629, α = 0.01 (фактор суттєво впливає на результати вимірювань)`
        ]);
      if (Fb <= 2.3551)
        result.push([
          `${Fb.toFixed(
            4
          )} <=  2.3551, α = 0.05 (фактор не впливає на результати вимірювань)`
        ]);
      else
        result.push([
          `${Fb.toFixed(
            4
          )} >  2.3551, α = 0.05 (фактор суттєво впливає на результати вимірювань)`
        ]);
      return result;
    }
  },
  methods: {
    ran: function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    changeTitle: function() {
      let newTitle = "";
      for (let i = 0; i < 4; ++i) {
        let code = this.ran(97, 122);
        console.log(code);
        newTitle += String.fromCharCode(code);
      }
      this.title = newTitle;
    },
    parseData: function(R, C) {
      let result = [];

      for (let i = 0, a = 0; i < R; ++i) {
        result[i] = [];
        for (let j = 0; j < C; ++j) {
          result[i].push(this.currentData[a++]);
        }
      }
      return result;
    },
    Average: function() {
      return;
    },
    AverageCol: function(fix) {
      if (this.matrix == null) {
        console.error("matrix is null");
        return ["Error"];
      }
      for (let i = 0; i < this.matrix[0].length; ++i) {
        let averageColTemp = 0;
        for (let j = 0; j < this.matrix.length; ++j) {
          averageColTemp += this.matrix[j][i];
        }
        this.averageCol.push(
          Number((averageColTemp / this.n).toFixed(fix || 3))
        );
      }
      return this.averageCol;
    },
    Estimates() {
      let result = { Q: 0, Q1: 0, Q2: 0, Q3: 0, S1: 0, S2: 0, S3: 0 };

      this.averageRow.forEach(i => {
        result.Q1 += (i - this.average) ** 2;
      }, this);

      result.Q1 *= this.m;
      result.S1 = result.Q1 / (this.m - 1);

      this.averageCol.forEach(i => {
        result.Q2 += (i - this.average) ** 2;
      }, this);
      result.Q2 *= this.n;
      result.S2 = result.Q2 / (this.n - 1);

      this.matrix.forEach((it, i) => {
        it.forEach((val, j) => {
          result.Q3 +=
            (val - this.averageRow[i] - this.averageCol[j] - this.average) ** 2;
        }, this);
      }, this);
      result.S3 = result.Q3 / ((this.n - 1) * (this.m - 1));
      result.Q = result.Q3 + result.Q2 + result.Q1;
      return result;
    }
  }
});
