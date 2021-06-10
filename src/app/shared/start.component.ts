import { Component, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { EventEmitter } from "@angular/core";

@Component({
    selector: 'pm-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})

export class StarComponent implements OnChanges {

    @Input() rating: number = 0;

    // rating: number = 4;
    cropWidth: number = 75;

    ngOnChanges(changes: SimpleChanges): void {
        this.cropWidth = this.rating * 75 / 5;
    }

    @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();

    onStarClick(): void {
        // console.log(`The rating ${this.rating} was clicked`);
        this.ratingClicked.emit(`The rating ${this.rating} was clicked`);
    }
}