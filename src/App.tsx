import { useMemo, useState } from 'react'
import {
  createKoreanReadingProblem,
  type Difficulty,
  type KoreanProblem,
  type ProblemType,
  type StyleMode,
} from './generators/koreanReading'
import './App.css'

type GradingState = 'idle' | 'correct' | 'wrong'

type SavedProblem = KoreanProblem & {
  savedAt: string
  submittedAnswer: string
}

const difficulties: Difficulty[] = ['개념', '표준', '실전']
const problemTypes: ProblemType[] = ['내용 일치', '보기 적용', '추론']
const styleModes: StyleMode[] = ['평가원형', 'EBS 학습형', '고난도 실전형']

const storageKey = 'sat-practice-generator.korean-reading.saved'

function normalizeAnswer(answer: string) {
  return answer.replace(/\s/g, '').trim()
}

function loadSavedProblems(): SavedProblem[] {
  const raw = localStorage.getItem(storageKey)

  if (!raw) return []

  try {
    return JSON.parse(raw) as SavedProblem[]
  } catch {
    return []
  }
}

function App() {
  const [difficulty, setDifficulty] = useState<Difficulty>('표준')
  const [problemType, setProblemType] = useState<ProblemType>('내용 일치')
  const [styleMode, setStyleMode] = useState<StyleMode>('평가원형')
  const [submittedAnswer, setSubmittedAnswer] = useState('')
  const [gradingState, setGradingState] = useState<GradingState>('idle')
  const [savedProblems, setSavedProblems] = useState<SavedProblem[]>(loadSavedProblems)
  const [problem, setProblem] = useState<KoreanProblem>(() =>
    createKoreanReadingProblem('표준', '내용 일치', '평가원형'),
  )

  const isAnswered = gradingState !== 'idle'
  const scoreLabel = useMemo(() => {
    if (gradingState === 'correct') return '정답'
    if (gradingState === 'wrong') return '오답'
    return '미채점'
  }, [gradingState])

  const generateProblem = () => {
    setProblem(createKoreanReadingProblem(difficulty, problemType, styleMode))
    setSubmittedAnswer('')
    setGradingState('idle')
  }

  const saveWrongProblem = (answer: string) => {
    const alreadySaved = savedProblems.some((savedProblem) => savedProblem.id === problem.id)
    if (alreadySaved) return

    const nextProblems = [
      { ...problem, submittedAnswer: answer || '무응답', savedAt: new Date().toISOString() },
      ...savedProblems,
    ].slice(0, 12)

    setSavedProblems(nextProblems)
    localStorage.setItem(storageKey, JSON.stringify(nextProblems))
  }

  const gradeProblem = () => {
    const isCorrect = normalizeAnswer(submittedAnswer) === normalizeAnswer(problem.answer)
    setGradingState(isCorrect ? 'correct' : 'wrong')

    if (!isCorrect) {
      saveWrongProblem(submittedAnswer)
    }
  }

  return (
    <main className="app-shell">
      <aside className="side-panel">
        <div className="brand-block">
          <span>수능 문제 연구소</span>
          <h1>국어 비문학 집중 모드</h1>
        </div>

        <div className="subject-lock">
          <span>과목</span>
          <strong>국어 · 독서</strong>
          <small>한 과목부터 출제 문법을 촘촘하게 쌓는 중입니다.</small>
        </div>

        <div className="control-group">
          <p>난이도</p>
          <div className="segmented">
            {difficulties.map((item) => (
              <button
                className={difficulty === item ? 'active' : ''}
                key={item}
                onClick={() => setDifficulty(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <label className="select-field">
          <span>문항 유형</span>
          <select value={problemType} onChange={(event) => setProblemType(event.target.value as ProblemType)}>
            {problemTypes.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>

        <label className="select-field">
          <span>출제 스타일</span>
          <select value={styleMode} onChange={(event) => setStyleMode(event.target.value as StyleMode)}>
            {styleModes.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>

        <button className="primary-action" onClick={generateProblem} type="button">
          국어 문제 출제
        </button>
      </aside>

      <section className="exam-area">
        <header className="exam-header">
          <div>
            <p>기출 원문 복제가 아닌 국어 독서 출제 패턴 기반 새 문항</p>
            <h2>{problem.passageTitle}</h2>
          </div>
          <div className={`score-chip ${gradingState}`}>{scoreLabel}</div>
        </header>

        <article className="paper">
          <div className="paper-meta">
            <span>국어 독서</span>
            <span>{problem.difficulty}</span>
            <span>{problem.problemType}</span>
            <span>{problem.styleMode}</span>
          </div>

          <p className="passage">{problem.passage}</p>

          <section className="question-block">
            <span className="question-number">01</span>
            <h3>{problem.question}</h3>
          </section>

          <ol className="choices">
            {problem.choices.map((choice, index) => (
              <li key={choice}>
                <button
                  className={submittedAnswer === choice ? 'selected' : ''}
                  disabled={isAnswered}
                  onClick={() => setSubmittedAnswer(choice)}
                  type="button"
                >
                  <span>{index + 1}</span>
                  {choice}
                </button>
              </li>
            ))}
          </ol>

          <div className="exam-actions">
            <button disabled={!submittedAnswer || isAnswered} onClick={gradeProblem} type="button">
              채점하기
            </button>
            <button onClick={generateProblem} type="button">
              다음 문제
            </button>
          </div>

          {isAnswered && (
            <section className="solution-panel">
              <div>
                <span>정답</span>
                <strong>{problem.answer}</strong>
              </div>
              <p>{problem.explanation}</p>
              <small>{problem.wrongReason}</small>
            </section>
          )}
        </article>
      </section>

      <aside className="review-panel">
        <div className="review-header">
          <span>Review</span>
          <strong>{savedProblems.length}</strong>
        </div>
        <h2>국어 오답노트</h2>

        {savedProblems.length === 0 ? (
          <p className="empty-state">틀린 문제가 생기면 여기 쌓입니다.</p>
        ) : (
          <ul>
            {savedProblems.map((savedProblem) => (
              <li key={savedProblem.id}>
                <span>{savedProblem.difficulty} · {savedProblem.problemType}</span>
                <strong>{savedProblem.concept}</strong>
                <small>내 답: {savedProblem.submittedAnswer}</small>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </main>
  )
}

export default App
