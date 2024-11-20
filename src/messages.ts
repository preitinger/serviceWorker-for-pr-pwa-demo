import * as rt from "runtypes"

export const GetVersionReq = rt.Record({
    type: rt.Literal('getVersion'),
})
export type TGetVersionReq = rt.Static<typeof GetVersionReq>

export const GetVersionRes = rt.Record({
    type: rt.Literal('success'),
    version: rt.Number,
})
export type TGetVersionRes = rt.Static<typeof GetVersionRes>

export function logMessages() {
    console.log('Yeah, messages.ts ;-)')
}