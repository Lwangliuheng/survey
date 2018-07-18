const mutation = {
  // xin
  setPeopleHurtActive(state, obj) {
    state.peopleHurtActive = obj
  },

  setCaseDetailActive(state, obj) {
    state.caseDetailActive = obj
  },
  setInsititutEditorActive(state, obj) {
    state.insititutEditorActive = obj
  },
  setIsChannelList(state, obj) {
    state.isChannelList = obj;
  },
  setHeaderActive(state, obj) {
    state.headerActive = obj
  },
  setSignSeatsActive(state, obj) {
    state.signSeatsActive = obj
  },
  getsurveyOrderId(state, obj) {
    state.surveyOrderId = obj
  },
  getcaseListActive(state, obj) {
    state.caseListActive = obj
  },
  getclickEditorActive(state, obj) {
    state.clickEditorActive = obj
  },
  getsubmitCreateActive(state, obj) {
    state.submitCreateActive = obj;
  },
  getinsitituPageno(state, obj) {
    state.insitituPageno = obj
  },
}

export default mutation
