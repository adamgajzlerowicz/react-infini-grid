// @flow 

interface CalculateWrapperHeightType {
  wrapperWidth: number;
  itemWidth: number;
  itemHeight: number;
  itemsCount: number;
}

interface CalculateVisibleItemsType {
  totalItems: number;
  itemsInRow: number;
  wrapperHeight: number;
  amountScrolled: number;
  itemHeight: number;
}

interface CalculateSpaceBeforeType {
  itemHeight: number;
  itemsInRow: number;
  first: number;
}

interface CalculateSpaceAfterType {
  itemHeight: number;
  containerHeight: number;
  itemsInRow: number;
  last: number;
}

const calculate = {
  
  wrapperHeight: ({ wrapperWidth, itemWidth, itemHeight, itemsCount }: CalculateWrapperHeightType) => {
    const itemsInRow = calculate.itemsInRow({ wrapperWidth, itemWidth });
    const rowsTotal = itemsCount && itemsInRow ? Math.ceil(itemsCount / itemsInRow) : 0;
    return rowsTotal * itemHeight;
  },
  
  itemsInRow: ({ wrapperWidth, itemWidth }:{wrapperWidth: number, itemWidth:number}) => {
    return wrapperWidth && itemWidth ? Math.floor(wrapperWidth / itemWidth) : 0;
  },
  
  visibleItemIndices: ({ totalItems, itemsInRow, itemHeight, wrapperHeight, amountScrolled }: CalculateVisibleItemsType) => {
    const first = Math.floor(amountScrolled / itemHeight) * itemsInRow + 1; 
    let last =  Math.ceil((amountScrolled + wrapperHeight) / itemHeight) * itemsInRow;  
    
    if (last > totalItems) {
      last = totalItems;
    }
    
    return { first, last }; 
  },
  
  spaceBefore: ({ first, itemHeight, itemsInRow }: CalculateSpaceBeforeType) => {
    const result =  itemHeight * (first - 1) / itemsInRow;
    if (result && result > 0 && result !== Infinity) {
      return result;
    }
    return 0;
  },
  
  spaceAfter: ({ last, itemHeight, itemsInRow, containerHeight } : CalculateSpaceAfterType) => {
    const result = containerHeight - last * itemHeight / itemsInRow;
    if (result === Infinity || isNaN(result) || result < itemHeight) {
      return 0;
    }
    return result;
  },
  
};


const isMobile = (): boolean => {
  try {
    document.createEvent('TouchEvent');
    return true;  
  } catch (error) {
    return false; 
  }
};

export {
    isMobile, calculate
};
