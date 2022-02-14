import { Field, Form } from "react-final-form"
import s from '../App.module.css';


const SearchForm = ({ filterPosts }) => {
	return <div className={s.searchBlockContainer} >
		<Form
			onSubmit={filterPosts}
			render={({ handleSubmit }) => (
				<form
					className={s.searchBlock}
					onSubmit={handleSubmit}
				>
					<div className={s.searchButton__container}>
						<button className={s.searchButton} type={'submit'}	></button>
					</div>

					<Field
						name={'searchField'}
					>
						{({ input, value }) => (
							<div className={s.searchField}>
								<input {...input}
									placeholder={'Enter your tag..'}
									value={value}
								/>
							</div>
						)}
					</Field>

				</form>
			)}
		/>
	</div>
}

export default SearchForm;