import { APCarousel } from ".";

export function moveCarousel(self: APCarousel) {
    console.log("move attempt")
    if (!self.moving && self.presentItemIndex != self.futureItemIndex) {
        let offset = self.items[self.futureItemIndex].offsetLeft - self.carouselSlides.offsetLeft
        self.console = offset
        // el.disableInteraction()
        self.carouselSlides.scrollTo({ left: offset, behavior: 'smooth'});
        self.presentItemIndex = self.futureItemIndex;
    }
}

export function movePrev(self: APCarousel) {
    console.log("movePrev")
    self.enableAutoplay = false
    if (!self.moving) {
        self.futureItemIndex = self.getPrevItemIndex(self)
        self.moveCarousel(self)
    }
}

export function moveNext(self: APCarousel) {
    console.log("moveNext")
    self.enableAutoplay = false
    if (!self.moving) {
        console.log(self.getNextItemIndex)
        self.futureItemIndex = self.getNextItemIndex(self)
        self.moveCarousel(self)
    }
}