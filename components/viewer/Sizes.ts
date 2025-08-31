import { useFontScale } from "../../fontScale";

export const Sizes = {
    gap: 7
}

export function useRowHeight() {
    const unscaledRowHeight = 70;
    const fontScale = useFontScale();
    return unscaledRowHeight * fontScale;
}

export function useControlPanelSizes() {
    const fontScale = useFontScale();
    return {
        height: 36.5 * fontScale,
        borderRadius: 11 * fontScale,
    }
}

export function useClassSize() {
    const fontScale = useFontScale();
    const circleSize = 49 * fontScale;
    const size = 87 * (1 + ((fontScale - 1) / 2));
    return {
        circleSize,
        size
    }
}