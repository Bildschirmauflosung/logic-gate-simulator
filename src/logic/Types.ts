import {IGateData} from "./IGateData";

export type ResolutionFunction = (values: boolean[]) => boolean[];
export type GateRegistryT = Map<string, IGateData>;
