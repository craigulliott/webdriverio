// @ts-ignore mocked (original defined in webdriver package)
import got from 'got'
import { remote } from '../../../src'

describe('isEnabled test', () => {
    it('should allow to check if an element is enabled', async () => {
        const browser = await remote({
            baseUrl: 'http://foobar.com',
            capabilities: {
                browserName: 'foobar'
            }
        })

        await browser.execute((a, b, c) => a + b + c, 1, 2, 3)
        expect(got.mock.calls[1][0].pathname)
            .toBe('/session/foobar-123/execute/sync')
        expect(got.mock.calls[1][1].json.script)
            .toBe('return ((a, b, c) => a + b + c).apply(null, arguments)')
        expect(got.mock.calls[1][1].json.args)
            .toEqual([1, 2, 3])
    })

    it('should return correct value', async () => {
        const browser = await remote({
            baseUrl: 'http://foobar.com',
            capabilities: {
                browserName: 'foobar'
            }
        })

        const result = await browser.execute((value) => value, 'foobar')
        expect(result).toEqual('foobar')
    })

    it('should throw if script is wrong type', async () => {
        const browser = await remote({
            baseUrl: 'http://foobar.com',
            capabilities: {
                browserName: 'foobar'
            }
        })

        expect(() => browser.execute(null)).toThrow()
        expect(() => browser.execute(1234)).toThrow()
    })
})
