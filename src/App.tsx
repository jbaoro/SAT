import { useMemo, useState } from 'react'
import './App.css'

type Subject = '국어' | '수학' | '영어' | '탐구'
type Difficulty = '개념' | '표준' | '실전'
type ProblemType = '객관식' | '단답형' | '지문형'
type StyleMode = '평가원형' | 'EBS 학습형' | '고난도 실전형'
type GradingState = 'idle' | 'correct' | 'wrong'

type Problem = {
  id: string
  subject: Subject
  difficulty: Difficulty
  problemType: ProblemType
  styleMode: StyleMode
  passage?: string
  sourceHint: string
  question: string
  choices?: string[]
  answer: string
  explanation: string
  concept: string
  trap: string
}

type SavedProblem = Problem & {
  savedAt: string
  submittedAnswer: string
}

const subjects: Subject[] = ['국어', '수학', '영어', '탐구']
const difficulties: Difficulty[] = ['개념', '표준', '실전']
const problemTypes: ProblemType[] = ['객관식', '단답형', '지문형']
const styleModes: StyleMode[] = ['평가원형', 'EBS 학습형', '고난도 실전형']

const storageKey = 'sat-practice-generator.saved'

const concepts: Record<Subject, string[]> = {
  국어: ['정보의 재구성', '화자의 태도', '보기 적용', '선지 판단'],
  수학: ['함수의 규칙', '등차수열', '조건 해석', '미분 계수'],
  영어: ['빈칸 추론', '문장 삽입', '글의 순서', '요지 파악'],
  탐구: ['자료 해석', '개념 비교', '인과 관계', '그래프 분석'],
}

const passages: Record<Subject, string[]> = {
  국어: [
    '정보는 그것이 놓인 맥락에 따라 전혀 다른 의미를 갖는다. 동일한 자료라도 어떤 기준으로 배열하고 해석하느냐에 따라 판단의 방향이 달라진다. 따라서 독자는 글에 제시된 사례가 단순한 예시인지, 주장 전체를 지탱하는 근거인지 구별해야 한다.',
    '작품 속 화자는 대상과 일정한 거리를 유지하면서도 반복되는 감각 이미지를 통해 내면의 동요를 드러낸다. 직접적인 감정 표현이 적을수록 시선의 이동과 장면 배열은 정서를 파악하는 중요한 단서가 된다.',
  ],
  수학: [
    '함수 f(x)는 모든 실수 x에 대하여 f(x + 2) = f(x) + 4를 만족한다. f(1) = 3이고, 구간 [1, 5]에서 f(x)는 일정한 비율로 증가한다고 하자.',
    '첫째항이 3인 등차수열 {a_n}에서 a_5 = 15이다. 이 수열의 첫 n항의 합을 S_n이라 할 때, S_n이 처음으로 90 이상이 되는 순간을 생각하자.',
  ],
  영어: [
    'A productive review session is not a second attempt to memorize the same answer. It is a chance to rebuild the path that led to the mistake. When students explain why an option was tempting but wrong, they turn the error into usable evidence.',
    'Good study plans do not merely add more hours. They place difficult tasks when attention is fresh and use lighter review to protect memory later. The order of effort often matters as much as the amount of effort.',
  ],
  탐구: [
    'A 지역은 산업화 이후 청년층 유입이 증가했지만, 최근에는 주거 비용 상승으로 주변 지역으로의 이동이 확대되었다. 중심지는 업무 기능이 강화되고 주변지는 주거 기능이 확대되는 양상이 나타난다.',
    '어떤 생태계에서 포식자 수가 감소하자 초식동물의 개체 수가 일시적으로 증가하였다. 이후 식물량이 줄어들면서 초식동물 개체 수도 다시 감소하는 변화가 관찰되었다.',
  ],
}

function pick<T>(items: T[], seed: number) {
  return items[Math.abs(seed) % items.length]
}

