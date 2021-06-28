import { LitElement, html } from 'lit';
import { customElement, property, query, queryAssignedNodes, state } from 'lit/decorators.js';
import { coreCSS } from './style';
import * as move from './move';
import * as utils from './utils';

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
    enableAutoplay: boolean = false

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

    moveCarousel = move.moveCarousel
    movePrev = move.movePrev
    moveNext = move.moveNext

    getPrevItemIndex = utils.getPrevItemIndex
    getNextItemIndex = utils.getNextItemIndex

    firstUpdated() {
        this.carouselSlides.scrollTo({ left: 0 });

        this.itemCount = this.items?.length;
        if (this.autoplay > 0) {
            this.enableAutoplay = true

            setInterval(() => {
                this.futureItemIndex = this.getNextItemIndex(this)
                this.moveCarousel(this);
            }, this.autoplay);
        }
    }


    render() {
        return html`
            <div id="ap-carousel">
                <slot @click=${()=> this.movePrev(this)} name="ap-prev"></slot>
                <div class="ap-carousel">
                    <div class="ap-carousel-slides">
                        <slot class="ap-carousel-slide" name="ap-slide"></slot>
                    </div>
                </div>
                <slot @click=${()=> this.moveNext(this)} name="ap-next"></slot>
            </div>
        `;
    }
}