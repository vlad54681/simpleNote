import s from './TitleBlock.module.scss';

const TitleBlock = ({
	posts = { posts }, setLocalCurrentPost = { setLocalCurrentPost }, setEditMode, id, title }) => {
	let getPost = () => {
		let currentPost = posts.find(post => post.id === id)
		setLocalCurrentPost(currentPost)
		setEditMode(1)

	}


	return (
		<div onClick={getPost} className={s.noteItem}>
			<div className={s.noteItem__container}>
				<div className={s.noteItem__item}>
					<div className={s.noteItem__title}>
						{title}
					</div>

				</div>
			</div>
		</div>



	)
}

export default TitleBlock;