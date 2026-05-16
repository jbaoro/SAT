export type Difficulty = '개념' | '표준' | '실전'
export type ProblemType = '내용 일치' | '보기 적용' | '추론'
export type StyleMode = '평가원형' | 'EBS 학습형' | '고난도 실전형'

export type KoreanProblem = {
  id: string
  difficulty: Difficulty
  problemType: ProblemType
  styleMode: StyleMode
  passageTitle: string
  passage: string
  question: string
  choices: string[]
  answer: string
  explanation: string
  concept: string
  evidence: string
  wrongReason: string
}

type PassagePattern = {
  title: string
  concept: string
  topic: string
  opening: string
  thesis: string
  contrast: string
  example: string
  development: string
  limitation: string
  evidence: string
}

const patterns: PassagePattern[] = [
  {
    title: '정보의 배열과 판단',
    concept: '정보의 재구성',
    topic: '자료가 의미를 얻는 방식',
    opening:
      '우리는 흔히 많은 자료를 확보하면 판단의 정확성이 자연스럽게 높아진다고 생각한다. 그러나 자료가 많다는 사실은 판단의 출발점일 뿐, 그 자체가 곧바로 설득력 있는 결론을 보장하지는 않는다.',
    thesis:
      '정보는 그 자체로 완결된 의미를 갖기보다, 어떤 기준으로 배열되고 해석되는지에 따라 판단의 방향을 바꾼다.',
    contrast:
      '단순한 자료의 양을 중시하는 관점은 정보의 신뢰도를 높이는 데 도움을 줄 수 있지만, 자료 사이의 관계를 설명하지 못하면 결론의 설득력은 약해진다.',
    example:
      '예를 들어 같은 통계 자료라도 시간 순서로 배열하면 변화 추세가 드러나고, 집단별로 배열하면 차이의 원인이 더 뚜렷하게 보일 수 있다.',
    development:
      '이때 중요한 것은 자료가 말해 주는 사실과 연구자가 부여한 해석을 구별하는 일이다. 자료는 일정한 범위 안의 현상을 보여 주지만, 그 현상이 왜 나타났는지는 자료를 묶는 기준과 비교 대상에 따라 달라진다. 따라서 독자는 글쓴이가 어떤 기준을 선택했는지, 그 기준이 결론을 이끌기에 충분한지 확인해야 한다.',
    limitation:
      '물론 배열 기준을 세운다고 해서 모든 해석이 정당화되는 것은 아니다. 특정 결론을 미리 정해 놓고 그에 맞는 자료만 골라 배열한다면, 정보의 재구성은 오히려 판단을 왜곡하는 도구가 될 수 있다.',
    evidence:
      '글쓴이는 정보의 가치를 자료의 양이 아니라 배열 기준과 해석 맥락에서 찾고 있다.',
  },
  {
    title: '기술과 책임',
    concept: '기술의 사회적 책임',
    topic: '기술 발전을 평가하는 기준',
    opening:
      '새로운 기술은 등장할 때마다 더 빠르고 편리한 생활을 약속한다. 그래서 기술의 가치는 흔히 성능, 속도, 효율성과 같은 지표를 중심으로 평가된다.',
    thesis:
      '새로운 기술은 효율성을 높이지만, 그 효과가 사회 전체에 어떻게 분배되는지까지 함께 검토될 때 비로소 공적 가치를 지닌다.',
    contrast:
      '기술을 도구로만 보는 관점은 개발 속도와 성능을 강조한다. 그러나 이런 관점은 기술이 낳는 비용을 누가 부담하는지 설명하지 못한다.',
    example:
      '자동화 시스템은 생산 시간을 줄일 수 있지만, 노동 방식의 변화와 접근성 문제를 함께 고려하지 않으면 특정 집단에 불리하게 작용할 수 있다.',
    development:
      '기술의 영향은 사용자의 선택만으로 결정되지 않는다. 제도, 비용, 교육 수준, 지역적 조건이 기술의 활용 가능성을 제한하기 때문이다. 같은 기술이라도 어떤 사람에게는 기회를 넓히는 수단이 되지만, 다른 사람에게는 기존의 격차를 더 크게 만드는 원인이 될 수 있다.',
    limitation:
      '그렇다고 기술 발전을 멈추어야 한다는 뜻은 아니다. 글쓴이가 문제 삼는 것은 발전 자체가 아니라, 발전의 결과를 평가할 때 편익만 보고 부담의 분배를 보지 않는 태도이다.',
    evidence:
      '글쓴이는 기술의 가치를 성능이 아니라 사회적 영향까지 포함해 판단해야 한다고 본다.',
  },
  {
    title: '기억과 복습',
    concept: '오류 기반 학습',
    topic: '틀린 문제를 다시 보는 이유',
    opening:
      '복습은 많은 학생에게 이미 푼 문제를 다시 확인하는 일로 받아들여진다. 그러나 같은 문제를 반복해서 보는 것만으로는 실수가 줄어들지 않는 경우가 많다.',
    thesis:
      '복습의 핵심은 같은 답을 다시 확인하는 데 있지 않고, 처음에 왜 그 답을 선택했는지 되짚어 사고의 경로를 수정하는 데 있다.',
    contrast:
      '정답만 빠르게 확인하는 방식은 즉각적인 안도감을 줄 수 있지만, 오답이 생긴 원인을 남겨 두기 때문에 비슷한 문제에서 같은 실수를 반복하게 한다.',
    example:
      '학생이 매력적인 오답의 근거를 직접 설명하면, 단순한 실수가 다음 판단에서 사용할 수 있는 단서로 바뀐다.',
    development:
      '오답을 분석한다는 것은 정답 선지를 외우는 것과 다르다. 학생은 자신이 주목한 표현, 놓친 조건, 성급하게 일반화한 부분을 확인해야 한다. 이 과정에서 실수는 부끄러운 결과가 아니라 사고 습관을 드러내는 자료가 된다.',
    limitation:
      '다만 모든 오답을 같은 깊이로 분석할 필요는 없다. 계산 실수처럼 원인이 단순한 경우와 개념을 잘못 적용한 경우는 복습 방식이 달라야 한다. 중요한 것은 오답의 종류를 구분하고, 다음 문제에서 사용할 수 있는 교정 규칙을 남기는 것이다.',
    evidence:
      '글쓴이는 복습을 정답 암기가 아니라 사고 과정의 교정으로 이해한다.',
  },
]

