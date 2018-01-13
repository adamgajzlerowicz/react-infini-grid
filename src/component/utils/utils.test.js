import { isMobile, calculate } from './utils';

describe('Utils', () => {
  
  it('returns true', () => {
    const spy = jest.spyOn(document, 'createEvent');
    spy.mockReturnValue(true);
    
    expect(isMobile()).toEqual(true);
    expect(spy).toHaveBeenCalled();
    
    spy.mockReset();
    spy.mockRestore();
  });
  
  it('throws and returns false', () => {
    const createEvent = document.createEvent;

    document.createEvent = () => {
      throw 'dupa';
    };
    
    expect(isMobile()).toBe(false);    

    document.createEvent = createEvent;
  });
  


describe("Calculator", () => {
  it("calculates items in row", () => {
    expect(
      calculate.itemsInRow({ wrapperWidth: 1000, itemWidth: 250 })
    ).toEqual(4);
    expect(calculate.itemsInRow({ wrapperWidth: 999, itemWidth: 250 })).toEqual(
      3
    );
  });

  it("calculates correct wrapper height", () => {
    const calculated = calculate.wrapperHeight({
      wrapperWidth: 500,
      itemWidth: 250,
      itemHeight: 250,
      itemsCount: 50
    });
    expect(calculated).toEqual(6250);
  });

  it("should have function visibleItems that returns items that are visible", () => {
    const visibleItems = calculate.visibleItemIndices({
      itemsInRow: 2,
      totalItems: 8,
      itemHeight: 20,
      amountScrolled: 30,
      wrapperHeight: 20
    });

    expect(visibleItems).toEqual({ first: 3, last: 6 });
  });

  it("should have function visibleItems that returns items that are visible take_2", () => {
    const visibleItems = calculate.visibleItemIndices({
      itemsInRow: 3,
      totalItems: 11,
      itemHeight: 20,
      amountScrolled: 30,
      wrapperHeight: 20
    });

    expect(visibleItems).toEqual({ first: 4, last: 9 });
  });

  it("calculates space before", () => {
    const calculated = calculate.spaceBefore({
      first: 5,
      itemHeight: 20,
      itemsInRow: 2
    });
    expect(calculated).toEqual(40);
  });

  it("calculates space before", () => {
    const calculated = calculate.spaceBefore({
      first: 6,
      itemHeight: 20,
      itemsInRow: 1
    });
    expect(calculated).toEqual(100);
  });

  it("calculates space after", () => {
    const calculated = calculate.spaceAfter({
      last: 6,
      itemHeight: 20,
      itemsInRow: 2,
      containerHeight: 100
    });
    expect(calculated).toEqual(40);
  });

  it("calculates space after take 2", () => {
    const calculated = calculate.spaceAfter({
      last: 6,
      itemHeight: 20,
      itemsInRow: 3,
      containerHeight: 100
    });
    expect(calculated).toEqual(60);
  });
});

});
