import { LitElement, html } from 'lit';
import { customElement, property, query, queryAssignedNodes, state } from 'lit/decorators.js';
import { coreCSS } from './style';
import * as move from './move';
import * as utils from './utils';
import * as touch from './touch';

@customElement('ap-carousel')
export class APCarousel extends LitElement {

    // properties
    @property()
    startAt: number = 0

    @property()
    autoplay: number = 0

    // state
    @state()
    itemCount: number = 0

    @state()
    presentItemIndex: number = this.startAt

    futureItemIndex: number = this.presentItemIndex

    @state()
    moving: boolean = false

    @state()
    translateDelta: number = 0

    @state()
    enableAutoplay: boolean = false
    
    @state()
    enableTouch: boolean = true
    
    @state()
    console: number = 0

    // query
    @query('.ap-btn-prev')
    prevBtn: HTMLElement

    @query('.ap-btn-next')
    nextBtn: HTMLElement

    @query('.ap-carousel')
    carouselSlides: HTMLElement

    @queryAssignedNodes('ap-slide')
    items: NodeListOf<HTMLElement>

    // style
    static styles = [
        coreCSS,
    ]

    handleTouchStart = touch.handleTouchStart
    handleTouchMove = touch.handleTouchMove
    handleTouchEnd = touch.handleTouchEnd
    copyTouch = touch.copyTouch
    ongoingTouchIndexById = touch.ongoingTouchIndexById
    ongoingTouches: any[];

    moveCarousel = move.moveCarousel
    movePrev = move.movePrev
    moveNext = move.moveNext

    getPrevItemIndex = utils.getPrevItemIndex
    getNextItemIndex = utils.getNextItemIndex
    // disableInteraction = utils.disableInteraction


    firstUpdated() {
        this.carouselSlides.scrollTo({ left: 0 });

        this.itemCount = this.items.length;
        if (this.autoplay > 0) {
            this.enableAutoplay = true

            setInterval(() => {
                this.futureItemIndex = this.getNextItemIndex(this)
                this.moveCarousel(this);
            }, this.autoplay);
        }
        // if (this.enableTouch) {
        //     this.carouselSlides.addEventListener("touchstart", (e) => {
        //         this.handleTouchStart(e)
        //     }, false)
        //     this.carouselSlides.addEventListener("touchmove", (e) => {
        //         this.handleTouchMove(e)
        //     }, false)
        //     this.carouselSlides.addEventListener("touchend", (e) => {
        //         this.handleTouchEnd(e)
        //     }, false)
        // }
    }


    render() {
        return html`
            <div>
                <slot @click=${this.movePrev} name="ap-prev"></slot>
                <div class="ap-carousel">
                    <div class="ap-carousel-slides">
                        <slot class="ap-carousel-slide" name="ap-slide"></slot>
                    </div>
                </div>
                <slot @click=${this.moveNext} name="ap-next"></slot>
            </div>
        `;
    }
}