function createProblem(
  subject: Subject,
  difficulty: Difficulty,
  problemType: ProblemType,
  styleMode: StyleMode,
): Problem {
  const seed = Date.now()
  const concept = pick(concepts[subject], seed)
  const passage = problemType === '단답형' ? undefined : pick(passages[subject], seed)
  const id = `${subject}-${difficulty}-${problemType}-${seed}`
  const sourceHint =
    styleMode === 'EBS 학습형'
      ? 'EBS 학습 개념을 변형한 새 문항'
      : styleMode === '고난도 실전형'
        ? '고난도 실전 판단형 새 문항'
        : '평가원식 근거 판단형 새 문항'

  if (subject === '수학') {
    const base = difficulty === '개념' ? 2 : difficulty === '표준' ? 4 : 6
    const answer = String(base * 8 + 7)
    const choices = [base * 8 + 3, base * 8 + 7, base * 8 + 11, base * 9 + 9, base * 10 + 5].map(String)

    return {
      id,
      subject,
      difficulty,
      problemType,
      styleMode,
      passage,
      sourceHint,
      concept,
      trap: '조건을 식으로 바꾸기 전에 숫자만 대입하면 오답 선지로 이동합니다.',
      question:
        problemType === '단답형'
          ? '조건을 만족하는 값을 구하시오.'
          : '윗글의 조건을 바탕으로 구한 값으로 가장 적절한 것은?',
      choices: problemType === '단답형' ? undefined : choices,
      answer,
      explanation:
        '먼저 변화 조건을 식으로 정리하고, 기준점에서 목표 지점까지의 변화량을 누적한다. 계산을 시작하기 전에 주어진 등식이 의미하는 간격과 증가량을 확인하는 것이 핵심이다.',
    }
  }

  const answerText = `${concept}은 지문 전체의 흐름과 직접 연결된다.`
  const choices = [
    `${concept}을 단순한 배경 지식으로만 처리해야 한다.`,
    answerText,
    '제시된 근거와 무관한 외부 지식이 판단의 기준이다.',
    '부분 표현 하나만으로 전체 결론을 확정할 수 있다.',
    '반복된 표현은 글의 구조와 관련이 없다.',
  ]

  return {
    id,
    subject,
    difficulty,
    problemType,
    styleMode,
    passage,
    sourceHint,
    concept,
    trap: '오답은 지문 일부만 맞거나, 지문 밖 정보를 끌어오는 방식으로 설계되었습니다.',
    question:
      problemType === '단답형'
        ? '제시된 내용의 핵심 개념을 쓰시오.'
        : '윗글을 바탕으로 판단할 때 가장 적절한 것은?',
    choices: problemType === '단답형' ? undefined : choices,
    answer: problemType === '단답형' ? concept : answerText,
    explanation:
      '정답은 지문 전체의 논리와 직접 연결되는 근거를 포함한다. 오답은 일부 표현을 과장하거나, 지문 밖의 정보를 판단 기준으로 삼는 방식으로 구성되어 있다.',
  }
}

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
  const [subject, setSubject] = useState<Subject>('국어')
  const [difficulty, setDifficulty] = useState<Difficulty>('표준')
  const [problemType, setProblemType] = useState<ProblemType>('객관식')
  const [styleMode, setStyleMode] = useState<StyleMode>('평가원형')
  const [submittedAnswer, setSubmittedAnswer] = useState('')
  const [gradingState, setGradingState] = useState<GradingState>('idle')
  const [savedProblems, setSavedProblems] = useState<SavedProblem[]>(loadSavedProblems)
  const [problem, setProblem] = useState<Problem>(() =>
    createProblem('국어', '표준', '객관식', '평가원형'),
  )

  const isAnswered = gradingState !== 'idle'
  const scoreLabel = useMemo(() => {
    if (gradingState === 'correct') return '정답'
    if (gradingState === 'wrong') return '오답'
    return '미채점'
  }, [gradingState])

  const generateProblem = () => {
    setProblem(createProblem(subject, difficulty, problemType, styleMode))
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
          <h1>오늘 풀 한 문제를 진짜처럼.</h1>
        </div>

        <div className="control-group">
          <p>과목</p>
          <div className="segmented">
            {subjects.map((item) => (
              <button
                className={subject === item ? 'active' : ''}
                key={item}
                onClick={() => setSubject(item)}
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
          문제 출제
        </button>
      </aside>

      <section className="exam-area">
        <header className="exam-header">
          <div>
            <p>{problem.sourceHint}</p>
            <h2>{problem.subject} · {problem.concept}</h2>
          </div>
          <div className={`score-chip ${gradingState}`}>
            {scoreLabel}
          </div>
        </header>

        <article className="paper">
          <div className="paper-meta">
            <span>{problem.difficulty}</span>
            <span>{problem.problemType}</span>
            <span>{problem.styleMode}</span>
          </div>

          {problem.passage && <p className="passage">{problem.passage}</p>}

          <section className="question-block">
            <span className="question-number">01</span>
            <h3>{problem.question}</h3>
          </section>

          {problem.choices ? (
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
          ) : (
            <label className="short-answer">
              <span>답안</span>
              <input
                disabled={isAnswered}
                onChange={(event) => setSubmittedAnswer(event.target.value)}
                placeholder="정답을 입력하세요"
                value={submittedAnswer}
              />
            </label>
          )}

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
              <small>{problem.trap}</small>
            </section>
          )}
        </article>
      </section>

      <aside className="review-panel">
        <div className="review-header">
          <span>Review</span>
          <strong>{savedProblems.length}</strong>
        </div>
        <h2>자동 오답노트</h2>

        {savedProblems.length === 0 ? (
          <p className="empty-state">틀린 문제가 생기면 여기 쌓입니다.</p>
        ) : (
          <ul>
            {savedProblems.map((savedProblem) => (
              <li key={savedProblem.id}>
                <span>{savedProblem.subject} · {savedProblem.difficulty}</span>
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
