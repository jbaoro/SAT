export type Difficulty = '개념' | '표준' | '실전'
export type PassageDomain = '경제' | '과학' | '법'
export type ProblemType = '내용 일치' | '보기 적용' | '추론'
export type StyleMode = '평가원형' | 'EBS 학습형' | '고난도 실전형'

export type KoreanQuestion = {
  id: string
  number: number
  problemType: ProblemType
  question: string
  choices: string[]
  answer: string
  explanation: string
  wrongReason: string
}

export type KoreanPassageSet = {
  id: string
  domain: PassageDomain
  difficulty: Difficulty
  styleMode: StyleMode
  passageTitle: string
  passage: string
  concept: string
  evidence: string
  questions: KoreanQuestion[]
}

type PassagePattern = {
  domain: PassageDomain
  title: string
  concept: string
  topic: string
  opening: string
  thesis: string
  contrast: string
  example: string
  development: string
  mechanism: string
  implication: string
  limitation: string
  synthesis: string
  evidence: string
}

const patterns: PassagePattern[] = [
  {
    domain: '경제',
    title: '정보 비대칭과 시장의 선택',
    concept: '정보 비대칭',
    topic: '시장 거래에서 정보가 불균형하게 분포하는 상황',
    opening:
      '시장 거래는 구매자와 판매자가 거래 대상에 대해 어느 정도 비슷한 정보를 가지고 있다는 전제에서 원활하게 이루어진다. 그러나 현실에서는 한쪽이 품질이나 위험에 관한 정보를 더 많이 가진 경우가 많다.',
    thesis:
      '정보 비대칭이 커지면 가격은 상품의 실제 가치보다 평균적인 예상에 맞추어 형성되고, 이 과정에서 좋은 품질의 상품이 시장에서 밀려날 수 있다.',
    contrast:
      '일반적인 가격 경쟁에서는 낮은 가격이 구매자에게 유리해 보이지만, 품질 정보를 알기 어려운 시장에서는 낮은 가격이 오히려 낮은 품질을 암시하는 신호가 될 수 있다.',
    example:
      '중고차 시장에서 판매자는 차량의 실제 상태를 잘 알지만 구매자는 제한된 정보만 확인할 수 있다. 구매자가 평균 품질만 예상해 낮은 가격을 제시하면, 상태가 좋은 차량의 판매자는 제값을 받기 어렵다고 판단해 시장을 떠날 가능성이 커진다.',
    development:
      '이 문제를 완화하기 위해 보증, 인증, 평판과 같은 신호가 활용된다. 신호는 판매자가 자신의 상품이 일정한 품질을 갖추었음을 드러내는 장치이다. 다만 신호가 효과를 가지려면 낮은 품질의 판매자가 쉽게 모방하기 어려울 만큼 비용이나 책임이 따라야 한다.',
    mechanism:
      '신호가 비용을 요구한다는 점은 시장에서 중요한 의미를 갖는다. 좋은 품질의 판매자는 장기적으로 신뢰를 얻어 더 큰 이익을 기대할 수 있으므로 보증 비용을 감수할 유인이 있다. 반면 낮은 품질의 판매자는 같은 보증을 제공했을 때 발생할 사후 책임이 커지기 때문에 그 신호를 쉽게 모방하기 어렵다. 이처럼 신호의 효과는 단순히 정보를 많이 제공하는 데서 생기는 것이 아니라, 신호를 보내는 행위가 판매자의 실제 품질과 연결될 때 나타난다.',
    implication:
      '구매자의 입장에서도 신호를 해석하는 능력이 필요하다. 어떤 인증이 공신력 있는 기관의 엄격한 검사를 거친 것인지, 아니면 누구나 쉽게 얻을 수 있는 표시에 불과한지에 따라 신호의 의미는 달라진다. 따라서 시장에서 정보 비대칭을 줄이려면 신호의 존재뿐 아니라 그 신호가 만들어지고 유지되는 제도적 조건을 함께 살펴야 한다.',
    limitation:
      '그렇다고 모든 신호가 항상 시장을 개선하는 것은 아니다. 형식적인 인증처럼 비용은 낮고 효과는 과장된 신호가 늘어나면 구매자는 다시 신호 자체를 의심하게 된다.',
    synthesis:
      '결국 정보 비대칭의 문제는 정보가 부족하다는 사실만으로 설명되지 않는다. 핵심은 누가 어떤 정보를 가지고 있으며, 그 정보를 상대방이 믿을 수 있는 방식으로 전달할 수 있는가에 있다. 이 점에서 가격, 보증, 평판은 모두 독립된 장치가 아니라 시장 참여자들이 서로의 품질과 위험을 추정하는 과정 속에서 기능한다.',
    evidence:
      '글쓴이는 정보 비대칭이 가격과 품질 선택을 왜곡할 수 있으며, 신호는 그 문제를 줄이지만 신뢰 조건을 갖추어야 한다고 본다.',
  },
  {
    domain: '과학',
    title: '해수 순환과 기후 조절',
    concept: '해수의 밀도 순환',
    topic: '바닷물이 열과 염분 차이에 따라 이동하는 과정',
    opening:
      '바다는 지구 표면의 많은 열을 저장하고 이동시키는 거대한 장치처럼 작용한다. 이때 해수의 이동은 바람에 의해 생기는 표층 흐름뿐 아니라, 온도와 염분 차이가 만드는 밀도 차이에도 영향을 받는다.',
    thesis:
      '해수의 밀도 순환은 차가워지고 염분이 높아져 무거워진 물이 가라앉고, 그 빈자리를 다른 물이 채우는 과정에서 전 지구적 열 이동을 일으킨다.',
    contrast:
      '표층 해류가 주로 바람과 지구 자전의 영향을 받아 비교적 빠르게 움직이는 데 비해, 밀도 순환은 깊은 바다까지 이어지며 훨씬 느린 시간 규모에서 작동한다.',
    example:
      '고위도 지역에서 해수가 냉각되고 해빙이 형성되면 주변 바닷물의 염분은 상대적으로 높아진다. 이 물은 밀도가 커져 아래로 가라앉고, 깊은 바다를 따라 이동하면서 다른 지역의 해수와 열을 교환한다.',
    development:
      '이러한 순환은 특정 지역의 기온을 완만하게 조절하는 데 기여한다. 따뜻한 물이 고위도로 이동하면 열을 대기로 방출하고, 차가워진 물은 다시 심층으로 내려간다. 그래서 해수 순환의 변화는 해양 내부의 문제에 그치지 않고 대기와 기후 체계에도 영향을 준다.',
    mechanism:
      '밀도는 온도와 염분의 영향을 함께 받는다. 일반적으로 물은 차가워질수록 밀도가 커지고, 염분이 높을수록 더 무거워진다. 고위도 바다에서 해빙이 만들어질 때 얼음에는 염분이 거의 포함되지 않기 때문에 주변 바닷물의 염분은 높아진다. 이처럼 냉각과 염분 증가가 겹치면 해수는 더 쉽게 가라앉고, 가라앉은 물은 심층에서 천천히 이동한다.',
    implication:
      '이 순환이 약해지면 열의 이동 경로도 달라질 수 있다. 예컨대 빙하가 녹아 많은 담수가 바다로 유입되면 표층 해수의 염분이 낮아지고, 그 결과 고위도 해수가 충분히 무거워지지 못할 가능성이 있다. 이런 변화는 특정 해역의 순환에만 머물지 않고, 대기 순환이나 강수 양상에도 간접적으로 영향을 미칠 수 있다.',
    limitation:
      '다만 밀도 순환을 단순히 바닷물이 차가워져 가라앉는 현상으로만 이해하면 부족하다. 염분, 해빙, 담수 유입, 표층 흐름이 함께 작용하기 때문에 어느 한 요인만으로 순환 변화를 설명하기 어렵다.',
    synthesis:
      '따라서 해수 순환은 한 방향으로 흐르는 단순한 물길이라기보다, 여러 물리적 조건이 맞물려 유지되는 거대한 조절 체계로 보아야 한다. 표층과 심층의 흐름, 바닷물의 온도와 염분, 대기와 해빙의 변화는 서로 분리되어 있지 않다. 이러한 상호 작용을 고려할 때 해양의 변화가 기후 변화 논의에서 중요한 근거로 다루어지는 이유를 이해할 수 있다.',
    evidence:
      '글쓴이는 해수의 밀도 순환이 온도와 염분에 따른 밀도 차이로 작동하며, 전 지구적 열 이동과 기후 조절에 영향을 준다고 본다.',
  },
  {
    domain: '법',
    title: '책임의 성립과 과실 판단',
    concept: '과실 책임',
    topic: '어떤 행위에 법적 책임을 물을 수 있는 조건',
    opening:
      '어떤 손해가 발생했다고 해서 언제나 그 손해를 일으킨 사람에게 법적 책임이 인정되는 것은 아니다. 법은 결과만이 아니라 행위 당시의 주의 의무와 예측 가능성을 함께 고려한다.',
    thesis:
      '과실 책임은 행위자가 요구되는 주의 의무를 다하지 않았고, 그로 인해 손해가 발생했다는 관련성이 인정될 때 성립한다.',
    contrast:
      '단순히 나쁜 결과가 생겼다는 이유만으로 책임을 묻는 관점은 피해 구제에 유리해 보이지만, 행위자가 피할 수 없었던 결과까지 책임지게 할 위험이 있다.',
    example:
      '예를 들어 운전자가 제한 속도를 지키고 전방 주시 의무도 다했는데 갑자기 도로에 물체가 떨어져 사고가 났다면, 결과만으로 곧바로 과실을 인정하기 어렵다. 반대로 충분히 예측 가능한 위험을 무시했다면 같은 사고라도 책임 판단이 달라질 수 있다.',
    development:
      '따라서 과실 판단에서는 평균적인 사람이 같은 상황에서 어떤 주의를 기울였어야 하는지가 기준이 된다. 이 기준은 행위자의 주관적 의도만으로 정해지지 않고, 상황의 위험성, 예측 가능성, 회피 가능성 등을 종합해 판단된다.',
    mechanism:
      '주의 의무는 행위자에게 결과를 완전히 막으라는 요구가 아니다. 그것은 특정 상황에서 합리적으로 기대되는 조치를 취했는지를 묻는 기준이다. 위험을 예측할 수 있었고, 그 위험을 줄일 현실적인 방법이 있었는데도 이를 하지 않았다면 과실이 인정될 가능성이 높다. 반대로 손해가 발생했더라도 그 위험을 예측하기 어려웠거나 피할 수단이 없었다면 책임을 묻기 어렵다.',
    implication:
      '이 때문에 법적 판단에서는 사건 이후의 결과만을 놓고 행위를 평가하는 태도를 경계한다. 결과를 알고 난 뒤에는 위험이 명백해 보이지만, 행위 당시에는 여러 가능성 중 하나에 불과했을 수 있다. 따라서 책임 판단은 사후적 비난이 아니라 행위 당시의 정보와 선택 가능성을 기준으로 이루어져야 한다.',
    limitation:
      '그러나 주의 의무를 지나치게 넓게 인정하면 모든 사고를 사후적으로 비난하게 되는 문제가 생긴다. 그래서 법적 책임은 손해 발생, 주의 의무 위반, 인과 관계가 함께 검토될 때 안정적으로 판단될 수 있다.',
    synthesis:
      '결국 과실 책임은 피해를 입은 사람을 보호하려는 목적과 행위자에게 부당한 부담을 지우지 않으려는 목적 사이에서 균형을 찾는 장치이다. 손해가 크다는 이유만으로 책임을 인정하면 예측할 수 없던 사고까지 모두 개인에게 떠넘기게 되고, 반대로 주의 의무를 지나치게 좁게 보면 피해 구제가 어려워진다. 그러므로 법은 결과와 행위 사이의 관련성을 단계적으로 따진다.',
    evidence:
      '글쓴이는 법적 책임이 손해라는 결과만으로 정해지지 않고, 주의 의무 위반과 예측 가능성, 인과 관계를 함께 따져야 한다고 본다.',
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
    pattern.mechanism,
    `${pattern.implication} ${pattern.limitation}`,
    `${pattern.synthesis} 따라서 ${pattern.evidence}`,
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

function createQuestion(
  setId: string,
  pattern: PassagePattern,
  problemType: ProblemType,
  styleMode: StyleMode,
  number: number,
): KoreanQuestion {
  const choices = buildChoices(pattern, problemType, styleMode)
  const answer = getAnswer(problemType, pattern)

  return {
    id: `${setId}-q${number}`,
    number,
    problemType,
    question: getQuestion(problemType, styleMode),
    choices,
    answer,
    wrongReason:
      '오답은 글의 일부 표현만 맞거나, 대비되는 관점을 글쓴이의 최종 주장처럼 바꾸는 방식으로 설계했습니다.',
    explanation:
      `정답은 "${pattern.evidence}"라는 글의 결론부와 직접 연결됩니다. 선지를 고를 때는 사례의 표면 내용보다 그 사례가 중심 주장에 어떻게 쓰였는지 확인해야 합니다.`,
  }
}

export function createKoreanReadingSet(
  domain: PassageDomain,
  difficulty: Difficulty,
  styleMode: StyleMode,
): KoreanPassageSet {
  const seed = Date.now()
  const domainPatterns = patterns.filter((pattern) => pattern.domain === domain)
  const pattern = pick(domainPatterns, seed)
  const id = `korean-reading-${domain}-${difficulty}-${styleMode}-${seed}`
  const questionTypes: ProblemType[] = ['내용 일치', '추론', '보기 적용']

  return {
    id,
    domain,
    difficulty,
    styleMode,
    passageTitle: pattern.title,
    passage: buildPassage(pattern, styleMode),
    concept: pattern.concept,
    evidence: pattern.evidence,
    questions: questionTypes.map((type, index) => createQuestion(id, pattern, type, styleMode, index + 1)),
  }
}
