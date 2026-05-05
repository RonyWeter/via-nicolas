import { OnInit, OnDestroy, Directive, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export class BasePageComponent implements OnDestroy {
    componentDestroyed$: Subject<boolean> = new Subject();
    constructor(protected hostElement: ElementRef) {
    }

    ngOnDestroy(): void {
        console.log("ddddddddddddd")
        const element = this.hostElement.nativeElement;
        if (element && element.parentNode) {
            element.parentNode.removeChild(element);
        }
        // this.componentDestroyed$.next(true);
        // this.componentDestroyed$.complete();
    }
}