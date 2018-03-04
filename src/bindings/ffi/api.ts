export type Pointer = number;
export const NullPointer = 0;

/**
 * This is a type definition for the set of functions exported by the FFI API at `bindings/ffi/lib.rs`.
 */
export interface FiveoFfi {
    /**
     * Binding to the fiveo FFI API.  See `ffi/lib.rs#fiveo_matcher_create`.
     */
    fiveo_matcher_create(dictionaryPointer: Pointer, dictionaryLength: number): Pointer;

    /**
     * Binding to the fiveo FFI API.  See `ffi/lib.rs#fiveo_matcher_search_init`.
     */
    fiveo_matcher_search_init(): Pointer;

    /**
     * Binding to the fiveo FFI API.  See `ffi/lib.rs#fiveo_matcher_search_init`.
     */
    fiveo_matcher_search(
        matcher: Pointer,
        queryToken: number,
        query: Pointer,
        queryLength: number,
        maxResults: number,
    ): number;

    /**
     * Binding to the fiveo FFI API.  See `ffi/lib.rs#fiveo_matcher_search_init`.
     */
    fiveo_last_error(): number;

    /**
     * Binding to the fiveo FFI API.  See `ffi/lib.rs#fiveo_matcher_search_init`.
     */
    alloc(length: number): Pointer;

    /**
     * Binding to the fiveo FFI API.  See `ffi/lib.rs#fiveo_matcher_search_init`.
     */
    dealloc(ptr: Pointer): void;
}
