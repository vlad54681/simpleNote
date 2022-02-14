import { Field, Form, FormSpy } from 'react-final-form';
import {
	composeValidators, maxLengthCreator, minValue, required, convertInTag, hasGaps
} from '../../utils/validators/validators';
import s from './DemonstrateForm.module.scss';

const CreateForm = ({ defaultTextValue, defaultTitleValue,
	children, mirrorTags, onSubmit, addNewTag, deleteCurrentTag, tags }) => {



	let tagElements = tags.map(el => <div key={el.id} className={s.tagsBlock__tags}>
		<div className={s.tagsBlock__tegItem}>
			<div className={s.tagsBlock__name}>{el.name}</div>
			<div
				onClick={deleteCurrentTag.bind(null, el.id)}
				className={s.tagsBlock__deleteButton}>
			</div>
		</div>

	</div>
	)


	return <div className={s.mainBlock}>
		<div className={s.mainBlock__container}>

			<Form
				onSubmit={onSubmit}
				initialValues={{}}
				render={({ handleSubmit, form, hasValidationErrors, values }) => (
					<form
						onSubmit={event => {
							handleSubmit(event)

						}}
					>

						<Field
							name={'newMessageTitle'}
							defaultValue={defaultTitleValue}
							validate={composeValidators(required, maxLengthCreator(50))}
						>
							{({ input, meta }) => (
								<div className={s.mainBlock__titleContainer}>

									<input {...input}

										placeholder="Enter title.."
										className={s.mainBlock__titleInput}
									/>
									<div className={s.error}>
										{meta.error && meta.touched && <span className={s.titleInputErr}>{meta.error}</span>}
									</div>

								</div>
							)}
						</Field>


						<Field
							defaultValue={defaultTextValue}

							name={'newMessageBody'}
							validate={composeValidators(required, maxLengthCreator(5000))}
						>
							{({ input, meta, values }) => (
								<div className={s.mainBlock__textContainer}>
									<textarea {...input}
										placeholder="Enter text.."

									/>
									<div className={s.error}>
										{meta.error && meta.touched && <span className={s.textInputErr}>{meta.error}</span>}
									</div>
									<div className={s.createFormButton}>
										<button type={'submit'}
											disabled={hasValidationErrors}
											className={s.mainBlock__buttons__edit}
										>{children}
										</button>
									</div>

								</div>

							)}
						</Field>

						<FormSpy

						>
							{({ values }) => (

								<div className={s.fieadTags}>

									{mirrorTags(values.newMessageBody)}
								</div>
							)}
						</FormSpy>


					</form>
				)}
			/>

			<Form
				onSubmit={addNewTag}
				render={({ handleSubmit, form, hasValidationErrors, values }) => (
					<form
						onSubmit={event => handleSubmit(event).then(form.reset())}

					>
						<Field
							name={'newMessageTag'}
							validate={composeValidators(convertInTag, required, minValue(2), maxLengthCreator(10), hasGaps)}
						>
							{({ input, meta }) => (
								<div className={s.mainBlock__tags}>

									<div className={s.tagsBlock}>
										<div className={s.tagsBlock__desc}>Tags:</div>
										{tagElements}
										<div className={s.tagsBlock__addTagField}>

											<input  {...input}
												placeholder='Add tag..'
												className={s.tagsBlock__input}
											/>
											{meta.error && meta.touched && <span className={s.tagInputErr}>{meta.error}</span>}
											<button type={'submit'} disabled={hasValidationErrors}
												className={s.tagsBlock__addButton}></button>
										</div>

									</div>
								</div>
							)}
						</Field>

					</form>
				)
				}
			/>

		</div>
	</div >

}

export default CreateForm;


