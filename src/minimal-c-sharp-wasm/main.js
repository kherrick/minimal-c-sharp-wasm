import { dotnet } from "./dotnet.js";

export const createRuntime = async () => await dotnet.create();

export const getAssemblyExports = async () => {
  const runtime = await createRuntime();
  return await runtime.getAssemblyExports(runtime.getConfig().mainAssemblyName);
};
