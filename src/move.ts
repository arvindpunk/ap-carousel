import { APCarousel } from ".";

export function moveCarousel(self: APCarousel) {
    if (self.presentItemIndex != self.futureItemIndex && self.items) {
        let offset = self.items[self.futureItemIndex].offsetLeft - self.carouselSlides.offsetLeft
        self.carouselSlides.scrollTo({ left: offset, behavior: 'smooth'});
        self.presentItemIndex = self.futureItemIndex;
    }
}

export function movePrev(self: APCarousel) { 
    self.enableAutoplay = false
    self.futureItemIndex = self.getPrevItemIndex(self)
    self.moveCarousel(self)
}

export function moveNext(self: APCarousel) {
    self.enableAutoplay = false
    self.futureItemIndex = self.getNextItemIndex(self)
    self.moveCarousel(self)
}