const ADD_POST = 'ADD_POST';
const DELETE_POST = 'DELETE_POST';
const SET_UPDATES_POSTS = 'SET_UPDATES_POSTS';

let initialState = {
	posts: []
};



const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_POST: {
			let allvalues = Object.keys(state.posts).map(function (key) { return state.posts[key].id + 1; });
			let newPost = {
				id: state.posts.length == 0 ? 1
					: Math.max.apply(null, allvalues),
				title: action.newMessageTitle,
				text: action.newMessageBody,
				tags: action.newMessageTags,
			};
			return {
				...state,
				posts: [...state.posts, newPost],
			}
		}

		case DELETE_POST: {
			return { ...state, posts: state.posts.filter(p => p.id != action.id) }
		}

		case SET_UPDATES_POSTS: {
			return {
				...state,
				posts: action.posts
			}
		}
		default:
			return state;
	}
}

export const setUpdatesPosts = (posts) => ({ type: SET_UPDATES_POSTS, posts })
export const deletePost = (id) => ({ type: DELETE_POST, id })
export const addPost = (newMessageBody, newMessageTitle, newMessageTags) => {
	return { type: ADD_POST, newMessageBody, newMessageTitle, newMessageTags }
}

export default appReducer;
