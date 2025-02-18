import { describe, test } from "vitest";
import { expect } from "chai";
import { Item, Shop } from "../src/gilded_rose.mjs";

describe("General tests", () => {
  test("No item test", () => {
    const gildedRose = new Shop();
    const items = gildedRose.updateQuality();
    expect(items.length).to.equal(0);
  });

  test("Multiple item test", () => {
    const gildedRose = new Shop([new Item("Warglaives of Azinoth", 5, 10),new Item("Tears of Queen Azshara", 0, 10)]);
    let items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Warglaives of Azinoth");
    expect(items[0].sellIn).to.equal(4);
    expect(items[0].quality).to.equal(9);

    expect(items[1].name).to.equal("Tears of Queen Azshara");
    expect(items[1].sellIn).to.equal(-1);
    expect(items[1].quality).to.equal(8);
  });
});

describe("Sulfuras tests", () => {
  test("No decrease", () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Sulfuras, Hand of Ragnaros");
    expect(items[0].sellIn).to.equal(0);
    expect(items[0].quality).to.equal(80);
  });

  test("No decrease2", () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 5, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Sulfuras, Hand of Ragnaros");
    expect(items[0].sellIn).to.equal(5);
    expect(items[0].quality).to.equal(80);
  });
});

describe("Aged Brie tests", () => {
  test("Regular tick", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 10, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Aged Brie");
    expect(items[0].sellIn).to.equal(9);
    expect(items[0].quality).to.equal(21);
  });

  test("Quality would go above 50", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 10, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Aged Brie");
    expect(items[0].sellIn).to.equal(9);
    expect(items[0].quality).to.equal(50);
  });

  test("SellIn reached 0", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 32)]);
    let items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Aged Brie");
    expect(items[0].sellIn).to.equal(0);
    expect(items[0].quality).to.equal(33);


  });

  test("SellIn bellow 0", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 32)]);
    let items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Aged Brie");
    expect(items[0].sellIn).to.equal(0);
    expect(items[0].quality).to.equal(33);
    
    items = gildedRose.updateQuality();
    
    expect(items[0].name).to.equal("Aged Brie");
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(35);

    items = gildedRose.updateQuality();
    
    expect(items[0].name).to.equal("Aged Brie");
    expect(items[0].sellIn).to.equal(-2);
    expect(items[0].quality).to.equal(37);

    items = gildedRose.updateQuality();
    
    expect(items[0].name).to.equal("Aged Brie");
    expect(items[0].sellIn).to.equal(-3);
    expect(items[0].quality).to.equal(39);
  });
});

describe("Concert tests", () => {
  test("Regular tick", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Backstage passes to a TAFKAL80ETC concert");
    expect(items[0].sellIn).to.equal(14);
    expect(items[0].quality).to.equal(21);
  });

  test("Concert will be in less than 11 days test", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 20)]);
    let items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Backstage passes to a TAFKAL80ETC concert");
    expect(items[0].sellIn).to.equal(10);
    expect(items[0].quality).to.equal(21);

    items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Backstage passes to a TAFKAL80ETC concert");
    expect(items[0].sellIn).to.equal(9);
    expect(items[0].quality).to.equal(23);
  });

  test("Concert will be in less than 11 days, but 50 quality test", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 50)]);
    let items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Backstage passes to a TAFKAL80ETC concert");
    expect(items[0].sellIn).to.equal(9);
    expect(items[0].quality).to.equal(50);

    items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Backstage passes to a TAFKAL80ETC concert");
    expect(items[0].sellIn).to.equal(8);
    expect(items[0].quality).to.equal(50);
  });

  test("Concert 5 days or less test", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 6, 20)]);
    let items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Backstage passes to a TAFKAL80ETC concert");
    expect(items[0].sellIn).to.equal(5);
    expect(items[0].quality).to.equal(22);

    items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Backstage passes to a TAFKAL80ETC concert");
    expect(items[0].sellIn).to.equal(4);
    expect(items[0].quality).to.equal(25);
    
    items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Backstage passes to a TAFKAL80ETC concert");
    expect(items[0].sellIn).to.equal(3);
    expect(items[0].quality).to.equal(28);
  });

  test("Concert 5 days or less and expires test", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 2, 45)]);
    let items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Backstage passes to a TAFKAL80ETC concert");
    expect(items[0].sellIn).to.equal(1);
    expect(items[0].quality).to.equal(48);

    items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Backstage passes to a TAFKAL80ETC concert");
    expect(items[0].sellIn).to.equal(0);
    expect(items[0].quality).to.equal(50);
    
    items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Backstage passes to a TAFKAL80ETC concert");
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(0);

    items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Backstage passes to a TAFKAL80ETC concert");
    expect(items[0].sellIn).to.equal(-2);
    expect(items[0].quality).to.equal(0);
  });
});

describe("General item test", () => {
  test("Warglaives of Azinoth (also legendary, but who cares) test", () => {
    const gildedRose = new Shop([new Item("Warglaives of Azinoth", 5, 10)]);
    let items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Warglaives of Azinoth");
    expect(items[0].sellIn).to.equal(4);
    expect(items[0].quality).to.equal(9);
  });

  test("Expired test", () => {
    const gildedRose = new Shop([new Item("Warglaives of Azinoth", 1, 10)]);
    let items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Warglaives of Azinoth");
    expect(items[0].sellIn).to.equal(0);
    expect(items[0].quality).to.equal(9);

    items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Warglaives of Azinoth");
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(7);
  });

  test("Quality can't be negative test", () => {
    const gildedRose = new Shop([new Item("Warglaives of Azinoth", 1, 2)]);
    let items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Warglaives of Azinoth");
    expect(items[0].sellIn).to.equal(0);
    expect(items[0].quality).to.equal(1);

    items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Warglaives of Azinoth");
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(0);
  });
});