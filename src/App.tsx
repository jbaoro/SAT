import { useMemo, useState } from 'react'
import './App.css'

type Subject = '국어' | '수학' | '영어' | '탐구'
type Difficulty = '개념' | '표준' | '실전'
type ProblemType = '객관식' | '단답형' | '지문형'
type StyleMode = '평가원형' | 'EBS 학습형' | '고난도 실전형'

type Problem = {
  id: string
  subject: Subject
  difficulty: Difficulty
  problemType: ProblemType
  styleMode: StyleMode
  passage?: string
  question: string
  choices?: string[]
  answer: string
  explanation: string
  concept: string
}

type SavedProblem = Problem & {
  savedAt: string
}

const subjects: Subject[] = ['국어', '수학', '영어', '탐구']
const difficulties: Difficulty[] = ['개념', '표준', '실전']
const problemTypes: ProblemType[] = ['객관식', '단답형', '지문형']
const styleModes: StyleMode[] = ['평가원형', 'EBS 학습형', '고난도 실전형']

const storageKey = 'sat-practice-generator.saved'

const optionCopy: Record<Subject, string[]> = {
  국어: ['서술 방식', '중심 내용', '보기 적용', '선지 판단'],
  수학: ['함수', '수열', '확률', '미분'],
  영어: ['빈칸 추론', '순서 배열', '문장 삽입', '어휘 추론'],
  탐구: ['자료 해석', '개념 비교', '인과 관계', '그래프 분석'],
}

