export type Difficulty = '개념' | '표준' | '실전' | '고난도'
export type PassageDomain = '경제' | '과학' | '법'
export type ProblemType = '내용 일치' | '보기 적용' | '추론'
export type StyleMode = '평가원형' | 'EBS 학습형' | '고난도 실전형'

export type KoreanQuestion = {
  id: string
  number: number
  problemType: ProblemType
  question: string
  view?: string
  choices: string[]
  answer: string
  explanation: string
  wrongReason: string
  choiceExplanations: string[]
  skillFocus: string
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
  advancedRelation: string
  evidence: string
  contentAnswer: string
  inferenceAnswer: string
  viewText: string
  viewAnswer: string
  contentDistractors: string[]
  inferenceDistractors: string[]
  viewDistractors: string[]
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
    advancedRelation:
      '특히 신호가 효과를 갖는 조건은 정보 비대칭의 완전한 해소가 아니라 선택 가능한 대안들의 상대적 신뢰도를 높이는 데 있다. 구매자는 여전히 모든 품질 정보를 알 수 없지만, 책임이 따르는 신호를 통해 판매자 집단을 구분할 수 있다. 따라서 이 글의 논점은 정보가 많아질수록 시장이 자동으로 개선된다는 데 있지 않고, 정보가 어떤 비용 구조와 결합할 때 신뢰 가능한 판단 근거가 되는지에 있다.',
    evidence:
      '글쓴이는 정보 비대칭이 가격과 품질 선택을 왜곡할 수 있으며, 신호는 그 문제를 줄이지만 신뢰 조건을 갖추어야 한다고 본다.',
    contentAnswer:
      '정보 비대칭이 존재하는 시장에서는 가격이 상품의 실제 품질을 충분히 반영하지 못해 일부 판매자의 거래 유인이 약화될 수 있다.',
    inferenceAnswer:
      '신호가 시장에서 기능하려면 그 신호를 모방하는 데 따르는 비용이나 책임이 판매자의 실제 품질과 일정하게 관련되어야 한다.',
    viewText:
      '어떤 온라인 거래 플랫폼은 판매자에게 품질 보증 비용을 부담하게 하고, 구매자가 일정 기간 안에 결함을 발견하면 판매자의 보증 등급을 낮춘다. 이 보증 등급은 이후 구매자에게 공개된다.',
    viewAnswer:
      '보증 등급이 판매자의 사후 책임과 연결되어 있다면, 그것은 구매자가 상품의 품질을 추정하는 데 활용할 수 있는 신호로 작용할 수 있다.',
    contentDistractors: [
      '구매자가 품질 정보를 알기 어려운 시장에서는 낮은 가격이 언제나 높은 거래 효율성을 보장한다.',
      '신호는 구매자에게 더 많은 정보를 제공하기만 하면 그 비용이나 책임과 무관하게 신뢰를 얻는다.',
      '정보 비대칭이 클수록 좋은 품질의 상품은 평균 가격보다 높은 가격에 안정적으로 거래된다.',
      '판매자의 평판은 상품의 실제 품질과 무관하므로 시장의 선택에 영향을 주지 않는다.',
    ],
    inferenceDistractors: [
      '형식적 인증이 많아질수록 구매자는 개별 신호의 차이를 고려하지 않아도 된다.',
      '좋은 품질의 판매자는 보증 비용을 부담할 유인이 없으므로 신호 제공을 회피하게 된다.',
      '정보 비대칭이 해소되려면 가격 경쟁을 제한하고 모든 상품의 가격을 동일하게 유지해야 한다.',
      '구매자가 신호를 의심하게 되는 것은 신호가 실제 품질과 지나치게 강하게 연결되어 있기 때문이다.',
    ],
    viewDistractors: [
      '보증 등급이 공개되더라도 구매자는 판매자의 품질을 추정할 수 없으므로 거래 선택에는 아무 영향을 받지 않는다.',
      '보증 비용이 판매자에게 부담된다면 낮은 품질의 판매자가 그 신호를 더 쉽게 모방할 수 있다.',
      '구매자의 결함 신고가 판매자의 등급에 반영되는 것은 정보 비대칭을 심화시키는 장치에 해당한다.',
      '보증 등급은 가격 경쟁을 없애기 위한 제도이므로 상품 품질에 대한 판단과는 관련이 없다.',
    ],
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
    advancedRelation:
      '나아가 밀도 순환의 변화는 원인과 결과가 한 방향으로만 이어지는 단순한 과정이 아니다. 담수 유입은 염분을 낮추어 하강 흐름을 약화시킬 수 있고, 약화된 흐름은 열 이동을 바꾸어 다시 해빙과 대기 조건에 영향을 줄 수 있다. 이처럼 해양 조건과 기후 요소가 되먹임 관계를 이루기 때문에, 특정 관측 결과를 해석할 때에는 온도와 염분 중 하나만 떼어 내어 판단해서는 안 된다.',
    evidence:
      '글쓴이는 해수의 밀도 순환이 온도와 염분에 따른 밀도 차이로 작동하며, 전 지구적 열 이동과 기후 조절에 영향을 준다고 본다.',
    contentAnswer:
      '해수의 밀도 순환은 온도와 염분에 따른 밀도 차이로 발생하며, 표층 흐름보다 느린 시간 규모에서 심층까지 이어질 수 있다.',
    inferenceAnswer:
      '고위도 해역에 담수가 대량 유입되면 표층 해수의 염분이 낮아져 심층으로 가라앉는 흐름이 약화될 가능성이 있다.',
    viewText:
      '어느 고위도 해역에서 빙하 융해로 담수 유입이 증가하였고, 같은 기간 표층 해수의 염분이 낮아졌다는 관측 결과가 보고되었다.',
    viewAnswer:
      '이 관측은 해당 해역에서 해수가 충분히 무거워지지 못해 밀도 순환의 하강 흐름이 약해질 수 있음을 시사한다.',
    contentDistractors: [
      '밀도 순환은 바람과 지구 자전의 영향으로 표층에서만 빠르게 형성되는 흐름이다.',
      '해빙이 형성되면 주변 바닷물의 염분이 낮아져 해수가 심층으로 가라앉기 쉬워진다.',
      '해수 순환은 해양 내부에서만 작용하므로 대기나 기후 체계와는 관련을 맺지 않는다.',
      '해수의 밀도는 온도의 영향을 받지만 염분 변화와는 무관하게 결정된다.',
    ],
    inferenceDistractors: [
      '담수 유입이 증가하면 표층 해수의 염분이 높아져 심층 순환이 반드시 강화된다.',
      '표층 해류가 빠르게 이동할수록 밀도 순환은 온도와 염분 조건의 영향을 받지 않는다.',
      '고위도 해수의 냉각은 염분 변화와 관계없이 항상 같은 정도의 하강 흐름을 만든다.',
      '심층 순환의 변화는 열 이동 경로와 무관하므로 지역 기온에 영향을 주지 않는다.',
    ],
    viewDistractors: [
      '담수 유입으로 염분이 낮아졌다면 해수의 밀도가 커져 심층으로 가라앉는 흐름이 강화된다.',
      '빙하 융해는 해수의 온도와 염분에 영향을 주지 않으므로 밀도 순환과 연결될 수 없다.',
      '표층 염분이 낮아지는 현상은 표층 해류가 지구 자전의 영향을 받지 않는다는 증거이다.',
      '해수가 충분히 무거워지지 못하는 상황은 전 지구적 열 이동과 무관한 국지적 현상에 그친다.',
    ],
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
    advancedRelation:
      '또한 과실 판단은 행위자의 심리 상태만을 묻는 절차가 아니라 사회적으로 요구되는 행위 기준을 정하는 과정이기도 하다. 같은 손해라도 위험의 종류, 예방 조치의 가능성, 행위가 이루어진 상황에 따라 책임 여부가 달라지는 이유가 여기에 있다. 결국 법은 피해자의 손해와 행위자의 자유를 동시에 고려하면서, 어느 지점에서 주의 의무 위반을 인정할 것인지 결정한다.',
    evidence:
      '글쓴이는 법적 책임이 손해라는 결과만으로 정해지지 않고, 주의 의무 위반과 예측 가능성, 인과 관계를 함께 따져야 한다고 본다.',
    contentAnswer:
      '과실 책임은 손해 발생만으로 곧바로 인정되지 않고, 행위 당시 요구되는 주의 의무 위반과 손해 사이의 관련성을 함께 따져야 성립한다.',
    inferenceAnswer:
      '행위 당시 위험을 예측하기 어려웠고 이를 피할 현실적 방법도 없었다면, 손해가 발생했더라도 과실 책임을 인정하기 어려울 수 있다.',
    viewText:
      '갑은 제한 속도를 지키며 운전하고 있었고 전방 주시 의무도 다하고 있었다. 그런데 도로 위 구조물이 갑자기 떨어져 사고가 발생했으며, 사전에 이를 알 수 있는 표지는 없었다.',
    viewAnswer:
      '갑에게 사고 결과가 발생했다는 이유만으로 과실 책임을 인정하기는 어렵고, 위험의 예측 가능성과 회피 가능성을 함께 검토해야 한다.',
    contentDistractors: [
      '손해가 중대하게 발생한 경우에는 행위 당시의 예측 가능성과 무관하게 과실 책임이 인정된다.',
      '법적 책임은 피해 구제를 위해 손해 발생 여부만을 기준으로 판단되어야 한다.',
      '행위자의 주관적 의도가 선했다면 주의 의무 위반 여부는 검토할 필요가 없다.',
      '주의 의무는 모든 사고 결과를 완전히 방지할 의무를 의미한다.',
    ],
    inferenceDistractors: [
      '사후적으로 위험이 확인되었다면 행위 당시 그 위험을 예측할 수 있었는지는 고려할 필요가 없다.',
      '피해가 발생하지 않았다면 주의 의무 위반 여부는 언제나 법적으로 의미를 갖지 않는다.',
      '과실 책임을 인정하려면 행위자의 악의가 반드시 입증되어야 한다.',
      '평균적 사람이 기울였어야 할 주의의 정도는 사건의 구체적 상황과 무관하게 고정된다.',
    ],
    viewDistractors: [
      '갑이 운전 중이었다는 사실만으로 손해 발생과 주의 의무 위반 사이의 관련성은 충분히 인정된다.',
      '사고 결과가 중대하다면 사전에 알 수 있는 표지가 없었더라도 예측 가능성은 당연히 인정된다.',
      '갑이 제한 속도를 지켰다는 사실은 과실 판단에서 고려될 수 없으며 결과만이 기준이 된다.',
      '도로 위 구조물이 갑자기 떨어졌다는 점은 책임 판단에서 오히려 갑의 회피 가능성을 높이는 근거가 된다.',
    ],
  },
]

