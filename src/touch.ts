import { APCarousel } from ".";

export function handleTouchStart(self: APCarousel, event: TouchEvent) {
    // return
    let touches = event.changedTouches;
    for (let i = 0; i < touches.length; i++) {
        self.ongoingTouches.push(self.copyTouch(touches[i]));
    }
}

export function handleTouchMove(self: APCarousel, event: TouchEvent) {
    // return
    event.preventDefault();
    let touches = event.changedTouches;
    for (let i = 0; i < touches.length; i++) {
        let idx = self.ongoingTouchIndexById(self, touches[i].identifier);

        if (idx >= 0) {
            let delta = touches[i].pageX - self.ongoingTouches[idx].pageX;
            self.translateDelta = Math.min(0, self.translateDelta + delta);
            self.carouselSlides.style.setProperty('--translate-delta', `translateX(${self.translateDelta}px)`);
            self.ongoingTouches.splice(idx, 1, self.copyTouch(touches[i]));
        }
    }
}

export function handleTouchEnd(self: APCarousel, event: TouchEvent) {
    // return
    event.preventDefault();
    let touches = event.changedTouches;
    for (let i = 0; i < touches.length; i++) {
        let idx = self.ongoingTouchIndexById(self, touches[i].identifier);

        if (idx >= 0) {
            self.ongoingTouches.splice(idx, 1);
        }
    }
}

export function copyTouch({ identifier, pageX, pageY }) {
    return { identifier, pageX, pageY };
}

export function ongoingTouchIndexById(self: APCarousel, idToFind) {
    for (let i = 0; i < self.ongoingTouches.length; i++) {
        let id = self.ongoingTouches[i].identifier;

        if (id == idToFind) {
            return i;
        }
    }
    return -1;
}