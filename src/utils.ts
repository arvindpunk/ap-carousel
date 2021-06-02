import { APCarousel } from ".";

export function getPrevItemIndex(self: APCarousel) {
    return Math.max(0, self.presentItemIndex - 1)
}

export function getNextItemIndex(self: APCarousel) {
    return Math.min(self.presentItemIndex + 1, self.itemCount - 1)
}