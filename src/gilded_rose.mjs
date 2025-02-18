export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      //So we can skip it already and don't need tests later
      if (this.items[i].name == "Sulfuras, Hand of Ragnaros") {
        continue;
      }

      //Decrease quality if not concert or brie
      if (this.items[i].name != "Aged Brie" && this.items[i].name != "Backstage passes to a TAFKAL80ETC concert") {
          this.items[i].quality = this.decreaseQuality(this.items[i].quality);
          if(this.items[i].name.includes("Conjured")){
            this.items[i].quality = this.decreaseQuality(this.items[i].quality);
          }
      }
      else {
          this.items[i].quality = this.increaseQuality(this.items[i].quality);
          if (this.items[i].name == "Backstage passes to a TAFKAL80ETC concert") {
            if (this.items[i].sellIn < 11) {
              this.items[i].quality = this.increaseQuality(this.items[i].quality);
            }
            if (this.items[i].sellIn < 6) {
                this.items[i].quality = this.increaseQuality(this.items[i].quality);
            }
          }
      }
      this.items[i].sellIn = this.items[i].sellIn - 1;
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != "Aged Brie") {
          if (this.items[i].name != "Backstage passes to a TAFKAL80ETC concert") {
                this.items[i].quality = this.decreaseQuality(this.items[i].quality);
                if(this.items[i].name.includes("Conjured")){
                  this.items[i].quality = this.decreaseQuality(this.items[i].quality);
                }
          } else {
            this.items[i].quality = 0;
          }
        } else {
          this.items[i].quality = this.increaseQuality(this.items[i].quality);
        }
      }
    }
    return this.items;
  }

  increaseQuality(quality){
    if(quality<50){
      return quality+1;
    }
    return 50;
  }

  decreaseQuality(quality){
    if(quality>0){
      return quality-1;
    }
    return 0;
  }
}
