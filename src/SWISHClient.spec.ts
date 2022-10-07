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
        })
    });
});