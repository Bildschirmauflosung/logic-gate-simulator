import {IntrinsicGateData} from "./IntrinsicGateData";
import {GateRegistryT} from "./Types";

export const GateRegistry: GateRegistryT = new Map([
  ...IntrinsicGateData,
])
