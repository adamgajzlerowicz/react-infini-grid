export const reducers = (state = {}, action) => {
    switch (action.type) {
        case '@@redux/INIT': {
            return {
                open: false,
                initialRender: true,
                visibilityFilter: ''
            }
        }
        case 'SET_ITEMS': {
            return {
                ...state,
                items: action.payload,
                visibleItems: action.payload

            };
        }
        case 'SET_FILTER': {
            let visibleItems = {};
            Object.keys(state.items).map((key) => {
                if (
                    !action.payload
                    ||
                    state.items[key].toLowerCase().indexOf(action.payload.toLowerCase().trim()
                    )
                    !== -1
                ) {
                    visibleItems[key] = state.items[key];
                }
            });

            return {
                ...state,
                visibilityFilter: action.payload,
                visibleItems: visibleItems,
                currentlyHighlighted: state.open ? Object.keys(visibleItems)[0] || '' : ''
            };
        }
        case 'TOGGLE_OPEN': {
            return {
                ...state,
                open: !state.open,
                currentlyHighlighted: !state.open ? Object.keys(state.visibleItems)[0] || '' : ''
            };
        }

        case 'SET_OPEN': {
            return {
                ...state,
                open: action.payload,
                currentlyHighlighted: action.payload ? Object.keys(state.visibleItems)[0] || '' : ''
            };
        }

        case 'SET_NEXT_HIGHLIGHTED': {
            let keys = Object.keys(state.visibleItems);
            let currentIndex = keys.indexOf(state.currentlyHighlighted);

            let newIndex = 0;
            if (currentIndex < keys.length - 1 && currentIndex != -1) {
                newIndex = currentIndex + 1;
            }
            return {
                ...state,
                currentlyHighlighted: keys[newIndex]
            };
        }

        case 'SET_PREV_HIGHLIGHTED': {
            let keys = Object.keys(state.visibleItems);
            let currentIndex = keys.indexOf(state.currentlyHighlighted);

            let newIndex = 0;
            if (currentIndex > 0) {
                newIndex = currentIndex - 1;
            }

            return {
                ...state,
                currentlyHighlighted: keys[newIndex]
            };
        }

        case 'SET_HIGHLIGHTED': {
            return {
                ...state,
                currentlyHighlighted: action.payload
            }
        }

        case 'SET_SELECTED': {
            return {
                ...state,
                currentlyHighlighted: action.payload.selected,
                selected: action.payload.selected,
                selectedItemLabel: action.payload.selectedItemLabel
            }
        }

        case 'SET_TABINDEX': {
            return {
                ...state,
                tabIndex: action.payload
            }
        }
        case 'SET_INITIAL_RENDER_FALSE' : {
            return {
                ...state,
                initialRender: false
            }
        }
    }

    return state;
};