function pick<T>(items: T[], seed: number) {
  return items[Math.abs(seed) % items.length]
}

function buildPassage(pattern: PassagePattern, difficulty: Difficulty, styleMode: StyleMode) {
  const styleOpening =
    styleMode === 'EBS 학습형'
      ? `${pattern.topic}은 학습 과정에서 자주 다루어지는 소재이다.`
      : `${pattern.topic}을 이해하려면 표면적인 현상보다 그 현상이 놓인 맥락을 살펴야 한다.`

  const paragraphs = [
    `${styleOpening} ${pattern.opening}`,
    `${pattern.thesis} ${pattern.contrast}`,
    `${pattern.example} ${pattern.development}`,
    pattern.mechanism,
    `${pattern.implication} ${pattern.limitation}`,
    `${pattern.synthesis} 따라서 ${pattern.evidence}`,
  ]

  if (difficulty === '개념') {
    return [paragraphs[0], paragraphs[1], `${pattern.example} 따라서 ${pattern.evidence}`].join('\n\n')
  }

  if (difficulty === '표준') {
    return [paragraphs[0], paragraphs[1], paragraphs[2], `${pattern.limitation} 따라서 ${pattern.evidence}`].join('\n\n')
  }

  if (difficulty === '고난도') {
    return [...paragraphs, pattern.advancedRelation].join('\n\n')
  }

  return paragraphs.join('\n\n')
}

