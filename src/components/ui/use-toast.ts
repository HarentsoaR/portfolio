// This is a simplified version of the use-toast hook
// that works with our contact form

import { useToast as useShadcnToast } from "@/hooks/use-toast";

export { useToast } from "@/hooks/use-toast";

// Re-export required types
export type {
  ToastProps,
  ToastActionElement,
} from "@/components/ui/toast";
