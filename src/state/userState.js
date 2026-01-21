// Codigo para verificar el estado del usuario

const users = {};

export function getUserState(id) {
  if (!users[id]) {
    users[id] = {
      step: null,
      history: [],
    };
  }
  return users[id];
}

export function setUserState(id, data) {
  users[id] = { ...getUserState(id), ...data };
}

export function pushStep(id, step) {
  const user = getUserState(id);
  user.history.push(step);
}

export function popStep(id) {
  const user = getUserState(id);
  return user.history.pop();
}
