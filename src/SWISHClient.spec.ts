import {SWISHClient} from "./SWISHClient";
import dotenv from 'dotenv';

dotenv.config();


const username = process.env.SWISH_USER_NAME;
const password = process.env.SWISH_PASSWORD;
const baseUrl = process.env.SWISH_BASE_URL;

let swish: SWISHClient;

describe('SWISHClient', () => {
    beforeEach(() => {
        swish = new SWISHClient(username, password, baseUrl);
    })

    describe('get program code', () => {
        it('can retrieve program code as json', async () => {
            const result = await swish.getProgramCodeAsJson('c6f177aadb4800a7fa146ab948179a97152f1ccd');
            expect(result.data).toBe('safe_clause(Head, Body) :- \\+ predicate_property(Head, built_in), functor(P, Name, _), Name \\== call, clause(Head, Body).');
            expect(result.meta).toEqual({
               
                    "author": "Juriskop Projektmitglied",
                    "commit": "c6f177aadb4800a7fa146ab948179a97152f1ccd",
                    "data": "6b8c23b53c3df52fba58af5b974dddc2cfd376d0",
                    "identity": "local:juriskop",
                    "modify": [
                        "any",
                        "login",
                        "owner"
                    ],
                    "name": "experimental_safe_clause.pl",
                    "previous": "eb956980f2ce5ab48614cb84af6bd97f8010bcb7",
                    "public": true,
                    "time": 1657111287.2864354,
                    "title": "An attempt to define a clause which works with built in predicates without throwing."
    
            }); 
        });

        it('can retrieve program code as text', async () => {
            const result = await swish.getProgramCodeAsRawText('c6f177aadb4800a7fa146ab948179a97152f1ccd');
            expect(result).toBe('safe_clause(Head, Body) :- \\+ predicate_property(Head, built_in), functor(P, Name, _), Name \\== call, clause(Head, Body).');
        });

        it('can retrieve result from query, refencing to existing program.pl', async () => {
            const result = await swish.queryExistingProgram('learn_prolog.pl', "istStrafbar(X, 'Mathias', 'vermoebeln').");
            expect(result.data.event).toEqual('success');
        });

        it('can retrieve result from query, that includes the complete Programcode', async () => {
            const result = await swish.queryCustomProgram("%% Faktenbasis:\n\nistTaeter('Hugo').\nistOpfer('Mathias').\nhatVorsatz('Hugo').\nistTat('vermoebeln').\n\n%% \"Logik\":\n\nistStrafbar(Taeter, Opfer, Tat) :-\n    istTaeter(Taeter),\n    istOpfer(Opfer),\n    istTat(Tat),\n    \n    hatVorsatz(Taeter).\n", "istStrafbar('Hugo', 'Mathias', 'vermoebeln').");
            expect(result.data.event).toEqual('success');
        });

        /// doesn't work yet
        it('can retrieve result from query, refencing to existing program as Hash', async () => {
            const result = await swish.queryExistingProgram('74ed1936497391bf3948a454b11bfee12e824b40', "istTat('vermoebeln').");
            expect(result.data.event).toEqual('success');
            const result2 = await swish.queryExistingProgram('74ed1936497391bf3948a454b11bfee12e824b40', "istTat('Hugo').");
            expect(result2.data.event).toEqual('failure');
        }) 
    });
});