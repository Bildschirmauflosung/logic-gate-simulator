import {IGateData} from "./IGateData";
import {IntrinsicGateData} from "./IntrinsicGateData";

export const GateRegistry: Map<string, IGateData> = new Map([
  ...IntrinsicGateData,
])
