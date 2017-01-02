'use strict';
import {reducers} from '../src/reducers';
import actions from '../src/actions';
import expect, {createSpy, spyOn, isSpy} from 'expect'
import freeze from 'deep-freeze';

describe('Reducers', () => {

    it('sets initial items', () => {

        const items = {
            item1: 'blah',
            item2: 'foo',
            item3: 'zork'
        };

        const oldState = {
            items: {},
            visibleItems: {}
        };

        const newState =
            {
                items: {
                    item1: 'blah',
                    item2: 'foo',
                    item3: 'zork'
                },
                visibleItems: {
                    item1: 'blah',
                    item2: 'foo',
                    item3: 'zork'
                }
            };

        freeze(oldState);
        freeze(items);

        expect(reducers(oldState, {
            type: actions.SET_ITEMS, payload: items
        })).toEqual(newState);

    });

    it('sets filter and visible items', () => {

        const filter = 'bla';

        const oldState = {
            visibilityFilter: 'bla',
            items: {
                item1: 'blah',
                item2: 'foo',
                item3: 'zork',
                item4: 'blahheh'
            },
            open: true,
            visibleItems: {}
        };

        const newState =
            {
                visibilityFilter: 'bla',
                items: {
                    item1: 'blah',
                    item2: 'foo',
                    item3: 'zork',
                    item4: 'blahheh'
                },
                visibleItems: {
                    item1: 'blah',
                    item4: 'blahheh'
                },
                open: true,
                currentlyHighlighted: 'item1'
            };

        freeze(oldState);
        freeze(filter);

        expect(reducers(oldState, {
            type: actions.SET_FILTER,
            payload: filter
        })).toEqual(newState);

    });
    it('changes state of opened', () => {

            const trueState = {
                items: {foo: 'barr'},
                visibleItems:{foo: 'barr'},
                open: true,
                currentlyHighlighted: 'foo'
            };

            const falseState = {
                items: {foo: 'barr'},
                visibleItems:{foo: 'barr'},
                open: false,
                currentlyHighlighted: ''
            };

            freeze(trueState);
            freeze(falseState);

            expect(reducers(trueState, {type: actions.TOGGLE_OPEN})).toEqual(falseState);
            expect(reducers(trueState, {type: actions.SET_OPEN, payload: false})).toEqual(falseState);
            expect(reducers(falseState, {type: actions.SET_OPEN, payload: true})).toEqual(trueState);
        }
    );


    it('selects next item', () => {

        const oldState = {
            visibleItems: {
                item1: 'blah',
                item2: 'foo',
                item3: 'zork'
            },
            currentlyHighlighted: 'item2'
        };
        const newState = {
            visibleItems: {
                item1: 'blah',
                item2: 'foo',
                item3: 'zork'
            },
            currentlyHighlighted: 'item3'
        };

        freeze(oldState);
        freeze(newState);

        expect(reducers(oldState, {type: actions.SET_NEXT_HIGHLIGHTED})).toEqual(newState);
    });

    it('selects previous item', () => {

        const oldState = {
            visibleItems: {
                item1: 'blah',
                item2: 'foo',
                item3: 'zork'
            },
            currentlyHighlighted: 'item2'
        };
        const newState = {
            visibleItems: {
                item1: 'blah',
                item2: 'foo',
                item3: 'zork'
            },
            currentlyHighlighted: 'item1'
        };

        freeze(oldState);
        freeze(newState);

        expect(reducers(oldState, {type: actions.SET_PREV_HIGHLIGHTED})).toEqual(newState);
    });
    it('sets currently highlighted', () => {

        const oldState = {
            visibleItems: {
                item1: 'blah',
                item2: 'foo',
                item3: 'zork'
            },
            currentlyHighlighted: 'lkjasdflkj'
        };
        const newState = {
            visibleItems: {
                item1: 'blah',
                item2: 'foo',
                item3: 'zork'
            },
            currentlyHighlighted: 'item3'
        };

        freeze(oldState);
        freeze(newState);

        expect(reducers(oldState, {type: actions.SET_HIGHLIGHTED, payload: 'item3'})).toEqual(newState);
    });

    it('sets selected item and the currently highlighted', () => {
        const oldState = {
            visibleItems: {
                item1: 'blah',
                item2: 'foo',
                item3: 'zork',
                itemffff: 'lkjsdflkjslkj'
            },
            selected: '',
            selectedItemLabel: '',
            currentlyHighlighted: ''
        };
        const newState = {
            visibleItems: {
                item1: 'blah',
                item2: 'foo',
                item3: 'zork',
                itemffff: 'lkjsdflkjslkj'
            },
            selected: 'itemffff',
            selectedItemLabel: 'lkjsdflkjslkj',
            currentlyHighlighted: 'itemffff'
        };
        const key = {selected: 'itemffff', selectedItemLabel: 'lkjsdflkjslkj'};

        freeze(oldState);
        freeze(newState);

        expect(reducers(oldState, {type: actions.SET_SELECTED, payload: key})).toEqual(newState);
    });

    it('sets the tab index value', () => {
        const oldState = {
            tabIndex: null
        };
        const newState = {
            tabIndex: 2
        };
        freeze(oldState);
        freeze(newState);

        expect(reducers(oldState, {type: actions.SET_TABINDEX, payload: 2})).toEqual(newState);
    });

    it('sets initial render to false', () => {

        const oldState = {
            initialRender: true
        };
        const newState = {
            initialRender: false
        };

        freeze(oldState);
        freeze(newState);
        expect(reducers(oldState, {type: actions.SET_INITIAL_RENDER_FALSE})).toEqual(newState);
    })

});