import * as rt  from "runtypes"

export const PushData = rt.Record({
  title: rt.String,
  body: rt.String,
  url: rt.String,
  icon: rt.Optional(rt.String),
})
export type PushData = rt.Static<typeof PushData>