function getSkillFocus(problemType: ProblemType, difficulty: Difficulty) {
  const difficultyFocus: Record<Difficulty, string> = {
    개념: '직접 근거 확인',
    표준: '대비 관점과 조건 확인',
    실전: '조건 누락과 인과 관계 판별',
    고난도: '두 개념의 관계와 적용 한계 판단',
  }

  return `${problemType} · ${difficultyFocus[difficulty]}`
}

function buildChoices(pattern: PassagePattern, problemType: ProblemType, difficulty: Difficulty, styleMode: StyleMode) {
  const hardTrap =
    styleMode === '고난도 실전형' || difficulty === '고난도'
      ? '글쓴이는 대비되는 관점을 부분적으로 인정하지만, 최종 판단에서는 그 관점을 더 우위에 둔다.'
      : '비교되는 관점은 글쓴이가 최종적으로 지지하는 입장이다.'

  const directTrap =
    difficulty === '개념'
      ? '글쓴이는 중심 개념을 보조적 사례로만 다룬다.'
      : hardTrap

  if (problemType === '보기 적용') {
    const viewDistractors =
      difficulty === '개념'
        ? pattern.viewDistractors.slice(0, 2)
        : difficulty === '고난도'
          ? pattern.viewDistractors
          : pattern.viewDistractors.slice(0, 3)

    return [
      pattern.viewAnswer,
      ...viewDistractors,
      directTrap,
    ]
  }

  if (problemType === '추론') {
    const inferenceDistractors =
      difficulty === '개념'
        ? pattern.inferenceDistractors.slice(0, 3)
        : pattern.inferenceDistractors

    return [
      pattern.inferenceAnswer,
      ...inferenceDistractors,
    ]
  }

  const contentDistractors =
    difficulty === '개념'
      ? pattern.contentDistractors.slice(0, 3)
      : pattern.contentDistractors

  return [
    pattern.contentAnswer,
    ...contentDistractors,
  ]
}

