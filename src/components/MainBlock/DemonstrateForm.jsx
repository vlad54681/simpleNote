import { useEffect } from 'react';
import { useRef } from 'react';
import { composeValidators, maxLengthCreator, required } from '../../utils/validators/validators';
import s from './DemonstrateForm.module.scss';




const DemonstrateForm = ({ setEditMode, deletePost,
	currentPost }) => {

	let textInput = useRef();

	useEffect(() => {

		let tags = currentPost.tags;
		let text = textInput.current.innerHTML;
		let arr = text.split(' ')
		let newArr = []
		for (let word of arr) {
			if (tags.find(tag => tag.name === word)) {
				newArr.push('<span style="background: rgba(252, 255, 62, 0.7); border-radius: 5px">' + word + '</span>')
			} else { newArr.push(word) }
		}
		let highlightedText = newArr.join(' ')
		textInput.current.innerHTML = `${highlightedText}`
	}, [textInput])

	let tagElem = currentPost.tags.map(el => <div key={el.id} className={s.tagsBlock__tags}>
		<div className={s.tagsBlock__tegItem}>
			<div className={s.tagsBlock__name}>{el.name}</div>
		</div>
	</div>
	)

	let deleteCurrentPost = () => {
		const result = confirm('Do you really want to delete the post?');
		if (result) {
			deletePost(currentPost.id);
			setEditMode(0)
		}
	}

	return <div className={s.mainBlock}>
		<div className={s.mainBlock__container}>
			<div className={s.mainBlock__titleContainer}>
				<div className={s.mainBlock__titleInput}>{currentPost.title}</div>
			</div>
			<div className={s.mainBlock__textContainer}>
				<div ref={textInput} className={s.mainBlock__text}>
					{currentPost.text}
				</div>
				<div className={s.mainBlock__buttons}>
					<div className={s.mainBlock__buttons__edit}>
						<div
							onClick={setEditMode.bind(null, 3)} className={s.button}
						>EDIT</div>
					</div>
					<div className={s.mainBlock__buttons__delete}>
						<div className={s.button + ' ' + s.deleteButton} onClick={deleteCurrentPost}>DELETE</div>
					</div>


				</div>
			</div>
			<div className={s.mainBlock__tags}>
				<div className={s.tagsBlock}>
					<div className={s.tagsBlock__desc}>Tags:</div>

					{tagElem}

				</div>


			</div>
		</div>
	</div>
}

export default DemonstrateForm;
