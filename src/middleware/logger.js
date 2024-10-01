export const logger = (store) => (next) => (action) => {
  console.log(action);
  console.log(store.getState());
  let res = next(action);
  console.log(store.getState());
  return res;
};
