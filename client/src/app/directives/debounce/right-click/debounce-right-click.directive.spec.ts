import { DEFAULT_DEBOUNCE_TIME } from '@app/constants/utils';
import { DebounceRightClickDirective } from '@app/directives/debounce/right-click/debounce-right-click.directive';
import { DO_NOTHING } from '@app/test/constants/do-nothing-function';

describe('DebounceRightClickDirective', () => {
    let directive: DebounceRightClickDirective;

    beforeEach(() => {
        directive = new DebounceRightClickDirective();
        directive.ngOnInit();
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('ngOnInit should add subscription', () => {
        // eslint-disable-next-line dot-notation -- Propriété privée
        expect(directive['subscription']).toBeTruthy();
    });

    it('ngOnDestroy should unsubscribe', () => {
        // eslint-disable-next-line dot-notation -- Propriété privée
        const spy = spyOn(directive['subscription'], 'unsubscribe').and.callFake(DO_NOTHING);

        directive.ngOnDestroy();
        expect(spy).toHaveBeenCalled();
    });

    it('should add the click after debounce time', () => {
        const clock = jasmine.clock().install();
        const spy = spyOn(directive.debounceRightClick, 'emit').and.callFake(DO_NOTHING);

        directive.clickEvent(new Event('click'));
        clock.tick(DEFAULT_DEBOUNCE_TIME);
        expect(spy).toHaveBeenCalled();
        clock.uninstall();
    });
});
