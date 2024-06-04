import { SortType, type ReorderOptions } from "./types";

function reverser(goods: string[]) {
    goods.reverse();
    return goods;
  }

export function getReorderedGoods(
    goods: string[],
    { sortType, isReversed }: ReorderOptions,
  ) {
    // To avoid the original array mutation
    const visibleGoods = [...goods];
  
    switch (sortType) {
      case SortType.NONE:
        break;
      case SortType.ALPHABET:
        visibleGoods.sort((a, b) => a.localeCompare(b));
        break;
      case SortType.LENGTH:
        visibleGoods.sort((a, b) => a.length - b.length);
        break;
    }
  
    isReversed && reverser(visibleGoods);
  
    return visibleGoods;
  } 