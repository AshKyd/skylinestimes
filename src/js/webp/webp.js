import { WebpMachine } from "webp-hero";
const webpMachine = new WebpMachine();
export default function webpInit() {
  webpMachine.polyfillDocument();
}
