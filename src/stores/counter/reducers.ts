const initialState = {
  count_add: 0,
}

export default function reducers(state = initialState, action: any) {
  switch (action.type) {
    case 'INCREASE':
      return { count_add: state.count_add + 1 }
    case 'DECREASE':
      return { count_add: state.count_add - 1 }
    default:
      return state
  }
}
