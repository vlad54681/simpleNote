import s from './App.module.css';
import { connect } from "react-redux";
import { setUpdatesPosts, deletePost, addPost, } from './store/app-reducer';
import React, { useRef, useState } from 'react';
import SearchForm from "./components/SearchForm";
import TitleBlock from './components/TitleBlock/TitleBlock';
import DemonstrateForm from './components/MainBlock/DemonstrateForm';
import CreateForm from './components/MainBlock/CreateForm';
import { useEffect } from 'react';

const App = ({ setUpdatesPosts,
	deletePost, posts, addPost }) => {

	let [editMode, setEditMode] = useState(0);
	let [holdingTags, setHoldingTags] = useState([]);
	let [demonstratedPosts, setDemonstratedPosts] = useState(null);
	let [isFindSomething, setIsFindSomething] = useState(false);
	let [localCurrentPost, setLocalCurrentPost] = useState([]);
	let [isPostsUpdating, setIsPostsUpdating] = useState(false);

	const firstUpdate = useRef(false);
	let tagsForEditMode = localCurrentPost?.tags || holdingTags;
	let tags = posts?.tags || holdingTags;


	let deleteCurrentTag = (tagId) => {

		if (editMode == 2) {
			console.log(holdingTags)

			let finalTags = holdingTags.filter(tag => tag.id != tagId)
			setHoldingTags(finalTags)
		} else {

			setLocalCurrentPost(prevState => {
				return {
					...prevState,
					tags: prevState.tags.filter(tag => tag.id != tagId)
				}
			})
		}
	}

	let addTags = (arrTags, str) => {
		let arr = str.split(' ')
		let allvalues;
		if (!arrTags[0]) {
			allvalues = [1]
		} else {
			allvalues = Object.keys(arrTags).map(el => arrTags[el].id + 1);
		}
		let finalTags = [...arrTags];
		let id = Math.max.apply(null, allvalues);
		for (let word of arr) {
			if (word[0] === '#' && !finalTags.find(el => el.name === word)) {

				finalTags.push({
					name: word,
					id: id
				})
				++id
			}

		}
		return finalTags

	}





	let addNewTag = async values => {
		if (editMode === 2) {
			let allvalues = Object.keys(holdingTags).map(tag => holdingTags[tag].id + 1);

			let HoldingTagsCopy = [
				...holdingTags,
				{
					name: values.newMessageTag,
					id: holdingTags.length == 0 ? 1
						: Math.max.apply(null, allvalues),
				}]
			setHoldingTags(HoldingTagsCopy)
			console.log(holdingTags)
		} else {

			let allvalues = Object.keys(localCurrentPost.tags).map(tag => localCurrentPost.tags[tag].id + 1);
			setLocalCurrentPost(prevPost => {
				return {
					...prevPost,
					tags: [...prevPost.tags, {
						name: values.newMessageTag,
						id: prevPost.tags.length == 0 ? 1
							: Math.max.apply(null, allvalues),
					}]
				}
			})
		}

	}



	let onEditPost = (handleSubmit) => {
		let finalTags = addTags(localCurrentPost.tags, handleSubmit.newMessageBody);
		setLocalCurrentPost(prevCurrentPost => {
			return {
				title: handleSubmit.newMessageTitle,
				text: handleSubmit.newMessageBody,
				date: prevCurrentPost.date,
				id: prevCurrentPost.id,
				tags: finalTags
			}

		})
		setDemonstratedPosts(posts);
		setIsPostsUpdating(prevState => !prevState);
	}

	useEffect(() => {
		if (!firstUpdate.current) {
			firstUpdate.current = true;
			return;
		}
		setEditMode(1)

		let pos = localCurrentPost.id - 1;
		let updatingPosts = posts;
		updatingPosts.splice([pos], 1, {
			title: localCurrentPost.title == null ? updatingPosts[pos].title : localCurrentPost.title,
			text: localCurrentPost.text == null ? updatingPosts[pos].text : localCurrentPost.text,
			id: localCurrentPost.id,
			tags: localCurrentPost.tags,
		});

		setUpdatesPosts(updatingPosts)

	}, [isPostsUpdating]);

	let addNewPost = values => {

		let finalTags = addTags(tags, values.newMessageBody);
		let allvalues = Object.keys(posts).map(function (key) { return posts[key].id + 1; });
		setLocalCurrentPost({
			id: posts.length == 0 ? 1
				: Math.max.apply(null, allvalues),
			title: values.newMessageTitle,
			text: values.newMessageBody,
			tags: finalTags,

		});

		addPost(values.newMessageBody, values.newMessageTitle, finalTags)
		setEditMode(1);
		setHoldingTags([]);
		setIsFindSomething(false)

	}

	let mirrorTags = (str) => {
		console.log('вызвался mirrorTags');
		let tags = []
		if (str) {

			let arr = str.split(' ')
			for (let word of arr) {
				if (word[0] === '#') {
					tags.push(word)
				}
			}

			return tags.join(' ')
		} else return null
	}

	let filterPosts = search => {
		let str = search.searchField?.toLowerCase();
		if (!str) {
			setIsFindSomething(false)
		} else {
			setIsFindSomething(true)
			let filteredPosts = posts.filter(post => {
				if (post.tags) {
					return (
						post.tags.find(tag => tag.name.includes(str))
					)
				}

			})
			setDemonstratedPosts(filteredPosts)

		}
	}

	let addNote = () => {
		editMode === 3 ? null : setEditMode(2)
	}

	return <div className={s.appWrapper}>
		<div className={s.appWrapper_content}>

			<div className={s.titleBlock}>

				<div className={s.titleBlock__container}>
					<div className={s.searchField}>
						<div className={s.searchField__container}>

							<div className={s.searchField__input}>
								<SearchForm filterPosts={filterPosts} />

							</div>
						</div>
					</div>
					<div className={s.titleElements__container}>
						{!isFindSomething ?
							posts.map(el => <TitleBlock setLocalCurrentPost={setLocalCurrentPost}
								setEditMode={setEditMode} posts={posts} id={el.id} title={el.title} />) :
							demonstratedPosts.map(el => <TitleBlock
								posts={posts} setLocalCurrentPost={setLocalCurrentPost}
								setEditMode={setEditMode} id={el.id} title={el.title} />)
						}
					</div>
					<div className={s.addNoteButton}>
						<div className={s.addNoteButton__container}>

							<div onClick={addNote} className={s.addNoteButton__text}>Add note</div>
						</div>
					</div>
				</div>
			</div>
			{(editMode === 1)
				? <DemonstrateForm
					deletePost={deletePost} setEditMode={setEditMode}

					currentPost={localCurrentPost}
				/> :

				(editMode === 2) ? <CreateForm defaultTextValue={null} defaultTitleValue={null}
					mirrorTags={mirrorTags} onSubmit={addNewPost} addNewTag={addNewTag}
					deleteCurrentTag={deleteCurrentTag} tags={holdingTags}>ADD</CreateForm> :

					(editMode === 3) ? <CreateForm defaultTextValue={localCurrentPost.text} defaultTitleValue={localCurrentPost.title}
						mirrorTags={mirrorTags} onSubmit={onEditPost} addNewTag={addNewTag}
						deleteCurrentTag={deleteCurrentTag} tags={tagsForEditMode} >SAVE</CreateForm> : null}

		</div>
	</div >
}

const mapStateToProps = (state) => {
	return {
		posts: state.appPage.posts,
	}
}

export default connect(mapStateToProps, {
	setUpdatesPosts,
	deletePost, addPost
})(App);



