import { socialImageAlt, socialImageResponse } from "@/lib/social-image";

export const alt = socialImageAlt();
export { size, contentType } from "@/lib/social-image";

export default function OpenGraphImage() {
  return socialImageResponse();
}
