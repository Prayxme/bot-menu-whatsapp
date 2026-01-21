import { getUserState, setUserState, popStep } from "../state/userState.js";
import { STEPS } from "./steps.js";

export async function handleGlobalBack(sock, from) {
  const user = getUserState(from);

  const previousStep = popStep(from);

  if (!previousStep) {
    setUserState(from, { step: STEPS.MAIN_MENU });
    return sock.sendMessage(from, {
      text: "🏠 Has vuelto al menú principal",
    });
  }

  setUserState(from, { step: previousStep });

  switch (previousStep) {
    case STEPS.MAIN_MENU:
      return sock.sendMessage(from, {
        text: "🏠 Menú principal",
      });

    case STEPS.REFRIGERACION_MENU:
      return sock.sendMessage(from, {
        text: "🧊 Menú de Refrigeración",
      });

    default:
      return sock.sendMessage(from, {
        text: "↩️ Has regresado",
      });
  }
}
