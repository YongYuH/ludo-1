const initialState = {
  isShowingAvatarPopUpMenu: false
};

// Actions
export const TOGGLE_AVATAR_POP_UP_MENU = 'TOGGLE_AVATAR_POP_UP_MENU';

// Action Creators
export const toggleAvatarPopUpMenu = () => ({
  type: TOGGLE_AVATAR_POP_UP_MENU
});

// Reducer
export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case TOGGLE_AVATAR_POP_UP_MENU:
      return {
        isShowingAvatarPopUpMenu: !state.isShowingAvatarPopUpMenu
      };
    default:
      return state;
  }
};
