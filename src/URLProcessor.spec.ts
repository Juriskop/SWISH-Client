import {joinToUrl} from "./URLProcessor";

describe('URLProcessor', () => {
    describe('joinToUrl(fragments)', () => {
        it('works with matching / (finishing /)', () => {
            const fragments = ['https://example.com/', 'some/', 'path/'];
            expect(joinToUrl(fragments)).toBe('https://example.com/some/path/');
        });

        it('does not add an ending / when non is given', () => {
            const fragments = ['https://example.com', '/some', '/path'];
            expect(joinToUrl(fragments)).toBe('https://example.com/some/path');
        });

        it('when no / are given in between fragments it adds them', () => {
            const fragments = ['https://example.com', 'some', 'path'];
            expect(joinToUrl(fragments)).toBe('https://example.com/some/path');
        });

        it('when too many / are given in between fragments it only puts one', () => {
            const fragments = ['https://example.com/', '/some/', '/path/'];
            expect(joinToUrl(fragments)).toBe('https://example.com/some/path/');
        })

        it('does not remove / which not placed at the beginning or end of a fragment string', () => {
            const fragments = ['https://example.com/', '/some/', '/path/which/is/longer/'];
            expect(joinToUrl(fragments)).toBe('https://example.com/some/path/which/is/longer/');
        })

        // Unsure what the behavior should be here
        // it('does not remove double / which not placed at the beginning or end of a fragment string', () => {
        //     const fragments = ['https://example.com/', '/some/', '/path//which//is//longer/'];
        //     expect(joinToUrl(fragments)).toBe('https://example.com/some/path//which//is//longer/');
        // });

        it('accepts docker style URLs', () => {
            const fragments = ['swish:3000', '//some//', '//path//which//is//longer//'];
            expect(joinToUrl(fragments)).toBe('swish:3000/some/path//which//is//longer/');
        })
    })
})