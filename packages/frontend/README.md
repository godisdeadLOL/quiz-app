```
pages/
	quizes.tsx
	quiz
		steps/
			Intro.tsx
			Questions.tsx
				<QuestionDisplay question={...} onAnswer={...} />
			Result.tsx (score + answers)
				<QuestionDisplay question={...} answer={answer} />

		index.tsx

modules/
	AnswerList.tsx

ui/
	button там

components/
	QuestionDisplay.tsx
	QuizPreviewDisplay.tsx

api/
	types.ts
	client.ts
		listQuizes
		getQuiz
		submitResult
```
