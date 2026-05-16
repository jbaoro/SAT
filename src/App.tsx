import { useMemo, useState } from 'react'
import {
  createKoreanReadingSet,
  type Difficulty,
  type KoreanPassageSet,
  type KoreanQuestion,
  type PassageDomain,
  type StyleMode,
} from './generators/koreanReading'
import './App.css'

type GradingState = 'idle' | 'graded'
type AnswerMap = Record<string, string>

type SavedProblem = {
  id: string
  savedAt: string
  domain: PassageDomain
  difficulty: Difficulty
  passageTitle: string
  concept: string
  question: KoreanQuestion
  submittedAnswer: string
}

const difficulties: Difficulty[] = ['개념', '표준', '실전']
const passageDomains: PassageDomain[] = ['경제', '과학', '법']
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
  const [domain, setDomain] = useState<PassageDomain>('경제')
  const [difficulty, setDifficulty] = useState<Difficulty>('표준')
  const [styleMode, setStyleMode] = useState<StyleMode>('평가원형')
  const [answers, setAnswers] = useState<AnswerMap>({})
  const [gradingState, setGradingState] = useState<GradingState>('idle')
  const [savedProblems, setSavedProblems] = useState<SavedProblem[]>(loadSavedProblems)
  const [passageSet, setPassageSet] = useState<KoreanPassageSet>(() =>
    createKoreanReadingSet('경제', '표준', '평가원형'),
  )

  const isGraded = gradingState === 'graded'
  const answeredCount = passageSet.questions.filter((question) => answers[question.id]).length
  const score = useMemo(
    () =>
      passageSet.questions.filter(
        (question) => normalizeAnswer(answers[question.id] ?? '') === normalizeAnswer(question.answer),
      ).length,
    [answers, passageSet.questions],
  )

  const generateSet = () => {
    setPassageSet(createKoreanReadingSet(domain, difficulty, styleMode))
    setAnswers({})
    setGradingState('idle')
  }

  const selectAnswer = (questionId: string, answer: string) => {
    if (isGraded) return
    setAnswers((currentAnswers) => ({ ...currentAnswers, [questionId]: answer }))
  }

  const saveWrongProblems = () => {
    const wrongProblems = passageSet.questions
      .filter((question) => normalizeAnswer(answers[question.id] ?? '') !== normalizeAnswer(question.answer))
      .filter((question) => !savedProblems.some((savedProblem) => savedProblem.id === question.id))
      .map((question) => ({
        id: question.id,
        savedAt: new Date().toISOString(),
        domain: passageSet.domain,
        difficulty: passageSet.difficulty,
        passageTitle: passageSet.passageTitle,
        concept: passageSet.concept,
        question,
        submittedAnswer: answers[question.id] || '무응답',
      }))

    if (wrongProblems.length === 0) return

    const nextProblems = [...wrongProblems, ...savedProblems].slice(0, 12)
    setSavedProblems(nextProblems)
    localStorage.setItem(storageKey, JSON.stringify(nextProblems))
  }

  const gradeSet = () => {
    setGradingState('graded')
    saveWrongProblems()
  }

  return (
    <main className="app-shell">
      <aside className="side-panel">
        <div className="brand-block">
          <span>수능 문제 연구소</span>
          <h1>국어 독서 지문 세트</h1>
        </div>

        <div className="subject-lock">
          <span>과목</span>
          <strong>국어 · 독서</strong>
          <small>하나의 긴 지문에 3문항을 붙여 실전 세트처럼 풉니다.</small>
        </div>

        <div className="control-group">
          <p>지문 분야</p>
          <div className="segmented">
            {passageDomains.map((item) => (
              <button
                className={domain === item ? 'active' : ''}
                key={item}
                onClick={() => setDomain(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
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
          <span>출제 스타일</span>
          <select value={styleMode} onChange={(event) => setStyleMode(event.target.value as StyleMode)}>
            {styleModes.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>

        <button className="primary-action" onClick={generateSet} type="button">
          새 지문 세트 출제
        </button>
      </aside>

      <section className="exam-area">
        <header className="exam-header">
          <div>
            <p>기출 원문 복제가 아닌 국어 독서 출제 패턴 기반 새 지문 세트</p>
            <h2>{passageSet.domain} · {passageSet.passageTitle}</h2>
          </div>
          <div className={`score-chip ${isGraded ? 'correct' : ''}`}>
            {isGraded ? `${score}/3` : `${answeredCount}/3`}
          </div>
        </header>

        <article className="paper">
          <div className="paper-meta">
            <span>국어 독서</span>
            <span>{passageSet.domain}</span>
            <span>{passageSet.difficulty}</span>
            <span>{passageSet.styleMode}</span>
          </div>

          <p className="passage">{passageSet.passage}</p>

          <section className="question-set">
            {passageSet.questions.map((question) => {
              const selectedAnswer = answers[question.id]
              const isCorrect = normalizeAnswer(selectedAnswer ?? '') === normalizeAnswer(question.answer)

              return (
                <section className="question-card" key={question.id}>
                  <div className="question-block">
                    <span className="question-number">{String(question.number).padStart(2, '0')}</span>
                    <div>
                      <p className="question-type">{question.problemType}</p>
                      <h3>{question.question}</h3>
                    </div>
                  </div>

                  {question.view && (
                    <div className="view-box">
                      <strong>&lt;보기&gt;</strong>
                      <p>{question.view}</p>
                    </div>
                  )}

                  <ol className="choices">
                    {question.choices.map((choice, index) => (
                      <li key={choice}>
                        <button
                          className={selectedAnswer === choice ? 'selected' : ''}
                          disabled={isGraded}
                          onClick={() => selectAnswer(question.id, choice)}
                          type="button"
                        >
                          <span>{index + 1}</span>
                          {choice}
                        </button>
                      </li>
                    ))}
                  </ol>

                  {isGraded && (
                    <section className={`solution-panel ${isCorrect ? 'correct' : 'wrong'}`}>
                      <div>
                        <span>{isCorrect ? '정답' : '오답'}</span>
                        <strong>{question.answer}</strong>
                      </div>
                      <p>{question.explanation}</p>
                      <small>{question.wrongReason}</small>
                    </section>
                  )}
                </section>
              )
            })}
          </section>

          <div className="exam-actions">
            <button disabled={answeredCount < passageSet.questions.length || isGraded} onClick={gradeSet} type="button">
              세트 채점하기
            </button>
            <button onClick={generateSet} type="button">
              다음 지문 세트
            </button>
          </div>
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
                <span>
                  {savedProblem.domain} · {savedProblem.difficulty} · {savedProblem.question.problemType}
                </span>
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
