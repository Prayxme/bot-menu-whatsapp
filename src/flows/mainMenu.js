// Codigo del menu principal

import { getUserState, setUserState } from "../state/userState.js";
import { normalizeText } from "./utils.js";
import { STEPS } from "./steps.js";


if (isGlobalBack(input)) {
   return handleGlobalBack(sock, from);
}

async function showMainMenu(sock, from) {
  return sock.sendMessage(from, {
    text: `👋 *Multiservicios Repomarca*

Seleccione una opción:

1️⃣ Repuestos de Refrigeración
2️⃣ Aire Acondicionado
3️⃣ Repuestos de Vehículos
4️⃣ Contactar con un asesor

✍️ Responda con número o palabra clave`,
  });
}


async function handleMainMenuStep(sock, from, input) {
  switch (input) {
    case "1":
    case "refrigeracion":
      setUserState(from, {
        step: STEPS.REFRIGERACION_MENU,
        service: "Refrigeración",
      });
      return sock.sendMessage(from, {
        text: "🧊 *Refrigeración*\n\n1️⃣ Compresores\n2️⃣ Gases\n\n🔙 Escriba *volver*",
      });

    case "2":
    case "aire":
    case "aire acondicionado":
      setUserState(from, {
        step: STEPS.AIRE_MENU,
        service: "Aire Acondicionado",
      });
      return sock.sendMessage(from, {
        text: "❄️ *Aire Acondicionado*\n\n1️⃣ Equipos\n2️⃣ Repuestos\n\n🔙 Escriba *volver*",
      });

    case "3":
    case "vehiculos":
      setUserState(from, {
        step: STEPS.VEHICULOS_MENU,
        service: "Vehículos",
      });
      return sock.sendMessage(from, {
        text: "🚗 *Repuestos de Vehículos*\n\n1️⃣ Motores\n2️⃣ Transmisiones\n\n🔙 Escriba *volver*",
      });

    case "4":
    case "asesor":
      return sock.sendMessage(from, {
        text: "📞 Un asesor se comunicará contigo",
      });

    default:
      return sock.sendMessage(from, {
        text: "❌ Opción no válida. Intente nuevamente.",
      });
  }
}

async function handleRefrigeracionMenu(sock, from, input) {
  if (input === "volver") {
    setUserState(from, { step: STEPS.MAIN_MENU });
    return showMainMenu(sock, from);
  }

  switch (input) {
    case "1":
    case "compresores":
      setUserState(from, { category: "Compresores" });
      return sock.sendMessage(from, {
        text: "🔧 Elegiste *Compresores*",
      });

    case "2":
    case "gases":
      setUserState(from, { category: "Gases Refrigerantes" });
      return sock.sendMessage(from, {
        text: "🧪 Elegiste *Gases Refrigerantes*",
      });

    default:
      return sock.sendMessage(from, {
        text: "❌ Opción inválida. Escriba *volver* para regresar.",
      });
  }
}


export async function handleMainMenu(sock, from, text) {
    const input = normalizeText(text);
    const user = getUserState(from);

    

    // si no hay paso iniciamos conversacion
    if (!user.step) {
        setUserState(from, { step: STEPS.MAIN_MENU });

        return showMainMenu(sock, from);
    }

    switch (user.step) {
        case STEPS.MAIN_MENU:
            return handleMainMenuStep(sock, from, input);
        
        case STEPS.REFRIGERACION_MENU:
            return handleMainMenuStep(sock, from, input);
            
        case STEPS.AIRE_MENU:
            return handleMainMenuStep(sock, from, input);

        case STEPS.VEHICULOS_MENU:
            return handleMainMenuStep(sock, from, input);

        default:
            return showMainMenu(sock, from);
    }
}


