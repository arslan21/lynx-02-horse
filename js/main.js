var app = new Vue({
  el: '.app',
  data: {
    position: 'D4',
    modalOpened: false,
    result: 'result here',
    coord: {
      'A': 1,
      'B': 2,
      'C': 3,
      'D': 4,
      'E': 5,
      'F': 6,
      'G': 7,
      'H': 8,
    },
    // Список всех возможных вариантов l-смещение по букве n-по цифре
    movs: [
      {
        l: 2,
        n: 1
      },
      {
        l: 2,
        n: -1
      },
      {
        l: 1,
        n: 2
      },
      {
        l: 1,
        n: -2
      },
      {
        l: -1,
        n: 2
      },
      {
        l: -1,
        n: -2
      },
      {
        l: -2,
        n: 1
      },
      {
        l: -2,
        n: -1
      }
    ]
  },
  methods: {
    //получение вариантов ходов без учета границ поля
    getVariants(position) {
      var arr = position.split('');
      var letter = arr[0];
      var num = arr[1];
      if (arr.length == 2) {
        if (letter in this.coord && num >=1 && num<=8) {
          var pos = {
            l: this.coord[letter],
            n: num
          };
          return this.moveVariants(pos);
        } else {
          return "Введите праильное значение"
        }
      }
      else {
        return "Введите праильное значение"
      }
    },
    //устранение лишних вариантов
    moveVariants(pos) {
      var res = [];
      for (i = 0; i < this.movs.length; i++) {
        var move = this.movs[i];
        var lNew = +pos.l + move.l;
        var nNew = +pos.n + move.n;

        if (lNew >=1 && lNew<=8 && nNew >=1 && nNew<=8) {
          res.push({l: lNew, n:nNew});
        }
      }
      return res;
    },
    // преобразование координаты в название ячейки
    parsCoord(variants) {
      var variantsArray = [];
      var coordKeys = Object.keys(this.coord);
      for (var i = 0; i < variants.length; i++) {
        var variant = variants[i];
        for (var j = 0; j < coordKeys.length; j++) {
          var coordKey = coordKeys[j]
          if (this.coord[coordKey] == variant.l) {
            variantsArray[i] = coordKey + variant.n;
          }
        }
      }
      debugger
      return variantsArray;
    },
    showResult () {
      var resultCoords = this.getVariants(this.position);
      var resultSells = this.parsCoord(resultCoords)
      this.result = resultSells.join(', ');
      this.modalOpened = true;
    },
    closeResult () {
      this.modalOpened = false;
    }
  }
})
