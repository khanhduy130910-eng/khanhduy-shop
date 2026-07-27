const tg = window.Telegram?.WebApp;

export function getTelegramApp() {
    return tg || null;
}

export function initTelegram() {
    if (!tg) return;

    tg.ready();

    tg.expand();

    try {
        tg.disableVerticalSwipes();
    } catch {}

    try {
        tg.enableClosingConfirmation();
    } catch {}
}

export function getTelegramUser() {
    return tg?.initDataUnsafe?.user || null;
}

export function getTelegramTheme() {
    return tg?.colorScheme || "light";
}

export function isTelegramDark() {
    return getTelegramTheme() === "dark";
}

export function getTelegramInitData() {
    return tg?.initData || "";
}

export function getTelegramViewport() {
    return {
        width: tg?.viewportWidth || window.innerWidth,
        height: tg?.viewportHeight || window.innerHeight,
        stableHeight: tg?.viewportStableHeight || window.innerHeight,
    };
}

export function haptic(type = "light") {
    if (!tg?.HapticFeedback) return;

    switch (type) {
        case "success":
            tg.HapticFeedback.notificationOccurred("success");
            break;

        case "warning":
            tg.HapticFeedback.notificationOccurred("warning");
            break;

        case "error":
            tg.HapticFeedback.notificationOccurred("error");
            break;

        case "medium":
            tg.HapticFeedback.impactOccurred("medium");
            break;

        case "heavy":
            tg.HapticFeedback.impactOccurred("heavy");
            break;

        default:
            tg.HapticFeedback.impactOccurred("light");
    }
}

export default tg;