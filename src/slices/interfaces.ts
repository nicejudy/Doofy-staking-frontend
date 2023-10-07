import { BaseProvider, JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";

export interface IBaseAsyncThunk {
  readonly provider: StaticJsonRpcProvider | JsonRpcProvider | BaseProvider;
}

export interface IBaseAddressAsyncThunk extends IBaseAsyncThunk {
  readonly address: string;
}
