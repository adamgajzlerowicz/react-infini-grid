import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {Select} from '../src/Select';
import sinon from 'sinon';
import jsdom from 'jsdom';

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;

const items = {
    'item1': 'Mercedes Benz C40',
    'item2': 'Mazda 6',
    'item3': 'Mazda 3',
    'item4': 'Rover Discovery Sport'
};

describe('<Select />', () => {

    it("contains spec with an expectation", () => {
        const onChange = () => {
        };
        const wrapper = mount(<Select items={items} onChange={onChange}/>);
        expect(wrapper.find('div')).to.have.length(8);
        expect(wrapper.find('.select-react-redux-container')).to.have.length(1);
        expect(wrapper.find('.select-react-redux-container .selected')).to.have.length(1);
        expect(wrapper.find('.select-react-redux-container .results-container')).to.have.length(1);
        expect(wrapper.find('.select-react-redux-container .results-container .input-container')).to.have.length(1);
        expect(wrapper.find('.select-react-redux-container .results-container .input-container input')).to.have.length(1);
        expect(wrapper.find('.select-react-redux-container .results-container div.item')).to.have.length(4);
    });

    describe('Open list', () => {

        it("opens on click", () => {
            const onChange = () => {
            };
            const wrapper = mount(<Select items={items} onChange={onChange}/>);
            wrapper.find('.selected').simulate("click");
            expect(wrapper.find('.selected').hasClass('selected-open')).to.equal(true);
            expect(wrapper.find('.results-container').hasClass('open')).to.equal(true);

        });

        it("opens on arrow Enter", () => {
            const onChange = () => {
            };
            const wrapper = mount(<Select items={items} onChange={onChange}/>);
            wrapper.find('.selected').simulate("keyPress", {
                key: 'Enter'
            });
            expect(wrapper.find('.selected').hasClass('selected-open')).to.equal(true);
            expect(wrapper.find('.results-container').hasClass('open')).to.equal(true);
        });

        it("opens on arrow ArrowDown", () => {
            const onChange = () => {
            };
            const wrapper = mount(<Select items={items} onChange={onChange}/>);
            wrapper.find('.selected').simulate("keyPress", {
                keyCode: 40
            });
            expect(wrapper.find('.selected').hasClass('selected-open')).to.equal(true);
            expect(wrapper.find('.results-container').hasClass('open')).to.equal(true);
        });

        it("opens on any character key", () => {
            const onChange = () => {
            };
            const wrapper = mount(<Select items={items} onChange={onChange}/>);
            wrapper.find('.selected').simulate("keyPress", {
                keyCode: 's'
            });
            expect(wrapper.find('.selected').hasClass('selected-open')).to.equal(true);
            expect(wrapper.find('.results-container').hasClass('open')).to.equal(true);
        });
    });

    describe('Closes list', () => {

        it("closes on click", () => {
            const onChange = () => {
            };
            const wrapper = mount(<Select items={items} onChange={onChange}/>);
            wrapper.find('.selected').simulate("click");
            wrapper.find('.selected').simulate("click");
            expect(wrapper.find('.selected').hasClass('selected-open')).to.equal(false);
            expect(wrapper.find('.results-container').hasClass('open')).to.equal(false);

        });

    });

    describe('Filters the list', () => {

        it("filters with input filled in", () => {
            const onChange = () => {
            };
            const wrapper = mount(<Select items={items} onChange={onChange}/>);
            wrapper.find('input').simulate('change', {target: {value: 'Mer'}});
            expect(wrapper.find('.select-react-redux-container .results-container div.item')).to.have.length(1);
            wrapper.find('input').simulate('change', {target: {value: 'Maz'}});
            expect(wrapper.find('.select-react-redux-container .results-container div.item')).to.have.length(2);
        })
    });

    // describe('Highlight items', () => {
    //
    //     it('highlights with arrow down'
    //     //     , () => {
    //     //     const onChange = () => {
    //     //     };
    //     //     const wrapper = mount(<Select items={items} onChange={onChange}/>);
    //     //     wrapper.find('input').simulate("keyDown", {
    //     //         key: 'ArrowDown'
    //     //     });
    //     //     expect(wrapper.state('currentlyHighlighted')).to.equal('item1');
    //     //     wrapper.find('input').simulate("keyDown", {
    //     //         key: 'ArrowDown'
    //     //     });
    //     //     expect(wrapper.state('currentlyHighlighted')).to.equal('item2');
    //     //     wrapper.find('input').simulate("keyDown", {
    //     //         key: 'ArrowDown'
    //     //     });
    //     //     expect(wrapper.state('currentlyHighlighted')).to.equal('item3');
    //     //     wrapper.find('input').simulate("keyDown", {
    //     //         key: 'ArrowDown'
    //     //     });
    //     //     expect(wrapper.state('currentlyHighlighted')).to.equal('item4');
    //     // }
    //     );
    //
    //     it('highlights with arrow up'
    //     //     , () => {
    //     //     const onChange = () => {
    //     //     };
    //     //     const wrapper = mount(<Select items={items} onChange={onChange}/>);
    //     //     wrapper.find('input').simulate("keyDown", {
    //     //         key: 'ArrowUp'
    //     //     });
    //     //     expect(wrapper.state('currentlyHighlighted')).to.equal('item1');
    //     //     wrapper.find('input').simulate("keyDown", {
    //     //         key: 'ArrowDown'
    //     //     });
    //     //     wrapper.find('input').simulate("keyDown", {
    //     //         key: 'ArrowDown'
    //     //     });
    //     //     wrapper.find('input').simulate("keyDown", {
    //     //         key: 'ArrowDown'
    //     //     });
    //     //     wrapper.find('input').simulate("keyDown", {
    //     //         key: 'ArrowUp'
    //     //     });
    //     //     expect(wrapper.state('currentlyHighlighted')).to.equal('item3');
    //     //     wrapper.find('input').simulate("keyDown", {
    //     //         key: 'ArrowUp'
    //     //     });
    //     //     expect(wrapper.state('currentlyHighlighted')).to.equal('item2');
    //     // }
    //     );
    //
    //     it('highlights with search'
    //     //     , () => {
    //     //     const onChange = () => {
    //     //     };
    //     //     const wrapper = mount(<Select items={items} onChange={onChange}/>);
    //     //     wrapper.find('input').simulate('change', {target: {value: 'Maz'}});
    //     //     expect(wrapper.state('currentlyHighlighted')).to.equal('item2');
    //     // }
    //     );
    //
    //     it('highlights items with arrows on filtered list'
    //     //     , () => {
    //     //     const onChange = () => {
    //     //     };
    //     //     const wrapper = mount(<Select items={items} onChange={onChange}/>);
    //     //     wrapper.find('input').simulate('change', {target: {value: 'Maz'}});
    //     //     expect(wrapper.state('currentlyHighlighted')).to.equal('item2');
    //     //     wrapper.find('input').simulate("keyDown", {
    //     //         key: 'ArrowDown'
    //     //     });
    //     //     expect(wrapper.state('currentlyHighlighted')).to.equal('item3');
    //     //     wrapper.find('input').simulate("keyDown", {
    //     //         key: 'ArrowUp'
    //     //     });
    //     //     expect(wrapper.state('currentlyHighlighted')).to.equal('item2');
    //     //     wrapper.find('input').simulate("keyDown", {
    //     //         key: 'ArrowUp'
    //     //     });
    //     //     wrapper.find('input').simulate("keyDown", {
    //     //         key: 'ArrowUp'
    //     //     });
    //     //     wrapper.find('input').simulate("keyDown", {
    //     //         key: 'ArrowUp'
    //     //     });
    //     //     expect(wrapper.state('currentlyHighlighted')).to.equal('item2');
    //     // }
    //     );
    // });

    describe('Triggers callback with a right value', () => {
        it('triggers with click', () => {
            const onChange = sinon.spy();
            const wrapper = mount(<Select items={items} onChange={onChange}/>);
            wrapper.find('input').simulate('change', {target: {value: 'Maz'}});
            wrapper.find('.item').first().simulate('click');
            expect(onChange.calledOnce).to.equal(true);
        });

        it('triggers with enter', () => {
            const onChange = sinon.spy();
            const wrapper = mount(<Select items={items} onChange={onChange}/>);
            wrapper.find('.selected').simulate("click");
            wrapper.find('.selected').simulate('change', {target: {value: 'ff'}});
            wrapper.find('input').simulate('change', {target: {value: 'Maz'}});
            wrapper.find('input').simulate("keyPress", {
                key: 'Enter'
            });
            expect(onChange.calledOnce).to.equal(true);
        });

    });

    describe('Changes display of top bar', () => {

        it('changes after item was selected', () => {
            const onChange = () => {
            };
            const wrapper = mount(<Select items={items} onChange={onChange}/>);
            wrapper.find('input').simulate('change', {target: {value: 'Maz'}});
            wrapper.find('.selected').simulate("click");
            wrapper.find('input').simulate('change', {target: {value: 'Maz'}});
            wrapper.find('input').simulate("keyPress", {
                key: 'Enter'
            });
                expect((wrapper.find('.top-bar').text())).to.equal('Mazda 6');
        });

        it('knows about no results items supplied', () => {
            const onChange = () => {
            };
            const wrapper = mount(<Select items={{}} onChange={onChange}/>);
            expect((wrapper.find('.top-bar').text())).to.equal('No options available');
        })
    });
});