function pick<T>(items: T[], seed: number) {
  return items[Math.abs(seed) % items.length]
}

function buildPassage(pattern: PassagePattern, styleMode: StyleMode) {
  const styleOpening =
    styleMode === 'EBS 학습형'
      ? `${pattern.topic}은 학습 과정에서 자주 다루어지는 소재이다.`
      : `${pattern.topic}을 이해하려면 표면적인 현상보다 그 현상이 놓인 맥락을 살펴야 한다.`

  return [
    `${styleOpening} ${pattern.opening}`,
    `${pattern.thesis} ${pattern.contrast}`,
    `${pattern.example} ${pattern.development}`,
    `${pattern.limitation} 따라서 ${pattern.evidence}`,
  ].join('\n\n')
}

function buildChoices(pattern: PassagePattern, problemType: ProblemType, styleMode: StyleMode) {
  const hardTrap =
    styleMode === '고난도 실전형'
      ? '글쓴이는 대비되는 관점을 부분적으로 인정하지만, 최종 판단에서는 그 관점을 더 우위에 둔다.'
      : '비교되는 관점은 글쓴이가 최종적으로 지지하는 입장이다.'

  if (problemType === '보기 적용') {
    const view = '새로운 자료를 평가할 때 먼저 자료가 어떤 기준으로 묶였는지 확인해야 한다.'

    return [
      `${view} 이는 글의 핵심 주장과 맞닿아 있다.`,
      '새로운 자료는 양이 많을수록 해석 기준과 무관하게 더 신뢰할 수 있다.',
      '구체적 사례는 중심 주장을 약화하기 위해 제시된 예외에 해당한다.',
      '글쓴이는 판단의 기준보다 결과의 빠른 도출을 더 중시한다.',
      hardTrap,
    ]
  }

  if (problemType === '추론') {
    return [
      `글쓴이는 ${pattern.concept}을 단순한 절차가 아니라 판단의 질을 바꾸는 요인으로 본다.`,
      `글쓴이는 ${pattern.concept}이 객관적 판단을 방해한다고 본다.`,
      '글쓴이는 사례보다 정의를 먼저 암기해야 한다고 주장한다.',
      '글쓴이는 대비되는 관점이 더 현실적이라고 평가한다.',
      '글쓴이는 문제 해결에서 맥락을 제거해야 정확성이 높아진다고 본다.',
    ]
  }

  return [
    pattern.evidence,
    `${pattern.concept}은 글에서 주변적 예시로만 제시된다.`,
    '글쓴이는 자료의 양이 많으면 해석 과정이 필요 없다고 본다.',
    '제시된 사례는 글쓴이의 주장과 반대되는 결론을 이끈다.',
    '대비되는 관점은 글 전체의 결론으로 제시된다.',
  ]
}

function getAnswer(problemType: ProblemType, pattern: PassagePattern) {
  if (problemType === '보기 적용') {
    return '새로운 자료를 평가할 때 먼저 자료가 어떤 기준으로 묶였는지 확인해야 한다. 이는 글의 핵심 주장과 맞닿아 있다.'
  }

  if (problemType === '추론') {
    return `글쓴이는 ${pattern.concept}을 단순한 절차가 아니라 판단의 질을 바꾸는 요인으로 본다.`
  }

  return pattern.evidence
}

function getQuestion(problemType: ProblemType, styleMode: StyleMode) {
  const suffix =
    styleMode === '고난도 실전형'
      ? ' 가장 적절한 것을 고르시오.'
      : ' 적절한 것을 고르시오.'

  if (problemType === '보기 적용') return `<보기>의 관점을 윗글에 적용한 내용으로${suffix}`
  if (problemType === '추론') return `윗글의 글쓴이 관점으로 추론한 내용으로${suffix}`
  return `윗글의 내용과 일치하는 것으로${suffix}`
}

export function createKoreanReadingProblem(
  difficulty: Difficulty,
  problemType: ProblemType,
  styleMode: StyleMode,
): KoreanProblem {
  const seed = Date.now()
  const pattern = pick(patterns, seed)
  const choices = buildChoices(pattern, problemType, styleMode)
  const answer = getAnswer(problemType, pattern)

  return {
    id: `korean-reading-${difficulty}-${problemType}-${styleMode}-${seed}`,
    difficulty,
    problemType,
    styleMode,
    passageTitle: pattern.title,
    passage: buildPassage(pattern, styleMode),
    question: getQuestion(problemType, styleMode),
    choices,
    answer,
    concept: pattern.concept,
    evidence: pattern.evidence,
    wrongReason:
      '오답은 글의 일부 표현만 맞거나, 대비되는 관점을 글쓴이의 최종 주장처럼 바꾸는 방식으로 설계했습니다.',
    explanation:
      `정답은 "${pattern.evidence}"라는 글의 결론부와 직접 연결됩니다. 선지를 고를 때는 사례의 표면 내용보다 그 사례가 중심 주장에 어떻게 쓰였는지 확인해야 합니다.`,
  }
}
