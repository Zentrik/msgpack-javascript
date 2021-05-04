import assert from "assert";
import "web-streams-polyfill";
import { encode, decode, decodeAsync } from "@msgpack/msgpack";

const MyBlob: typeof Blob = typeof Blob !== "undefined" ? Blob : require("blob-polyfill").Blob;

describe("Blob", () => {
  it("decodes it with `decode()`", async function () {
    const blob = new MyBlob([encode("Hello!")]);
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!blob.arrayBuffer) {
      this.skip();
    }
    assert.deepStrictEqual(decode(await blob.arrayBuffer()), "Hello!");
  });

  it("decodes it with `decodeAsync()`", async function () {
    const blob = new MyBlob([encode("Hello!")]);
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!blob.stream) {
      this.skip();
    }
    assert.deepStrictEqual(await decodeAsync(blob.stream()), "Hello!");
  });
});
