import coreErrorHandlers from "./coreErrorHandlers";
import httpErrorHandlers from "./httpErrorHandlers";

export default [...coreErrorHandlers, ...httpErrorHandlers];
