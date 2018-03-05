import { Pointer } from "./ffi/api";
import MatcherBinding from "./matcher_binding";
import MatcherBindingOptions from "./matcher_binding_options";

// @ts-ignore
// tslint:disable-next-line:no-var-requires
const createFfiInstance = require<any>("./ffi/lib.rs");

/**
 * Representation of the execution environment of the loaded FFI module.
 */
interface ModuleEnvironment {
    /**
     *  The modules memory buffer.
     */
    memory: WebAssembly.Memory;

    /**
     * The modules function table.
     */
    table: WebAssembly.Table;

    handle_search_result(token: number, value: Pointer, valueLength: number, score: number): void;

}

/**
 * A factory that creates {@link MatcherBinding}s via the <i>fiveo</i> foreign function interface.
 */
export default class MatcherBindingFactory {

    /**
     * Creates a new WebAssembly module, bind it to a new {@link MatcherBinding} instance, and loads the dictionary.
     *
     * @param dictionary A new-line delimited list of dictionary entries to be indexed by the created matcher.
     * @param userOptions An optional dictionary of options to configure the loaded module {@see MatcherBinding}.
     */
    public static create(dictionary: string[], userOptions: any | MatcherBindingOptions = {}): Promise<MatcherBinding> {
        const defaultOptions = {
            initialMemoryPages: 10,
            maxMemoryPages: 100,
        };

        const settings: MatcherBindingOptions = Object.assign({}, defaultOptions, userOptions);
        const resultMap = new Map<number, any>();
        const bindings = new MatcherBinding(new TextDecoder("utf-8"), new TextEncoder("utf-8"));
        const moduleEnvironment: ModuleEnvironment = {
            handle_search_result: bindings.createHandlerCallback(),
            memory: new WebAssembly.Memory({ initial: settings.initialMemoryPages, maximum: settings.maxMemoryPages }),
            table: new WebAssembly.Table({ initial: 0, element: "anyfunc" }),
        };

        return createFfiInstance({ env: moduleEnvironment })
            .then(({ instance }) => bindings.bind(dictionary, instance.exports, instance.exports.memory));
    }
}
