const updateFilmLog = (state, action) => {
  if (state === undefined) {
    return {
      loading: null,
      film: null,
    };
  }

  switch (action.type) {
    default:
      return state.filmLog;
  }
};

export default updateFilmLog;