function normalizeChoices(choices: string[]) {
  const fallback = '윗글의 일부 표현은 포함하지만 글쓴이의 최종 판단과는 거리가 있다.'
  const normalized = [...choices]

  while (normalized.length < 5) {
    normalized.push(fallback)
  }

  return normalized.slice(0, 5)
}

function buildChoiceExplanations(choices: string[], answer: string) {
  return choices.map((choice, index) => {
    if (choice === answer) {
      return `${index + 1}번은 지문의 핵심 근거와 조건을 모두 반영한 정답입니다.`
    }

    if (choice.includes('언제나') || choice.includes('반드시') || choice.includes('충분히 인정')) {
      return `${index + 1}번은 지문의 조건부 설명을 예외 없는 일반 명제로 바꾼 과잉 일반화 오답입니다.`
    }

    if (choice.includes('무관') || choice.includes('관련을 맺지') || choice.includes('영향을 주지')) {
      return `${index + 1}번은 지문에서 제시한 관련성을 끊어 버린 관계 부정 오답입니다.`
    }

    if (choice.includes('강화') || choice.includes('높아져') || choice.includes('쉽게 모방')) {
      return `${index + 1}번은 원인과 결과의 방향을 뒤집거나 조건을 반대로 적용한 인과 반전 오답입니다.`
    }

    if (choice.includes('최종') || choice.includes('우위') || choice.includes('지지')) {
      return `${index + 1}번은 글에서 대비된 관점을 글쓴이의 결론처럼 바꾼 관점 혼동 오답입니다.`
    }

    return `${index + 1}번은 지문 일부 표현은 활용하지만 핵심 조건을 누락하거나 적용 범위를 바꾼 오답입니다.`
  })
}

function getAnswer(problemType: ProblemType, pattern: PassagePattern) {
  if (problemType === '보기 적용') {
    return pattern.viewAnswer
  }

  if (problemType === '추론') {
    return pattern.inferenceAnswer
  }

  return pattern.contentAnswer
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
  difficulty: Difficulty,
  number: number,
): KoreanQuestion {
  const choices = normalizeChoices(buildChoices(pattern, problemType, difficulty, styleMode))
  const answer = getAnswer(problemType, pattern)

  return {
    id: `${setId}-q${number}`,
    number,
    problemType,
    question: getQuestion(problemType, styleMode),
    view: problemType === '보기 적용' ? pattern.viewText : undefined,
    choices,
    answer,
    wrongReason:
      '오답은 글의 일부 표현만 맞거나, 대비되는 관점을 글쓴이의 최종 주장처럼 바꾸는 방식으로 설계했습니다.',
    explanation:
      `정답은 "${pattern.evidence}"라는 글의 결론부와 직접 연결됩니다. 선지를 고를 때는 사례의 표면 내용보다 그 사례가 중심 주장에 어떻게 쓰였는지 확인해야 합니다.`,
    choiceExplanations: buildChoiceExplanations(choices, answer),
    skillFocus: getSkillFocus(problemType, difficulty),
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
    passage: buildPassage(pattern, difficulty, styleMode),
    concept: pattern.concept,
    evidence: pattern.evidence,
    questions: questionTypes.map((type, index) => createQuestion(id, pattern, type, styleMode, difficulty, index + 1)),
  }
}