const passages: Record<Subject, string[]> = {
  국어: [
    '현대 사회에서 정보는 단순히 축적되는 대상이 아니라, 맥락 안에서 재구성될 때 의미를 얻는다. 같은 자료도 어떤 관점으로 배열하느냐에 따라 전혀 다른 결론으로 이어질 수 있다.',
    '문학 작품의 화자는 세계를 직접 설명하기보다 감각적 장면을 통해 정서를 드러낸다. 독자는 반복되는 이미지와 시선의 변화를 따라가며 작품의 긴장을 파악한다.',
  ],
  수학: [
    '함수 f(x)는 모든 실수 x에 대하여 f(x + 2) = f(x) + 4를 만족한다. 또한 f(1) = 3이고, x가 1에서 5까지 변할 때 f(x)는 일정한 비율로 증가한다고 하자.',
    '첫째항이 3인 등차수열 {a_n}에서 a_5 = 15이다. 이 수열의 첫 n항의 합을 S_n이라 할 때, S_n의 값이 90 이상이 되는 가장 작은 n을 구하라.',
  ],
  영어: [
    'When students review a mistake right after solving a problem, they often remember only the answer. However, when they return to it later and explain the reason in their own words, the mistake becomes a durable learning signal.',
    'A good study plan does not simply add more hours. It changes the order of effort so that difficult tasks appear when attention is still fresh, and lighter review supports memory at the end of the day.',
  ],
  탐구: [
    'A 지역은 산업화 이후 청년층의 유입이 증가했지만, 최근에는 주거 비용 상승으로 주변 지역으로의 이동이 확대되고 있다. 이에 따라 중심지와 주변지의 기능 분화가 뚜렷해졌다.',
    '어떤 생태계에서 포식자 수가 감소하자 초식동물의 개체 수가 일시적으로 증가하였다. 이후 식물량이 줄어들면서 초식동물 개체 수도 다시 감소하는 양상이 나타났다.',
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
  const concept = pick(optionCopy[subject], seed)
  const passage = problemType === '단답형' ? undefined : pick(passages[subject], seed)
  const id = `${subject}-${difficulty}-${problemType}-${seed}`
  const tone =
    styleMode === 'EBS 학습형'
      ? '학습 개념을 확인하는'
      : styleMode === '고난도 실전형'
        ? '추론 과정을 한 번 더 요구하는'
        : '선지 판단의 근거를 묻는'

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
      concept,
      question:
        problemType === '단답형'
          ? `조건을 만족하는 값의 합을 구하시오. (${tone} 문항)`
          : `윗글의 조건을 바탕으로 알맞은 값을 고른 것은? (${tone} 문항)`,
      choices:
        problemType === '단답형'
          ? undefined
          : choices,
      answer,
      explanation:
        '주어진 조건을 먼저 식으로 정리한 뒤, 변화량을 단계별로 누적하면 정답에 도달한다. 실전에서는 계산보다 조건 해석 순서를 안정적으로 잡는 것이 핵심이다.',
    }
  }

  const answerIndex = difficulty === '실전' ? 3 : difficulty === '표준' ? 2 : 1
  const choices = [
    `${concept}을 단순 사례로만 이해해야 한다.`,
    `${concept}은 지문의 핵심 흐름과 직접 연결된다.`,
    `제시된 근거와 무관한 외부 지식이 정답 판단의 기준이다.`,
    `부분 표현 하나만으로 전체 결론을 확정할 수 있다.`,
    `반복된 표현은 글의 구조와 관련이 없다.`,
  ]

  return {
    id,
    subject,
    difficulty,
    problemType,
    styleMode,
    passage,
    concept,
    question:
      problemType === '단답형'
        ? `제시된 내용의 핵심 개념을 한 단어로 쓰시오. (${tone} 문항)`
        : `윗글을 바탕으로 판단할 때 가장 적절한 것은? (${tone} 문항)`,
    choices: problemType === '단답형' ? undefined : choices,
    answer: problemType === '단답형' ? concept : `${answerIndex + 1}번`,
    explanation:
      '정답은 지문 전체의 흐름과 직접 연결되는 근거를 포함한다. 오답은 일부 표현을 과장하거나, 지문 밖의 정보를 판단 기준으로 삼는 방식으로 구성되어 있다.',
  }
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
  const [showAnswer, setShowAnswer] = useState(false)
  const [savedProblems, setSavedProblems] = useState<SavedProblem[]>(loadSavedProblems)
  const [problem, setProblem] = useState<Problem>(() =>
    createProblem('국어', '표준', '객관식', '평가원형'),
  )

  const isSaved = useMemo(
    () => savedProblems.some((savedProblem) => savedProblem.id === problem.id),
    [problem.id, savedProblems],
  )

  const generateProblem = () => {
    setProblem(createProblem(subject, difficulty, problemType, styleMode))
    setShowAnswer(false)
  }

  const saveProblem = () => {
    if (isSaved) return

    const nextProblems = [{ ...problem, savedAt: new Date().toISOString() }, ...savedProblems].slice(0, 12)
    setSavedProblems(nextProblems)
    localStorage.setItem(storageKey, JSON.stringify(nextProblems))
  }

  return (
    <main className="app-shell">
      <section className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">SAT-KR Practice Generator</p>
            <h1>수능형 연습문제 생성기</h1>
          </div>
          <div className="summary-pill">
            <span>{subject}</span>
            <strong>{difficulty}</strong>
          </div>
        </header>

        <section className="generator-grid">
          <aside className="control-panel" aria-label="문제 생성 조건">
            <div className="control-group">
              <span>과목</span>
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
              <span>난이도</span>
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
              새 문제 생성
            </button>
          </aside>

          <section className="problem-stage" aria-live="polite">
            <div className="problem-meta">
              <span>{problem.subject}</span>
              <span>{problem.styleMode}</span>
              <span>{problem.concept}</span>
            </div>

            {problem.passage && <p className="passage">{problem.passage}</p>}

            <h2>{problem.question}</h2>

            {problem.choices ? (
              <ol className="choices">
                {problem.choices.map((choice) => (
                  <li key={choice}>{choice}</li>
                ))}
              </ol>
            ) : (
              <input className="answer-input" placeholder="답안을 입력해 보세요" />
            )}

            <div className="problem-actions">
              <button onClick={() => setShowAnswer((value) => !value)} type="button">
                {showAnswer ? '해설 접기' : '정답 및 해설 보기'}
              </button>
              <button disabled={isSaved} onClick={saveProblem} type="button">
                {isSaved ? '저장됨' : '오답노트 저장'}
              </button>
            </div>

            {showAnswer && (
              <section className="answer-box">
                <strong>정답: {problem.answer}</strong>
                <p>{problem.explanation}</p>
              </section>
            )}
          </section>
        </section>
      </section>

      <aside className="note-panel">
        <div>
          <p className="eyebrow">Review</p>
          <h2>오답노트</h2>
        </div>
        {savedProblems.length === 0 ? (
          <p className="empty-state">저장한 문제가 아직 없습니다.</p>
        ) : (
          <ul>
            {savedProblems.map((savedProblem) => (
              <li key={savedProblem.id}>
                <span>{savedProblem.subject}</span>
                <strong>{savedProblem.concept}</strong>
                <small>{savedProblem.answer}</small>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </main>
  )
}

export default App
